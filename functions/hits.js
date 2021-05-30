const faunadb = require("faunadb");
const numeral = require("numeral");
const pluralize = require("pluralize");
require("dotenv").config();
const q = faunadb.query;

// https://github.com/netlify/netlify-lambda/issues/201
require("encoding");

exports.handler = async (event, context) => {
  const { slug } = event.queryStringParameters;
  const index = "hits_by_slug";
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  // some rudimentary error handling
  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Page slug not provided.",
      }),
    };
  }

  // check if a counter for the slug already exists
  const doesPageExist = await client.query(q.Exists(q.Match(q.Index(index), slug)));
  if (!doesPageExist) {
    await client.query(
      q.Create(q.Collection("hits"), {
        data: {
          slug: slug,
          hits: 0,
        },
      })
    );
  }

  // fetch the slug's document and send it back with one more hit
  const doc = await client.query(q.Get(q.Match(q.Index(index), slug)));
  const new_hits = doc.data.hits + 1;
  await client.query(
    q.Update(doc.ref, {
      data: {
        hits: new_hits,
      },
    })
  );

  // send client the new hit count
  return {
    statusCode: 200,
    body: JSON.stringify({
      slug: slug,
      hits: new_hits,
      pretty_hits: numeral(new_hits).format("0,0"),
      pretty_unit: pluralize("hit", new_hits),
    }),
  };
};
