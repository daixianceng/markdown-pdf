const content = require('./home.md');
let html = require('../utils/mdTemplate.html');

html = html.replace('{{ title }}', 'Markdown to PDF');
html = html.replace(
  '{{ description }}',
  '死简单且高质量的 Markdown 转 PDF 工具',
);
html = html.replace('{{ body }}', content);

module.exports = function(req, res) {
  res.send(html);
};
