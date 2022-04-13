// Initialize a new pageview database. For use with Fauna Schema Migrate:
// https://github.com/fauna-labs/fauna-schema-migrate#readme

import faunadb from "faunadb";
const {
  CreateCollection,
  CreateIndex,
  CreateFunction,
  Query,
  Collection,
  Role,
  Var,
  Index,
  Let,
  Match,
  Lambda,
  Get,
  Create,
  Update,
  Add,
  Select,
  If,
  Exists,
  ToInteger,
} = faunadb.query;

// initializes the empty database
CreateCollection({ name: "hits" });

// this allows us to quickly pull a post's corresponding row
CreateIndex({
  name: "hits_by_slug",
  source: Collection("hits"),
  terms: [
    {
      field: ["data", "slug"],
    },
  ],
  unique: false,
  serialized: true,
});

// a wrapper to get a post's row, add one to it, and return the new tally
CreateFunction({
  name: "increment_hit",
  body: Query(
    Lambda(
      "slug",
      Let(
        { match: Match(Index("hits_by_slug"), Var("slug")) },
        If(
          Exists(Var("match")),
          Let(
            {
              ref: Select("ref", Get(Var("match"))),
              hits: ToInteger(Select("hits", Select("data", Get(Var("match"))))),
            },
            Update(Var("ref"), { data: { hits: Add(Var("hits"), 1) } })
          ),
          Create(Collection("hits"), { data: { slug: Var("slug"), hits: 1 } })
        )
      )
    )
  ),
  role: Role("server"),
});
