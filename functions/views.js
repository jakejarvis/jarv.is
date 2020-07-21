// A very, very simple view counter for individual pages.
// Inspired by: https://github.com/leerob/leerob.io/blob/master/pages/api/increment-views.js

const admin = require("firebase-admin");

// read firebase credentials from .env file locally,
// otherwise read them from the Netlify UI
if (process.env.NODE_ENV === "development") require("dotenv").config();

export async function handler(event, context) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        project_id: "jakejarvis-com",
      }),
      databaseURL: "https://jakejarvis-com.firebaseio.com",
    });
  } catch (error) {
    // skip the "already exists" error message which is not an actual
    // error when we're hot-reloading.
    if (!/already exists/u.test(error.message)) {
      console.error("Firebase admin initialization error", error.stack);
    }
  }

  const db = admin.database();
  const page = event.queryStringParameters.page;

  // some basic error handling when we don't have required URL parameters
  if (!page) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: 'Missing "page" parameter.',
      }),
    };
  }

  // add a view to specified page's count and return the new total
  const ref = db.ref("views").child(page);
  const { snapshot } = await ref.transaction((views) => {
    // page has never been counted before, so start with the first view
    if (views === null) return 1;

    // otherwise, just add one!
    return views + 1;
  });

  // finally, send JSON back to user with the new view count
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      count: snapshot.val(),
    }),
  };
}
