module.exports = {
  mode: 'jit',
  purge: {
    // paths to all of the template files in the project
    content: ['./src/**/*.html', './src/**/*.tsx', './public/**/*.html'],

    // default extractor including tailwind's special characters
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
