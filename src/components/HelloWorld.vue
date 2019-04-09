<template>
  <div class="img-compress">
    <h3>html5的file图片上传及压缩</h3>
    <input type="file" @change="upload($event)">
    <div class="view-img">
      <img id="img" />
    </div>
  </div>
</template>

<script>
import {photoCompress, convertBase64UrlToBlob} from '../assets/js/compress.js'
export default {
  methods: {
    upload (file) {
      let _this = this
      // 1MB = 1024KB，1KB = 1024B(字节)
      let imgFile = file.target.files[0]
      let imgSize = imgFile.size // 取出来的size单位是B

      // 前端做了一个处理，如果图片小于2MB就直接上传。如果大于2MB，下先进行压缩在上传
      if (imgFile.size/1024 > 1024*2) {
        console.log('压缩前的图片大小——————' + imgFile.size + 'B——————' + imgFile.size / 1024 + 'KB——————' + imgFile.size / 1024 / 1024 + 'MB')
        photoCompress(imgFile, {quality: 0.8}, function (base64Codes) {
            let bl = convertBase64UrlToBlob(base64Codes)
            console.log('压缩后的图片大小——————' + bl.size + 'B——————' + bl.size / 1024 + 'KB——————' + bl.size / 1024 / 1024 + 'MB')
            _this.ajaxUpload(bl)
        })
      } else {
        _this.ajaxUpload(imgFile)
      }
    },
    // 上传成功后请求api上传给服务器
    ajaxUpload (imgFile) {
      let reader = new FileReader()
      reader.readAsDataURL(imgFile)
      reader.onload = function () {
        document.getElementById('img').src = this.result

      }
      // let imgInfo = new FormData()
      // let hostUrl = process.env.API_BASE_URL
      // imgInfo.append('image', imgFile)
      // imgInfo.append('token', localStorage.getItem('token'))
      // axios.post(hostUrl + '/v2/help_center/images/upload', imgInfo).then(res => {
      //   if (res.status === 200) {
      //     this.uploadImg = this.uploadImg.concat(res.data.content.image_url)
      //   }
      // })
    }
  }
}
</script>
<style>
  .view-img{
    margin: 0;
    padding: 20px 0 0 0;
    max-width: 500px;
  }
  .view-img img{
    display: block;
    width: 100%;
  }
</style>