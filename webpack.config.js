import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import WebpackAssetsManifest from "webpack-assets-manifest";
import CopyPlugin from "copy-webpack-plugin";
import { LicenseWebpackPlugin as LicensePlugin } from "license-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

// PostCSS stuff:
import autoprefixer from "autoprefixer";
import postcssSvgo from "postcss-svgo";
import postcssFocus from "postcss-focus";

// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";

const globalBannerText = `Licensed under MIT. Copyright (c) 2015-${new Date().getFullYear()} Jake Jarvis <https://jarv.is/>.`;

export default {
  entry: [path.resolve(__dirname, "assets/js/index.js"), path.resolve(__dirname, "assets/sass/main.scss")],
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "inline-source-map",
  output: {
    filename: isProd ? "js/[name]-[contenthash:6].js" : "js/[name].js",
    path: path.resolve(__dirname, "static/assets/"),
    publicPath: "/assets/",
    clean: true,
    environment: {
      // https://github.com/babel/babel-loader#top-level-function-iife-is-still-arrow-on-webpack-5
      arrowFunction: false,
    },
    devtoolModuleFilenameTemplate: "webpack:///[resource-path]",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name]-[contenthash:6].css" : "css/[name].css",
    }),
    new webpack.BannerPlugin({
      banner: `/*! ${globalBannerText} */`,
      raw: true,
    }),
    new LicensePlugin({
      outputFilename: "third_party.txt",
      perChunkOutput: false,
      addBanner: true,
      renderBanner: (filename) => `/*!
 * ${globalBannerText}
 * See here for third-party libraries: https://jarv.is/assets/${filename}
 */`,
      additionalModules: [
        {
          name: "twemoji",
          directory: path.join(__dirname, "node_modules", "twemoji"),
        },
      ],
      licenseFileOverrides: {
        twemoji: "LICENSE-GRAPHICS", // we only use the emojis, not the bundled code
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/images/"),
          to: "images/",
          globOptions: {
            dot: false,
          },
        },
        {
          from: path.resolve(__dirname, "node_modules/twemoji-emojis/vendor/svg/"),
          to: "emoji/",
          globOptions: {
            dot: false,
          },
        },
      ],
    }),
    new WebpackAssetsManifest({
      writeToDisk: true, // allow Hugo to access file in dev mode
      output: path.resolve(__dirname, "data/manifest.json"),
      publicPath: true,
      integrity: true,
      integrityHashes: ["sha384"],
      customize: (entry) => {
        // don't add thousands of unneeded twemoji graphics to the manifest
        if (entry.key.startsWith("emoji/") || entry.key.endsWith(".map")) return false;
      },
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
                    corejs: 3,
                    useBuiltIns: "entry",
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    pragma: "h",
                    pragmaFrag: "Fragment",
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
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
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
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        type: "asset/resource",
        generator: {
          filename: isProd ? "fonts/[name]-[contenthash:6][ext]" : "fonts/[name][ext]",
        },
      },
    ],
  },
  performance: {
    // only evaluate JS and CSS file sizes (ignore source maps, images, etc.)
    assetFilter: (assetFilename) => /\.js$|\.css$/.test(assetFilename),
    maxAssetSize: 990000, // ~99 KiB
  },
  optimization: {
    sideEffects: true,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        parallel: true,
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
            passes: 3,
          },
          format: {
            // cut all comments except for the banner declared above via LicensePlugin:
            comments: (astNode, comment) => comment.value.toLowerCase().includes("third-party libraries"),
            ascii_only: true, // some symbols get disfigured otherwise
          },
          mangle: true,
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        test: /\.css$/,
        minify: CssMinimizerPlugin.cleanCssMinify,
        minimizerOptions: {
          compatibility: "*",
          level: 2,
          processImport: false,
          sourceMap: true,
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
    static: {
      directory: path.resolve(__dirname, "public"),
      watch: true,
    },
    host: "0.0.0.0", // weird docker bind behavior
    port: process.env.PORT || 1337,
    compress: true,
    liveReload: true,
    setupExitSignals: false, // prevent dangling server when started via gulp
  },
};
