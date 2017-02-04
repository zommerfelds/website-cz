const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
//const layouts     = require('metalsmith-layouts');
//const permalinks  = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const jade = require('metalsmith-jade')
const ignore = require('metalsmith-ignore');
const uglify = require('metalsmith-uglify');

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
    pretty: false,
  }))
  .use(uglify({
    removeOriginal: true,
    order: ['js/vendor/*', 'js/*'],
    concat: 'js/concat.min.js'
  }))
  .use(sass({
    outputStyle: 'expanded',
    outputDir: 'css/',
  }))
  /*.use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))*/
  .build(function(err, files) {
    if (err) { throw err; }
  });
