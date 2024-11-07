const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js", // Main entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", // Use 'production' for optimized builds
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
  plugins: [
    new BundleAnalyzerPlugin(),
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

  devtool: "inline-source-map", // Source maps for easier debugging
};
