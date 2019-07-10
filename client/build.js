/* eslint import/no-extraneous-dependencies: 0 */
const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const sass = require('metalsmith-sass');
const pug = require('metalsmith-pug');
const ignore = require('metalsmith-ignore');
const uglify = require('metalsmith-uglify');
const collections = require('metalsmith-collections');
const filterCollections = require('metalsmith-collections-filter');
const layouts = require('metalsmith-layouts');
const dateFormatter = require('metalsmith-date-formatter');

const deploymentData = eval(fs.readFileSync('./2-deploymentData.js', 'utf8'));

const devMode =
  process.env.DEV_MODE === 'true' || deploymentData.contactUrl === undefined;
console.log('Deployment data:', JSON.stringify(deploymentData));
console.log('Dev mode:', devMode);

metalsmith(__dirname)
  .metadata({
    title: 'Christian Zommerfelds',
    disableRecaptcha: devMode
  })
  .source('./src')
  .destination('./dist')
  // .clean(false)
  .use(
    sass({
      outputDir: 'css/'
    })
  )
  .use(markdown())
  .use(
    collections({
      posts: {
        pattern: 'posts/**.html',
        sortBy: 'date',
        reverse: true
      }
    })
  )
  .use(
    filterCollections({
      posts: post => !post.draft
    })
  )
  .use(dateFormatter())
  .use((files, m, done) => {
    // there is a cyclical dependency between the plugins,
    // so let's fix some permalinks before we run pug
    const { posts } = m.metadata();
    for (let i = 0; i < posts.length; i += 1) {
      if (posts[i].path.endsWith('.html')) {
        posts[i].path = posts[i].path.slice(0, -'.html'.length);
      }
    }
    done();
  })
  .use(ignore('pug/**')) // don't compile helper files, they will be linked from the main entry points
  .use(
    pug({
      pretty: devMode,
      useMetadata: true
    })
  )
  .use(
    permalinks({
      relative: false
    })
  )
  .use(
    layouts({
      directory: 'src/pug',
      default: 'post.pug',
      pattern: 'posts/**'
    })
  )
  .use(
    uglify({
      root: 'js',
      concat: { file: 'scripts.min.js' },
      removeOriginal: true
    })
  )
  .build(err => {
    if (err) {
      throw err;
    }
  });
