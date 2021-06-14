const path = require("path");
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SriPlugin = require("webpack-subresource-integrity");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: [
    path.resolve(__dirname, "assets/js/index.js"),
    path.resolve(__dirname, "assets/sass/main.scss"),
  ],
  mode: isProd ? "production" : "development",
  devtool: false,
  output: {
    filename: isProd ? "js/[name]-[contenthash:6].js" : "js/[name].js",
    path: path.resolve(__dirname, "static/assets/"),
    publicPath: "/assets/",
    clean: true,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    //new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name]-[contenthash:6].css" : "css/[name].css",
    }),
    new SriPlugin({
      hashFuncNames: ["sha512"],
      enabled: true,
    }),
    new WebpackAssetsManifest({
      writeToDisk: true,
      output: path.resolve(__dirname, "data/manifest.json"),
      publicPath: true,
      integrity: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/twemoji-emojis/vendor/svg/",
          to: "emoji/"
        },
      ],
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
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
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
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    publicPath: "/assets/",
    port: process.env.PORT || 1337,
  },
};
