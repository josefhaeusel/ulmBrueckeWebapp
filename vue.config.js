const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    impressum: {
      entry: 'src/impressum.js',
      template: 'public/impressum.html',
      filename: 'impressum.html',
    }
  },
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.plugin('html').tap((args) => {
  //     args[0].title = 'Flachsbrüche Ulm';
  //     return args;
  //   });
  // },
   
})
