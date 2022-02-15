const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
        type: 'commonjs'
    }
  },
  // 종속성 제거
  externals: {
    react: { // UMD
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
        root: "React"
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
};