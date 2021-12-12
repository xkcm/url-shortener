
module.exports = {
  webpack: {
    configure: webpackConfig => {
      delete webpackConfig.module.rules[1].oneOf[2].include;
      return webpackConfig;
    }
  }
}
