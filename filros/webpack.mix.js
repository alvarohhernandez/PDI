const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

let nameChunks = 'js/app/[name].js';
if (mix.inProduction()) {
  nameChunks = 'js/app/[name].[chunkhash].js';
}

mix.webpackConfig({
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'resources/js/'),
      '@styles': path.resolve(__dirname, 'resources/sass/'),
      'fonts': path.resolve(__dirname, 'resources/fonts/'),
      'images': path.resolve(__dirname, 'resources/img/'),
    }
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@import "@styles/_variables.scss";`,
          }
        }
      ]
    }]
  },
  output: {
    chunkFilename: nameChunks,
  }
});

mix.browserSync(process.env.MIX_BROWSERSYNC_PROXY || 'localhost:8000');

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
