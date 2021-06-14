const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SriPlugin = require("webpack-subresource-integrity");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
  entry: [
    path.resolve(__dirname, "assets/js/index.js"),
    path.resolve(__dirname, "assets/sass/main.scss"),
  ],
  mode: "production",
  output: {
    filename: "js/[contenthash].js",
    path: path.resolve(__dirname, "static/"),
    publicPath: "/",
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[contenthash].css",
    }),
    new SriPlugin({
      hashFuncNames: ["sha384", "sha512"],
      enabled: true,
    }),
    new WebpackAssetsManifest({
      output: path.resolve(__dirname, "data/manifest.json"),
      integrity: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" }
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
    ],
  },
  /* optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: /^\**!|@preserve|@license|@cc_on|license/i,
      }),
    ],
  }, */
};
