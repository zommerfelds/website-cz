const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks  = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const jade = require('metalsmith-jade');
const ignore = require('metalsmith-ignore');
const uglify = require('metalsmith-uglify');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');

require('./src/js/2-deploymentData'); // just make sure it exists

const devMode = false;

metalsmith(__dirname)
  .metadata({
    title: 'Christian Zommerfelds',
    description: 'It\'s about saying »Hello« to the World!',
    generator: 'Metalsmith',
    url: 'http://uiaeuiaeuiae',
    devMode
  })
  .source('./src')
  .destination('./dist')
  // .clean(false)
  .use(uglify({
    root: 'js',
    concat: {file: 'scripts.min.js'},
    removeOriginal: true
  }))
  .use(collections({
    posts: 'posts/*.md',
    sortBy: 'date',
    reverse: true
  }))
  .use(markdown())
  .use(permalinks())
  .use(ignore('_*.jade'))
  .use(jade({
    pretty: devMode,
    useMetadata: true
  }))
  .use(layouts({
    engine: 'jade',
    directory: 'src/layouts',
    default: 'post.jade',
    pattern: 'posts/**'
  }))
  .use(sass({
    outputDir: 'css/'
  }))
  .build((err) => {
    if (err) { throw err; }
  });
