// pages/index/myinfo.js
var app=getApp();
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    imgUrls:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    username:'皮卡丘',
    brandname:'品牌经销商',
    brandorigin:'上派集成社',
    messagetotal:'2',
    mystore:'我的经销商',
    mystorenum:'65',
    weekshare:'155',
    weeklook:'155',
    totalshare:'155',
    totallook:'155',
    isstore:true,
    isbrand:true,
    result:'',//存储后台传到前台的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var ugrade = wx.getStorageSync("user_id");
    //  console.log(ugrade);
    // if(ugrade==0){
    //   this.setData({
    //     isbrand:false,
    //     mystore:'累计客户',

    //   })
    // }
   /*  wx.request({
      url: '',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        this.setData({
          result: res.data,
          imgUrls: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
          username: '皮卡丘',
          brandname: '品牌经销商',
          brandorigin: '上派集成社',
          messagetotal: '2',
          mystore: '我的经销商',
          mystorenum: '65',
          weekshare: '155',
          weeklook: '155',
          totalshare: '155',
          totallook: '155',
        })
        
      },
      fail: function(res) {},
      complete: function(res) {},
    }) */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var user_id=wx.getStorageSync('user_id')
    // console.log(user_id)
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