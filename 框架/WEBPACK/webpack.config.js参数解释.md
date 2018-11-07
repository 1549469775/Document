```
module.exports={
    entry:'./src/js/show.js',//入口文件
    output:{
        path:__dirname + "/dist",//输出路径
        filename:'bundle.js',//输出文件名称
    },
    module:{
        rules:[
            {
                // 凡是css文件，都会使用这两种加载器加载
                test:/\.css$/,
                loader:'style-loader!css-loader'
            }
        ]
    },
    devServer:{
        //运行webpack-dev-pack的端口
        port:8081
    }
}
```

`entry`入口文件

`output`

​	`path`

​	`filename`

`module`

`devServer`

