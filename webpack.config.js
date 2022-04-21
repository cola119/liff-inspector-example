const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type import('webpack').Configuration */
const config = {
  context: path.join(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 3000,
  },
  plugins: [new HtmlWebpackPlugin({ template: "../public/index.html" })],
};

module.exports = config;
