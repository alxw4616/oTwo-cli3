// https://blog.csdn.net/qq_41725450/article/details/107915288
// vue-cli 3.0中使用postcss-px-to-viewport
// npm install postcss postcss-loader postcss-pxtorem -D --registry=https://registry.npm.taobao.org
module.exports = {
  plugins: {
    // 这个工具可以实现自动添加CSS3前缀
    "autoprefixer": {
      overrideBrowserslist: ["last 5 version", ">1%", "ie >=8"]
    },
    // 如果你使用vw来实现移动端多设备适配，这个工具可以把px转换为vw
    "postcss-px-to-viewport": {

      // 把什么单位转换成vw
      unitToConvert: 'px',

      // 这个可以按照你的设计稿来设置，是750就设置750，375就设置成375
      viewportWidth: 750,

      // 转换成vw单位的小数点后的保留位数
      unitPrecision: 6,

      // 属性列表，表示你要把哪些css属性的px转换成vw，这个*表示所有
      propList: ['*'],

      // 使用的单位，目前可选单位有vw,vh。一般我们都有vw
      viewportUnit: 'vw',

      // 字体使用的单位
      fontViewportUnit: 'vw',

      // 匹配不被转换为vw的选择器
      selectorBlackList: [],

      // 需要转换的最小值，一般1px像素不转换，以上才转换
      minPixelValue: 1,

      // 允许在媒体查询中转换px
      mediaQuery: false,

      // 替换包含vw的规则，而不是添加回退
      replace: true,

      // 忽略一些文件，比如“node_modules”，可以是正则表达式
      exclude: [],

      // ......
      landscape: false,

      // ......
      landscapeUnit: 'vw',

      // ......
      landscapeWidth: 568
    }
  }
}
