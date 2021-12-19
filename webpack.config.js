const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:
    process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    // 定义别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, 'src/common/utils'),
      '@widget': path.resolve(__dirname, 'src/common/widget'),
      '@assets': path.resolve(__dirname, 'src/common/assets'),
    },
    // 当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: ['.ts', '.tsx', '.js', '.json', 'svg'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(j|t)sx?/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true, //只编译不检查
          compilerOptions: {
            module: 'es2015',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
            },
          },
          //{
          //  loader: 'postcss-loader',
          //  options: {
          //    plugins: [require('autoprefixer')]
          //  }
          //}
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
            },
          },
          //{
          //  loader: 'postcss-loader',
          //  options: {
          //    plugins: [require('autoprefixer')]
          //  }
          //},
          // 如果是手机端就要配置
          // {
          //   loader: 'px2remote-loader',
          //   options: {
          //     remUnit: 75, // 基础尺寸
          //     remPrecesion: 8 // 精确到多少位
          //   }
          // },
          'less-loader',
        ],
      },
      // 处理图片类
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    open: false,
    port: 3000,
    historyApiFallback: {
      // browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: './index.html',
    },
  },
}
