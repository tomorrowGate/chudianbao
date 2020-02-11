// pages/index/index2.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    server_num:"",
    brief:{
      logo: "",
      brand_name: "",
      brand_content: "",
      address: "",
      identity_str: "",
      identity: 0,
      isbrief: false, //是否要打开简介
      isshopbrief: false,
    },
    /* logo:"",
    brand_name:"",
    brand_content:"",
    address:"",*/
    identity_str:"",
    identity:0, 
    
    swiper:{
      imgUrls: []
    },
    brand:{
      isBrand:false //是品牌商
    },
    sharesData:{
      myDistribute:0,
      myCustomer:0,
      weekShare:0,
      weekView:0,
      totalShare:0,
      totalView:0
    },
    blankpage:{
      isVistor:false
    }
  },
  getFive(){
    var user_id = wx.getStorageSync('user_id');
    var that = this
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_five',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
      },
      success: function (res) {
        console.log(res);
        if(res.data.done){
          that.setData({
            "sharesData.myDistribute": res.data.retval.num1,
            "sharesData.myCustomer": res.data.retval.num1,
            "sharesData.weekView": res.data.retval.num2,
            "sharesData.weekShare": res.data.retval.num3,
            "sharesData.totalView": res.data.retval.num4,
            "sharesData.totalShare": res.data.retval.num5,
          })
        }
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
  goStatistics(){
    wx.navigateTo({
      url:  '../../hkb/pages/statistics_index',

    }) 
  },
  goMyGoods(){
    wx.navigateTo({
      url: '../../hkb/pages/goods_index',
    }) 
  },
  goMyVillage(){
    wx.navigateTo({
      url: '../../hkb/pages/village_index?',
    }) 
  },
  goBuy(){
    wx.navigateTo({
      url: '/hkb/pages/customized',
    }) 
  },
  goCusSerCenter() {
    wx.navigateTo({
      url: "../cussercenter/cussercenter_index",
    })
  },
  nextDone(){
    wx.showToast({
      title: '正在开发中，敬请期待',
      icon: 'none',
      duration: 1000
    })
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.server_num //仅为示例，并非真实的电话号码
    })
  },
  checkVisitor(){
    var ugrade = wx.getStorageSync('identity');
    //var ugrade = app.globalData.userInfo.identity;
    //ugrade=0;
    var that = this;
    if (ugrade == 0 || ugrade === "") {
      //console.log(ugrade + "--------------");
      that.setData({
        blankpage: { isVistor: true }
      })
    }else{
      this.checkBrander(ugrade)
      that.setData({
        blankpage: { isVistor: false }
      })
    }
  },
  goAuthentication(){
    wx.navigateTo({
      url: '../../hkb/pages/authentication_index',
    }) 
  },
  goStore(){
    wx.switchTab({
      url: './store_index',
    }) 
  },
  get_hkb_info:function(){
    //获取品牌商和经销商的信息
    var user_id=wx.getStorageSync('user_id');
    var identity = wx.getStorageSync('identity');
    var identity_str = wx.getStorageSync('identity_str');
    //console.log(user_id);

    var that = this;
    /* if(identity==2){
      that.setData({
        'brand.is_brand':true
      })
    } */
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_hkb_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        identity:identity,
      },
      success: function (res) {
        //console.log(res,'获客宝info');
        wx.setStorageSync('brand_id', res.data.retval.brand_id);
        
        that.setData({
          "brief.logo": app.globalData.url + "" + res.data.retval.brand_logo,
          "brief.brand_name": res.data.retval.brand_name,
          "brief.brand_content": res.data.retval.brand_introduce,
          "brief.identity_str": identity_str,
          "brief.identity": identity,
          identity_str: identity_str,
          identity: identity
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

  checkBrander(ugrade){
    //如果是品牌总部
    if (ugrade == 2) {
      this.setData({
        brand: { isBrand: true }
      })
    } else if (ugrade == 1){
      this.setData({
        brand: { isBrand: false }
      })
    }
    //console.log(ugrade,this.data.brand.isBrand)
  },

  getHotline(){
    var that = this
    var user_id = wx.getStorageSync("user_id")
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id
      },
      success(res) {
        that.setData({
          server_num: res.data.retval.hotline
        })
      },
      fail(res){

      },
      complete: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.get_lunbo();
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
    this.checkVisitor();
    this.getFive();
    //console.log(app.globalData.server_num);
    /* this.setData({
      server_num: wx.getStorageSync('server_num')
    }) */
    this.getHotline()
    var identity = wx.getStorageSync('identity');
    if(identity>0){
      this.get_hkb_info();
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

  },
  /* get_lunbo: function () {
    //获取轮播图
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=home_lunbo',
      method: 'GET',
      data: {
        'hello': 'world',
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res);
        var imgdata = res.data.retval;
        imgdata.forEach(function (item, i) {
          that.data.imgUrls.push(app.globalData.url + "" + item.file_path)
        })

        that.setData({
          imgUrls: that.data.imgUrls
        })
      },
      fail: function (err) {
        console.log(res);
      }
    })
  } */
})