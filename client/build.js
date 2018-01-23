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
if (devMode) {
  console.log('WARNING: devMode = true');
}

metalsmith(__dirname)
  .metadata({
    title: 'Christian Zommerfelds',
    description: 'It\'s about saying »Hello« to the World!',
    url: 'http://uiaeuiaeuiae',
    devMode
  })
  .source('./src')
  .destination('./dist')
  // .clean(false)
  .use(sass({
    outputDir: 'css/'
  }))
  .use(markdown())
  .use(collections({
    posts: 'posts/**',
    sortBy: 'date',
    reverse: true
  }))
  .use(ignore('layouts/**'))
  .use((files, m, done) => { // there is a cyclical dependency between the plugins, so let's fix some permalinks before we run jade
    for (const post of m.metadata().posts) {
      if (post.path.endsWith('.html')) {
        post.path = post.path.slice(0, -'.html'.length);
      }
    }
    done();
  })
  .use(jade({
    pretty: devMode,
    useMetadata: true
  }))
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'jade',
    directory: 'src/layouts',
    default: 'post.jade',
    pattern: 'posts/**'
  }))
  .use(uglify({
    root: 'js',
    concat: {file: 'scripts.min.js'},
    removeOriginal: true
  }))
  .build((err) => {
    if (err) { throw err; }
  });
