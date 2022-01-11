module.exports = {
    entry: { 
      index: '/src/app/index.js',
      home: '/src/app/home.js',
    },
    output: {
      path: __dirname + '/src/public/js',
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            }
          }
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
      ]
    }
  }