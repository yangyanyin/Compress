export const photoCompress = (file, w, objDiv) => {
  let ready = new FileReader()
  ready.readAsDataURL(file)
  ready.onload = function () {
    let re = this.result
    canvasDataURL(re, w, objDiv)
  }
}

export const convertBase64UrlToBlob = (urlData) => {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

export const canvasDataURL = (path, obj, callback) => {
  let img = new Image()
  img.src = path
  img.onload = function () {
    let that = this
    // 默认按比例压缩
    let w = that.width
    let h = that.height
    let scale = w / h
    w = obj.width || w
    h = obj.height || (w / scale)
    let quality = obj.quality
    // 生成canvas
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    // 创建属性节点
    let anw = document.createAttribute('width')
    anw.nodeValue = w
    let anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    let base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}
