const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const babelConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, './.babelrc'))
)

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundled.js"
  },
  module: {
    rules: [
      {
        // Many react-native libraries do not compile their ES6 JS.
        test: /\.js$/,
        include: [
          /node_modules\/react-native-/,
          path.join(__dirname, './node_modules/tcomb-form-native'),
          path.join(__dirname, './src')
        ],
        exclude: /node_modules\/react-native-web\//,
        loader: 'babel-loader',
        options: {
          ...babelConfig,
          plugins: ['react-native-web', ...babelConfig.plugins],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 16384
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new webpack.ProvidePlugin({
       FormSchema: 'FormSchema'
    })
]
};
