// pages/cussercenter/cussercenter.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: []
  },
  goDetail: function (event) {
    var a_id = event.currentTarget.dataset.a_id;
    console.log(a_id);
    wx.navigateTo({
      url: '../article/article_index?a_id=' + a_id+'&title=客服中心',
    })
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
    this.get_service_article();
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

  },
  get_service_article: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_service_article',
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      data: {
      },
      success: function (res) {
        console.log(res);
        var article_data = res.data.retval;
        var articles = [];
        article_data.forEach(function (item, i) {
          articles.push(item);
        });
        that.setData({
          articles: articles
        });
      },
      fail: function (err) {
        console.log(err);
      }
      ,
      complete: function (res) {
        console.log(res);

      }
    })
  }
})