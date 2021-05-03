const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@pages': path.resolve(__dirname, 'src/components/pages'),
        '@shared': path.resolve(__dirname, 'src/shared'),
      },
    },
  }
}
