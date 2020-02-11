// pica/pages/pica_service/pica_serviceDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index:'0',
      title: "",
      time: "",
      content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---");
    let a_id = JSON.parse(options.a_id);
    console.log("---" + a_id);
    this.get_article(a_id);
  },
  get_article:function (a_id){
    var that=this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_article_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        a_id: a_id
      },
      success: function (res) {
        console.log(res);
        that.setData({
          title:res.data.retval.title,
          time: app.formatDateTime(res.data.retval.add_time,0),
          content:res.data.retval.content
        });
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }
,
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