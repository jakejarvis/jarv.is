// this is required to properly bundle Firebase's SDK within a Netlify function:
// https://github.com/netlify/netlify-lambda#webpack-configuration

const externals = require("webpack-node-externals");

module.exports = {
  externals: [externals()],
};
