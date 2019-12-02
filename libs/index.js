const { getOptions } = require('loader-utils')
module.exports = function (souce) {
  //  获取 loader 的配置参数 options
  const options = getOptions(this)
  //  不属于 options.path 目录下的图片不进行加密处理
  if (options.path && this.resourcePath.indexOf(options.path) === -1) {
    return souce
  }
  /**
   * 路径匹配，但是不在options.whiteList白名单里面的不进行加密处理
   * 不配置options.whiteList白名单项，则匹配路径下的图片全部进行加密处理
   */
  if (options.path && this.resourcePath.indexOf(options.path) === 0) {
    if (options.whiteList && Array.isArray(options.whiteList)) {
      var name = ''
      try {
        name = this.resourcePath.split('/').slice(-1).toString()
      } catch {
        console.log(this.resourcePath + '的格式不正确')
      }
      if (options.whiteList.indexOf(name) === -1) {
        return souce
      }
    }
  }
  var src = []
  for (let i = souce.length; i > 0; i--) {
    src.push(souce[i - 1])
  }
  var buf = Buffer.from(src)
  return buf
}
module.exports.raw = true

//  额外挂载一个解密工具
module.exports.vueDecode = function (Vue) {
  Vue.directive('decodeImg', {
    inserted (el) {
      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open("GET",el.src,true)
      xmlhttp.responseType = "arraybuffer"
      xmlhttp.onload = function(){
          if (this.status == 200) {
            var arrayBuf = this.response
            var buf = new ArrayBuffer(arrayBuf.byteLength)
            var v1 = new Uint8Array(buf)
            var v2 = new Uint8Array(arrayBuf)
            for (var i = 0; i < arrayBuf.byteLength; i++) {
              v1[i] = v2[arrayBuf.byteLength - 1 - i]
            }
  
            var blobFile = new Blob([buf])
  
            el.onload = function() {
              window.URL.revokeObjectURL(el.src)
            }
            el.src = window.URL.createObjectURL(blobFile)
          }
      }
      xmlhttp.send()
    }
  })
}