const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
//const layouts     = require('metalsmith-layouts');
//const permalinks  = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const jade = require('metalsmith-jade')
const ignore = require('metalsmith-ignore');
const uglify = require('metalsmith-uglify');

require('./src/js/2-deploymentData'); // just make sure it exists

const devMode = true;

Metalsmith(__dirname)
  .metadata({
    title: 'Christian Zommerfelds',
    description: 'It\'s about saying »Hello« to the World!',
    generator: 'Metalsmith',
    url: 'http://uiaeuiaeuiae'
  })
  .source('./src')
  .destination('./dist')
  .clean(false)
  .use(markdown())
  .use(ignore('_*.jade'))
  .use(jade({
    pretty: devMode,
  }))
  .use(uglify({
    removeOriginal: true,
    order: [
      'js/vendor/jquery-*.min.js', // jquery before bootstrap
      'js/vendor/*', 'js/*'],
    concat: 'js/concat.min.js'
  }))
  .use(sass({
    outputDir: 'css/',
  }))
  /*.use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))*/
  .build(function(err, files) {
    if (err) { throw err; }
  });
