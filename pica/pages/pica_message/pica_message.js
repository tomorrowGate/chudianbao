// pica/pages/pica_message/pica_message.js
var app = getApp();
var arr=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg_count:0,
    msg_count_gf:0,
    msg_count_dz: 0,
    msg_count_kh: 0,
    message_all:0,
    message:[],
    concent_id:"",
    m_type:0
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  get_message_count:function(){
    //获取信息条数
    var that=this;
    var user_id=wx.getStorageSync('user_id');
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_massage_cont',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
      },
      success: function (res) {
        //console.log(res);
        //console.log(res.data.retval.msg_count);
        //console.log(res.data.retval.message_all);
        var message_all=res.data.retval.message_all;
        var message=[];
        message_all.forEach(function(item,i){
          var tt = app.formatDateTime(item.add_time,1);
          //console.log(tt);
          var ttt = that.dateLater(tt,0);
          //console.log(ttt);
          item.add_time=ttt.week;
          message.push(item);
        })
        that.setData({
          msg_count:res.data.retval.msg_count,
          msg_count_gf: res.data.retval.msg_count_gf,
          message:message
        })
        

      },
      fail: function (err) {
        //console.log(err);
      }
      ,
      complete: function (res) {
        //console.log(res);

      }
    })
  },  
  to_message:function (options){
    console.log(options);
    console.log(options.currentTarget.dataset.mid);
    var m_id = options.currentTarget.dataset.mid;
    wx.navigateTo({
      url: '/pages/hotpage/hotpage_index?mid='+m_id,
    })
  },
  get_message_count:function(options){
    console.log(1111111, options)
    //获取信息条数
    var m_type=0;
    if(typeof options == 'number'){
      m_type=options;
    }else{
      m_type = options.currentTarget.dataset.m_cate;
    }
    var that=this;
    var user_id=wx.getStorageSync('user_id');
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_massage_cont',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        m_cate: m_type
      },
      
      success: function (res) {
        //console.log(res);
        //console.log(res.data.retval.msg_count);
        //console.log(res.data.retval.message_all);
        var message_all=res.data.retval.message_all;
        var message=[];
        message_all.forEach(function(item,i){
          var tt = app.formatDateTime(item.add_time,1);
          console.log(tt);
          var ttt = app.dateLater(tt,0);
          //console.log(ttt);
          item.add_time=ttt.week;
          message.push(item);
        })
        that.setData({
          msg_count:res.data.retval.msg_count,
          msg_count_gf: res.data.retval.msg_count_gf,
          msg_count_dz: res.data.retval.msg_count_dz,
          msg_count_kh: res.data.retval.msg_count_kh,
          message:message,
          m_type: m_type,
        })
        

      },
      fail: function (err) {
        //console.log(err);
      }
      ,
      complete: function (res) {
        console.log(res);

      }
    })
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
    this.get_message_count(parseInt(this.data.m_type));
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
  dateLater:function(dates, later) {
    let dateObj = {};
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    let yearDate = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
    let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    dateObj.time = yearDate + '-' + month + '-' + dayFormate;
    dateObj.week = show_day[day];
    return dateObj;
  },
  formatDateTime: function (timeStamp) {
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
    return y+"-"+ m + "-" + d ;
  }
})