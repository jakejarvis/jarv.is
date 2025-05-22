import "dotenv/config";
import { env } from "@/lib/env";
import { eq } from "drizzle-orm";
import { graphql } from "@octokit/graphql";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

// GitHub GraphQL API authentication
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${env.GITHUB_TOKEN}`,
  },
});

// Map of page slugs to GitHub discussion numbers
// You'll need to manually map these based on your discussions
const discussionMapping: Record<string, number> = {
  "notes/dropping-dropbox": 780,
  "notes/cloudflare-dns-archive-is-blocked": 1693,
  "notes/finding-candidates-subdomain-takeovers": 1628,
  "notes/how-to-pull-request-fork-github": 779,
  "notes/how-to-backup-linux-server": 1506,
  "notes/hugo-to-nextjs": 1017,
  "notes/dark-mode": 780,
};

async function main() {
  console.log("🌱 Starting database seed...");

  // Loop through each discussion mapping
  for (const [pageSlug, discussionNumber] of Object.entries(discussionMapping)) {
    console.log(`Processing discussion #${discussionNumber} for page ${pageSlug}...`);

    // Make sure the page exists in the database
    const existingPage = await db
      .select()
      .from(schema.page)
      .where(eq(schema.page.slug, pageSlug))
      .then((results) => results[0]);

    if (!existingPage) {
      console.log(`Creating page entry for ${pageSlug}...`);
      await db.insert(schema.page).values({
        slug: pageSlug,
        views: 1, // Default value
      });
    }

    try {
      // Fetch the discussion and its comments from GitHub GraphQL API
      const { repository } = await graphqlWithAuth<{
        repository: {
          discussion: {
            comments: {
              nodes: Array<{
                id: string;
                author: {
                  login: string;
                  avatarUrl: string;
                } | null;
                bodyText: string;
                createdAt: string;
                replies: {
                  nodes: Array<{
                    id: string;
                    author: {
                      login: string;
                      avatarUrl: string;
                    } | null;
                    bodyText: string;
                    createdAt: string;
                  }>;
                };
              }>;
            };
          };
        };
      }>(
        `
        query GetDiscussionComments($owner: String!, $repo: String!, $number: Int!) {
          repository(owner: $owner, name: $repo) {
            discussion(number: $number) {
              comments(first: 100) {
                nodes {
                  id
                  author {
                    login
                    avatarUrl
                  }
                  bodyText
                  createdAt
                  replies(first: 100) {
                    nodes {
                      id
                      author {
                        login
                        avatarUrl
                      }
                      bodyText
                      createdAt
                    }
                  }
                }
              }
            }
          }
        }
      `,
        {
          owner: "jakejarvis", // Replace with your GitHub username
          repo: "jarv.is", // Replace with your repository name
          number: discussionNumber,
        }
      );

      const comments = repository.discussion.comments.nodes;

      for (const comment of comments) {
        if (!comment.author) continue; // Skip comments from deleted users

        // Find or create the user
        const existingUser = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.name, comment.author.login))
          .then((results) => results[0]);

        let userId: string;

        if (!existingUser) {
          console.log(`Creating user ${comment.author.login}...`);

          // Create a new user
          const insertedUser = await db
            .insert(schema.user)
            .values({
              id: `github-${comment.author.login}`,
              name: comment.author.login,
              email: `${comment.author.login}@users.noreply.github.com`, // GitHub users get noreply email addresses
              emailVerified: true,
              image: comment.author.avatarUrl,
              createdAt: new Date(comment.createdAt),
              updatedAt: new Date(),
            })
            .returning({ id: schema.user.id });

          userId = insertedUser[0].id;
        } else {
          userId = existingUser.id;
        }

        // Insert the parent comment
        console.log(`Adding comment from ${comment.author.login}...`);
        const [insertedComment] = await db
          .insert(schema.comment)
          .values({
            content: comment.bodyText,
            pageSlug: pageSlug,
            userId: userId,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(),
          })
          .returning({ id: schema.comment.id });

        // Process replies
        for (const reply of comment.replies.nodes) {
          if (!reply.author) continue; // Skip replies from deleted users

          // Find or create the user for the reply
          const existingReplyUser = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.name, reply.author.login))
            .then((results) => results[0]);

          let replyUserId: string;

          if (!existingReplyUser) {
            console.log(`Creating user ${reply.author.login}...`);

            // Create a new user
            const insertedReplyUser = await db
              .insert(schema.user)
              .values({
                id: `github-${reply.author.login}`,
                name: reply.author.login,
                email: `${reply.author.login}@users.noreply.github.com`,
                emailVerified: true,
                image: reply.author.avatarUrl,
                createdAt: new Date(reply.createdAt),
                updatedAt: new Date(),
              })
              .returning({ id: schema.user.id });

            replyUserId = insertedReplyUser[0].id;
          } else {
            replyUserId = existingReplyUser.id;
          }

          // Insert the reply
          console.log(`Adding reply from ${reply.author.login}...`);
          await db.insert(schema.comment).values({
            content: reply.bodyText,
            pageSlug: pageSlug,
            parentId: insertedComment.id,
            userId: replyUserId,
            createdAt: new Date(reply.createdAt),
            updatedAt: new Date(),
          });
        }
      }

      console.log(`Finished processing discussion #${discussionNumber} for ${pageSlug}`);
    } catch (error) {
      console.error(`Error processing discussion #${discussionNumber}:`, error);
    }
  }

  console.log("🌱 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Disconnecting from database...");
    process.exit(0);
  });
