// pages/index/index1.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperVerticle:{
      datas:"传播正能量纸质，收获高品质生活"
      , vertical:true
    },
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    indicatorColor:"#dedede",
    indicatorActiveColor: "#1f9cfd",
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular:true
  },

  get_lunbo: function () {
    console.log(1111111111);
    wx.request({
      url: 'https://www.captain2016.cn/index.php?app=cdb_homepage',
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      data: {
        'hello': 'world',
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (err) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_lunbo()
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