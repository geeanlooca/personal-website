const fs = require("fs");
const crypto = require("crypto");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("cssVersion", () => {
    const css = fs.readFileSync("./src/css/style.css", "utf8");
    return crypto.createHash("md5").update(css).digest("hex").slice(0, 8);
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
