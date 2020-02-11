// pages/hotpage/hotpage_index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    time:"",
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'hotpage');
    var mid=options.mid;
    var that=this;
    that.set_is_read(mid);

    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=hot_messagebyid',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        mid:mid,
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.retval.title);
        var add_time = app.formatDateTime(res.data.retval.add_time,0);
        console.log(add_time);
        
        that.setData({
          title: res.data.retval.title,
          time: add_time,
          content: res.data.retval.content,
        })
        
      },
      fail: function (err) {
        console.log(err);
      }
      ,
      complete:function(res){
        console.log(res);

      }
    })
  },
  set_is_read: function (m_id) {
    //消除已读属性
    var that = this;
    
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=Browse',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        m_id: m_id,
      },
      success: function (res) {
        console.log(res);
        
      },
      fail: function (err) {
        console.log(err);
      }
      ,
      complete: function (res) {
        console.log(res);
      }
    })
  },
  test:function (){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formatDateTime: function (timeStamp){
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      //return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      return y + "年" + m + "月" + d+"日";
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