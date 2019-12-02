# img-hide
加密图片，使用loader加密图片，使用vue指令解密图片，防盗图的小功能。

## Install
`npm install --save-dev img-hide`

## Options

### `path`

Type: `String`


设置需要加密图片的路径，默认为外层rules的匹配路径（即：若都使用默认值，则加密全部图片）



### `whiteList`


Type: 'Array<String>'


除了指定加密路径，还可以进一步设置需要加密的`图片名称`**(包括.png等后缀名)**


## Usage


**vue.cli2**


- vue.cli2脚手架中使用, 打包配置中添加方式

```
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10
            }
          },
          {
            loader: 'img-hide',
            options: {
              path: path.resolve(__dirname, './test'),  //  指定加密路径（绝对路径）
              whiteList: ['logo.png'] //  指定路径下的白名单
            }
          }
        ],
      },
    ],
  }
}
```

**vue.cli3**

- vue.cli3脚手架中使用，在vue.config.js中添加如下配置。



```
const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('img-hide').loader('img-hide')
        .options({
          path: path.resolve(__dirname, './src/images'), // 指定加密路径（绝对路径）
          whiteList: ['icon1.png']  //  指定路径下的白名单
        }).end()
      .use('url-loader').loader('url-loader').tap(options => Object.assign(options, { limit: 10 }))
  }
}
```

**附属上解密方法**


为了方便使用，解密方法直接挂在了这个loader对象上了，使用方法如下。

```
//  main.js
import { vueDecode } from 'img-hide'

Vue.use(vueDecode)

```


在vue中，需要解密的图片加上指令(**注意：不要在非加密图片使用此指令**)

```
<img src="./images/test.png" v-decode-img>
```