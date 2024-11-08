const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  return {
    entry: "./src/index.js", // Main entry file
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      path: path.resolve(__dirname, "dist"),
    },

    // Set the mode dynamically based on npm script
    mode: argv.mode || "development",

    module: {
      rules: [
        {
          test: /\.css$/, // Handle CSS files
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/, // Transpile JavaScript with Babel
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },

    optimization: {
      usedExports: argv.mode === "production", // Apply tree shaking only in production
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },

    plugins: [
      new BundleAnalyzerPlugin(), // Analyze bundle size
      new CleanWebpackPlugin(), // Cleans the 'dist' folder before each build
      new HtmlWebpackPlugin({
        template: "./src/index.html", // Generates HTML file with the bundle
      }),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"), // Specify the static directory
      },
      hot: true, // Enables hot module replacement
    },

    // Use source maps only in development
    devtool: argv.mode === "development" ? "inline-source-map" : false,
  };
};
