const fs = require("fs");
const crypto = require("crypto");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/favicon.svg");
  eleventyConfig.addPassthroughCopy({
    "./animations/gmanim/dist": "animations"
  });
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("cssVersion", () => {
    const css = fs.readFileSync("./src/css/style.css", "utf8");
    return crypto.createHash("md5").update(css).digest("hex").slice(0, 8);
  });
  eleventyConfig.addShortcode("manim", function(name, width, height) {
    const theme = this.ctx?.theme || "dark";
    return `<iframe src="/animations/${name}/index.html?theme=${theme}" width="${width}" height="${height}" frameborder="0" style="display:block;margin:0 auto;" scrolling="no" allowfullscreen></iframe>`;
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
