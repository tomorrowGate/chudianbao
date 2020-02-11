// pica/pages/pica_feedback/pica_feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    images_array:[],//传给后台的图片
    number:"",//联系方式
    content:"",//意见内容
    canClick:true
  },
  chooseImg(e){
    console.log(this.data.images.length );
    if (this.data.images.length > 2) {
      wx.showToast({
        title: '最多上传三张图',
        icon:'none'
      })
      return;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        console.log(res)
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          images
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    let images = this.data.images
    images.splice(idx, 1)
    this.setData({
      images
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  uploadPic(i) {
    var that = this;
    wx.showLoading({
      title: '正在上传第' + i + '张',
    })
    wx.uploadFile({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=upimg',
      filePath: that.data.images[i],  //文件路径 
      name: 'file',  //随意
      header: {
        'Content-Type': 'multipart/form-data',
        /* 'Authorization': wx.getStorageSync("access_token"),  //如果需要token的话要传 */
      },
      formData: {
        method: 'POST'   //请求方式
      },
      success(res) {
        console.log(res)
        console.log(i)
        var data =  JSON.parse(res.data);
        that.data.images_array.push(data.tolink);//将上传后的图片路径存数组
        if(res.statusCode==200){
          i++
          if (i == that.data.images.length) {
            //上传完毕，作一下提示
            console.log('上传成功');
            console.log(res);
           /*  wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 2000
            }) */
            
            //上传成功后存数据库
            that.tj();
          } else {
            //递归调用，上传下一张
            that.uploadPic(i);
            console.log('正在上传第' + i + '张');
          }
        }else{
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'success',
          //   duration: 2000
          // })
        } 
      }
      ,fail(res){
        //failUp++;//失败+1
        console.log(res)
      }
      , complete(res){
        
        /* var data = JSON.parse(res.data)  // 坑2：与wx.request不同的是，upload返回的是字符串格式，需要字符串对象化
        if (data.code == 200) {
          that.fileTrans(data.data.id); //执行接口函数 语音文件转文字
        } else {
          console.log('上传失败')
          wx.showToast({
            title: res.message,
            icon: 'none'
          })
        } */
      }
    })
  },
  submitForm(e){
    if (this.data.images.length<=0) {
      this.tj()
    } else {
      this.uploadPic(0);//上传文件
    }
  },
  tj() {
    var that=this
    var user_id=wx.getStorageSync('user_id')
    var img_list = that.data.images_array
    var content = that.data.content
    var number = that.data.number

    if(!content){
      wx.showToast({
        title: '问题意见不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: "正在提交",
      mask: true,
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=add_opinions',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        img_list,
        content,
        number
      },
      success: function (res) {
        if (res.data.done) {
          console.log(res);
          that.data.images_array=[];
          //成功后两秒返回上一张页面，提交在返回之前提交按钮无效
          wx.hideLoading()
          wx.showToast({
            title: res.data.retval,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            canClick:false
          })
          let timer = setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (err) {

      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  set_value:function(e){
    //取值
     switch (e.target.dataset.str){
       case "content":
        this.data.content=e.detail.value
        break;
      case "number":
        this.data.number=e.detail.value
        break;
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})