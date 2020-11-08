const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizationCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/index.js',
    main: './src/main.js',
    product: './src/product.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    // publicPath: '/'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|dist/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(sc|c)ss$/,
        use: [ 
          devMode ? 'style-loader' 
          : MiniCssExtractPlugin.loader, 
          // MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader',
          { 
            loader: 'postcss-loader', 
            options: {
              plugins: (loader) => [
                require('postcss-flexbugs-fixes'), 
                require('autoprefixer')({
                'browsers': ['last 4 versions']
              })]
            }
          }
          
        ]
      },
      // {
      //   test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader',
      //   options: {
      //     name: '[name].[hash].[ext]',
      //     limit: 10000,
      //   }
      // }
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: devMode ?
          {} :
          {
            minimize: true
          }
        }]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'assets/img/[hash]-[name].[ext]'
            } 
        }]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit: 8000,
            name: 'assets/fonts/[name].[ext]',
          }
        }]
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['app'],
      path: path.resolve(__dirname, './dist'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/main.html',
      chunks: ['main'],
      path: path.resolve(__dirname, './dist'),
      filename: 'main.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/product.html',
      chunks: ['product'],
      path: path.resolve(__dirname, './dist'),
      filename: 'product.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
        ignore: ['*.css','*.scss']
      }
    ]),
    new CleanWebpackPlugin(['dist'])
  ],
  optimization: devMode ?
  {} : 
  {
    minimize: true,
    concatenateModules: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizationCssAssetsPlugin({})
    ],
  }
  
};