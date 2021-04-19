const path = require("path");

module.exports = {
  "**/*.ts?(x)": (filenames) =>
    filenames.length > 10
      ? "ng lint hoteler-web"
      : `tslint --format verbose --project ./tsconfig.json --config ./tslint.json ${filenames.join(
          " "
        )}`,
  "*.{html,md,json,yml,js,css}": (filenames) => {
    const prettier = `prettier --write -- ${filenames.join(" ")}`;
    // const git = `git add ${filenames.join(" ")}`;
    return [prettier];
  },
};
