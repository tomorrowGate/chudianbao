// pica/pages/index4.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: '',
    isstore: false,
    isbrand: false,
    issimple: false,
    identity_num:0,
  },
  contactCustomer:function(event){
    wx.navigateTo({
      url: '../../pica/pages/pica_service/pica_service',
    })
  },
  goIntoInfo:function(){
    wx.navigateTo({
      url: '../../pica/pages/pica_personInfo/pica_personInfo',
    })
  },
  goFeedback:function(){
    wx.navigateTo({
      url: '../../pica/pages/pica_feedback/pica_feedback',
    })
  },
  goSeting:function(){
    wx.navigateTo({
      url: '../../pica/pages/pica_setting/pica_setting',
    })
  },
  goMessage:function(){
    wx.navigateTo({
      url: '../../pica/pages/pica_message/pica_message',
    })
  },
  goMyCard:function(){
    wx.navigateTo({
      url: '../../pica/pages/pica_card/pica_card',
    })
  },
  goMyOrders:function(event){
      //console.log(event.currentTarget);
      var state = event.currentTarget.dataset.orderState;
      console.log(state);
      wx.navigateTo({
        url: '../../pica/pages/pica_orderstate/pica_orderstate?state='+state,
      })
  },
  goHelp(){
    wx.showToast({
      title: '敬请期待',
      icon:"none"
    })
  },
  removeBage(){
    wx.removeTabBarBadge({
      index: 3,
    })
  },
  get_identity(){
    var identity_str = "";
    var identity_num=0;
    var identity = wx.getStorageSync('identity');
    var nickname = wx.getStorageSync('nickname');
    var headimgurl = wx.getStorageSync('headimgurl');
    switch (parseInt(identity)) {
      case 1:
        identity_str = "经销商";
        identity_num=1;
        break;
      case 2:
        identity_str = "品牌总部";
        identity_num = 2;
        break;
      case 3:
        identity_str = "职员";
        identity_num = 3;
        break;
      default:
        identity_str = "游客";
        identity_num=0;
        break;
    }

    this.setData({
      imgUrls: headimgurl,
      username: nickname,
      brandname: identity_str,
      identity_num:identity_num
    })
  },
  get_message(){
    //获得未读信息条数
    var that = this;
    //app.get_message_count是异步函数
    app.get_message_count()
    .then(res=>{
      console.log(res)
      var count = wx.getStorageSync("msgcount");
      that.setData({
        messagetotal: count
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  get_my_brand:function(){
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_my_brand',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id
      },
      success: function (res) {
        //console.log(res);
        wx.setStorageSync('brand_name', res.data.retval);
        that.setData({
          brandorigin:res.data.retval
        })
        
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.get_identity();
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
    this.get_message()
    this.get_identity();
    var brand_name=wx.getStorageSync('brand_name');
    //console.log(brand_name);
    if(brand_name){
      this.setData({
        brandorigin: brand_name
      })
    }else{
      this.get_my_brand()
    }
    
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