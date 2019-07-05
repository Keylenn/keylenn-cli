const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require("autoprefixer");
const px2vw = require('postcss-px2vw');

module.exports = {
  plugins: [
    postcssPresetEnv(),
    autoprefixer({}), // Replace Autoprefixer browsers option to Browserslist config. Use browserslist key in package.json.
    px2vw({
      viewportWidth: 750,
      unitPrecision: 5,
      viewportUnit: 'vw',
      minPixelValue: 1,
    }),
  ]
}
