import path from "path";
import { fileURLToPath } from 'url';
import WebpackAssetsManifest from "webpack-assets-manifest";
import SriPlugin from "webpack-subresource-integrity";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import autoprefixer from "autoprefixer";
import postcssSvgo from "postcss-svgo";
import postcssFocus from "postcss-focus";
import postcssColorRgbaFallback from "postcss-color-rgba-fallback";
import postcssCombineDuplicatedSelectors from "postcss-combine-duplicated-selectors";
import postcssNormalizeCharset from "postcss-normalize-charset";

// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

export default {
  entry: [
    path.resolve(__dirname, "assets/js/index.js"),
    path.resolve(__dirname, "assets/sass/main.scss"),
  ],
  mode: isProd ? "production" : "development",
  devtool: "source-map",
  output: {
    filename: isProd ? "js/[name]-[contenthash:6].js" : "js/[name].js",
    path: path.resolve(__dirname, "static/assets/"),
    publicPath: "/assets/",
    clean: true,
    crossOriginLoading: "anonymous",
    environment: {
      // https://github.com/babel/babel-loader#top-level-function-iife-is-still-arrow-on-webpack-5
      arrowFunction: false,
    },
  },
  plugins: [
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
          from: path.resolve(__dirname, "assets/images/"),
          to: "images/",
        },
        {
          from: path.resolve(__dirname, "node_modules/twemoji-emojis/vendor/svg/"),
          to: "emoji/",
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
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    include: [
                      "transform-arrow-functions",
                      "transform-block-scoping",
                      "transform-template-literals",
                    ],
                    useBuiltIns: "entry",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                config: false,
                plugins: [
                  autoprefixer(),
                  postcssSvgo({
                    encode: true,
                  }),
                  postcssFocus(),
                  postcssColorRgbaFallback({
                    properties: [
                      "background-image"
                    ],
                  }),
                  postcssCombineDuplicatedSelectors(),
                  postcssNormalizeCharset(),
                ],
              },
            },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
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
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        terserOptions: {
          compress: {
            arrows: false,
            negate_iife: false,
            sequences: false,
          },
          mangle: true,
        },
      }),
      new CssMinimizerPlugin({
        test: /\.css$/,
        minify: CssMinimizerPlugin.cleanCssMinify,
        minimizerOptions: {
          compatibility: "*",
          level: 1,
          processImport: false,
          format: {
            breaks: {
              afterAtRule: true,
              afterBlockBegins: true,
              afterBlockEnds: true,
              afterComment: true,
              afterRuleEnds: true,
              beforeBlockEnds: true,
            },
            spaces: {
              beforeBlockBegins: true,
            },
            semicolonAfterLastProperty: true,
          },
        },
      }),
    ],
  },
  devServer: {
    port: process.env.PORT || 1337,
    contentBase: path.join(__dirname, "public/"),
    watchContentBase: true,
    publicPath: "/assets/",
    compress: true,
  },
};
