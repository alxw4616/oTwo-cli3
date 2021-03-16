# oTwo-cli3 移动版 开发框架
### 基于vue-cli3.0 的常用开发框架
```
1.用例cube-ui做为移动端的基本控件
2.增加移动单页--很多时候在部署目录中会要求增加一二个单面用以解决一些特殊的需求.单独为这些简单的页面创建"工程"不利于项目部署.所以增加"pages"文件夹用以收容这此零散的页面.
3.附加页面--同样的部署的问题.一些旧有的页面静态页面也会部署在同一文件夹下.通过copy在打包时行成可直接覆盖线上文件的dist.以避免部署出现问题
```

## 本地调式
http://127.0.0.1:8080/reserve.html#/
reserve.html 对应 vue.config.js pages中的值

## Yapi 接口地址
http://49.233.28.44:3000/project/47/interface/api

## Project setup
```
npm i --registry=https://registry.npm.taobao.org 或 双击 _install.bet
注: 直接使用cnpm安装会报错,且无法运行
```

### Compiles and hot-reloads for development
### 本地开发及调试,数据接口应走mock
```
npm run dev  或 双击 _dev.bet
```

### Compiles and hot-reloads for test
### 本地开发及调试,数据接口应走 相应的测试服务
```
npm run test  或 双击 _test.bet
```

### Compiles and minifies for production
### 发布
```
npm run build 或 双击 build.bet
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
