"webpack --watch",一直开着可以监控，保存一下就会自动打包
webpack//命令行输入根据配置文件进行打包
webpack show.js --output bundle.js //命令行直接打包

使用的库：
"css-loader": "^1.0.0",遍历css文件
"style-loader": "^0.23.1"//将css写到文档中
"jquery": "^3.3.1"
"webpack-dev-server": "^3.1.9"将项目部署到服务器端

说明1: devDependencies是开发依赖，只会在打包过程中用到，不会包含到最后的代码中
说明2: 如果想安装指定版本的webpack，使用npm install --save-dev webpack@<版本


运行
npm start的时候可能会报错
Refusing to install package with name "webpack" under a package
那么请检查下你的项目中是否带有webpack串了，同时，最好本地安装一个webpack
  "devDependencies": {
    "jquery": "^3.3.1",
    "webpack": "^4.22.0",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.9"
  }