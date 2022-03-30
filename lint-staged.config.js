module.exports = {
  "**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint hoteler-web --fix"
      : `eslint --format stylish ${filenames.join(" ")} --fix`,
  "*.{html,md,json,yml,js,css}": (filenames) => {
    const prettier = `prettier --write -- ${filenames.join(" ")}`;
    // const git = `git add ${filenames.join(" ")}`;
    return [prettier];
  },
};
