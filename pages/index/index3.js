// pages/index/index3.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    circular:true,

    /* 品牌，经销商，产品 的数据 */
    brand:[]
  },

  brand(){
    wx.showToast({
      title: '正在开发中，敬请期待',
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var ugrade = app.globalData.ugrade;
    // if (ugrade == 0) {
    //   wx.navigateTo({
    //     url: '../confirm/confirm',
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //为品牌组件添加5条数据
    for( let i = 0;i < 5;i++){
      let data = {
        dataText:"喜报！上派迎来全国第43加经销商入驻"
        ,dataTime:"6月24日"
        ,dataRead:34
        ,dataIfImg:true
        ,dataImgUrl:"/src/image/bg_case.png"
      }
      this.data.brand.push(data)
      this.setData({
        brand:this.data.brand
      })
    }
    console.log(this.data.brand);
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