const path = require("path");
const fs = require("fs");
const defaultValues = require("./default-values.json");

const packagePath = path.resolve("./package.json");
const currentPackageSettings = JSON.parse(
  fs.readFileSync(packagePath, "utf-8")
);

module.exports = {
  ...defaultValues,
  ...currentPackageSettings,
  ...(currentPackageSettings.deployment ?? {}),
};
