module.exports = {
  swSrc: "public/sw.js",
  swDest: "dist/sw.js",
  globDirectory: "dist/",
  globPatterns: ["**/*.{html,js,css,png,svg,ico,json}"],
  clientsClaim: true,
  skipWaiting: true,

  runtimeCaching: [],
};
