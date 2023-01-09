/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "@next/next/no-img-element": 0,
  },
}
