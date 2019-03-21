module.exports = {
  plugins: ["security"],
  extends: ["standard", "plugin:security/recommended"],
  rules: {
    semi: [2, "always"],
    quotes: [2, "single"]
  },
  env: {
    jest: true
  }
};
