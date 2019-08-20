var toTitleCase = (string) => {
  return string.toLowerCase().split(' ').map(word => {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

module.exports = toTitleCase;
