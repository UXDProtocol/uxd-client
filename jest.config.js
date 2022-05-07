module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)spec)\\.ts$',
  transform: {
    '\\.ts$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
};
