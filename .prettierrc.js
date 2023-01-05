/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false,
      },
    },
  ],
}
