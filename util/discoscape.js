// Code from stackoverflow modified
module.exports = function escapeMarkdown(text) {
    var unescaped = text.replace(/\\(\*|`|~|\\)/g, '$1'); // unescape any "backslashed" character
    var escaped_ = unescaped.replace(/(\*|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
    var escaped = unescaped.replace(/(\*|`|\\)/g, '​$1'); // escape *, _, `, ~, \
    return escaped;
  }
  