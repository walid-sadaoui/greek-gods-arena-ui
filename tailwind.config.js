module.exports = {
  mode: 'jit',
  purge: {
    // paths to all of the template files in the project
    content: ['./src/**/*.html', './src/**/*.tsx', './**/*.html'],

    // default extractor including tailwind's special characters
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
  theme: {
    extend: {
      fontFamily: {
        greek: '"Dalek Pinpoint"',
        mono: '"Share Tech Mono"',
        sans: 'Acme',
      },
      maxHeight: {
        '3/4': '75%',
      },
      backgroundImage: {
        wall: 'url(/src/assets/img/wall.jpg)',
      },
      borderRadius: {
        container: '95% 4% 92% 5% / 4% 95% 6%',
      },
      width: {
        100: '25rem',
        120: '30rem',
      },
      boxShadow: {
        play: '0 10px #31ccff',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
