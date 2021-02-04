'use strict'
const path = require('path')
const fs=require("fs");

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = '中油农垦'

// 闪屏
// 如果 pages 中 增加 launchImage 则页面加载时增加闪屏
// D:\oTwo-cli3\src\router\permission.js 中 移除
var launchImage = fs.readFileSync("./public/launch.html","utf-8");

module.exports = {
	devServer:{
		openPage:'/reserve.html'
	},
	publicPath:'./',
	assetsDir:'assetsdir',
	pages: {
		reserve: {
			// page 的入口
			// entry: 'src/main.js',
			entry: 'src/views/reserve/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'reserve.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '中油农垦',

			launchImage:launchImage,
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			// 添加下面参数后.页面白屏,原因还没有找到,
			// chunks: ['chunk-vendors', 'chunk-common']
			// 更改 chunks 打包成功
			chunks: ['chunk-vendors', 'chunk-common', 'reserve', `manifest.reserve`]
		},
	},
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	css: {
		loaderOptions: {
			stylus: {
				'resolve url': true,
				'import': [
					'./src/theme'
				]
			}
		}
	},
	pluginOptions: {
		'cube-ui': {
			postCompile: true,
			theme: true
		}
	}
}
