const path = require('path');
const glob = require("glob");

const srcDir = path.join(__dirname, 'src', 'tsc');
const entries = glob
  .sync("**/*.ts", {
    cwd: srcDir,
  })
  .map(function (key) {
    key = key.replace(".ts", "");
    return [key, path.resolve(srcDir, key)];
  });

// 配列→{key:value}の連想配列へ変換
const entryObj = Object.fromEntries(entries);

module.exports = {
  mode: 'development',
  entry: entryObj,
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
    modules: ['node_modules', 'src'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
};
