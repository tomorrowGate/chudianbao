// pica/pages/pica_personInfo/pica_personInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:"",
    username: "",
    brandname: "",
    brandorigin: "",
    messagetotal: "",
    mystore: "",
    address: "",
  },

  getUserById: function (user_id) {
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getUserById',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
      },
      success: function (res) {
        console.log(res);
        var data = res.data.retval;
        var address = data.address
        if (data.address =="undefined"){
          address = "未绑定"
        }
        that.setData({
          imgUrls: data.headimgurl,
          username: data.nickname,
          brandname: data.identity_str,
          brandorigin: data.brand_name,
          address,

        })
      },
      fail: function (err) {
        // console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserById(wx.getStorageSync("user_id"))
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