vue服务端渲染,主要是[nuxtjs](https://www.nuxtjs.cn/guide)

## 跑起来
### 安装依赖
$ npm install

### 以localhost:3000启动开发模式 
$ npm install

## 开启吉他数据接口服务
依赖express和multer,数据持久化直接存在guitardata.json,数据变化会该文件进行读写,吉他谱数据存在imgs目录下。
### 在server目录下执行
$ node .\guiterserver.js


## 生产环境
### 先打包公共依赖
$ npm run build
### 启动服务端渲染服务
$ npm run start

