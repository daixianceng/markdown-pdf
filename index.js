const fs = require('fs');
const packageJson = require('./package.json');
const express = require('express');
const app = express();
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true,
}).use(require('markdown-it-imsize'));

require.extensions['.html'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

require.extensions['.md'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = md.render(content);
};

const { home } = require('./routes');

try {
  app.use(express.static('public'));

  app.use('/favicon.ico', express.static('public/favicon.ico'));

  app.get('/', home);

  // More markdown pages
  // app.get('/other', other);

  const port = process.env.PORT || 9000;

  app.listen(port, function() {
    console.log(`${packageJson.name} listening on port ${port}!`);
  });
} catch (e) {
  console.error(e);
}
