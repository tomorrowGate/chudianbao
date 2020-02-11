// pages/index/index1.js
var app = getApp();
var util = require('./../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperVerticle:{
      datas:[],
      vertical:true,
      site_description:"",
      hotline:"",

    },
    case:[],

    imgUrls: [],
    imgdata:[],

    indicatorDots: true,
    indicatorColor:"#dedede",
    indicatorActiveColor: "#1f9cfd",
    autoplay: true,
    interval: 4000,
    duration: 1000,
    circular:true,
  },
  get_lunbo: function () {
    //获取轮播图
    var that=this;
    console.log(this.data.imgUrls)
    wx.request({
      url: app.globalData.url+'index.php?app=cdb_homepage&act=home_lunbo',
      method: 'GET',
      data: {
        'hello': 'world',
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res,'swiper')
        var imgdata=res.data.retval;
        imgdata.forEach(function(item,i){
          that.data.imgUrls.push(app.globalData.url + ""+item.file_path)
          item.file_path = app.globalData.url + "" + item.file_path
        })
        
        that.setData({
          imgUrls:that.data.imgUrls,
          imgdata,
        })

      },
      fail: function (err) {
        //console.log(res);
      }
    })
  },
  goVr(e){
    console.log(e.currentTarget.dataset, wx.getStorageSync("user_id"))
    if (e.currentTarget.dataset.usewhat=="0"){//跳链接
      if (!e.currentTarget.dataset.url){
        return
      }
      wx.navigateTo({
        url: `/pages/link/link?user_id=${wx.getStorageSync("user_id")}&prePath=swiper&url=${e.currentTarget.dataset.url}`,
      })
    }else{//跳文章
      wx.navigateTo({
        url: "/pages/article/article_index?a_id=" + e.currentTarget.dataset.article_id +"&title=文章列表",
      })
    }
  },
  get_hot_message:function(){
    //获取热点公告
    var that=this;
    var messages = [];
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=hot_message',
      method: 'GET',
      data: {
        'hello': 'world',
      },
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res,'hot');
        var messagedata = res.data.retval;
        // messagedata.forEach(function (item, i) {
        //   var message = [];
        //   message.push(item.title);
        //   message.push(item.article_id);
        //   messages.push(message);
        // })

        
        that.setData({
          'swiperVerticle.datas': messagedata
        })
        console.log(that.data.swiperVerticle.datas);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /* 热点公告跳转 */

  goHotPage(event){
    console.log(event);
    var mid = event.currentTarget.dataset.article_id;
   wx.navigateTo({
      url: "../article/article_index?a_id="+mid+"&title=热点公告",
    })
  },
  goHotPagePtjj(event){
    var mid = event.currentTarget.dataset.article_id;

    wx.navigateTo({
      url: "../article/article_index?a_id=" + mid + "&title=平台简介",
    })
  },

  /* 客服中心跳转 */
  goCusSerCenter(){
    wx.navigateTo({
      url: "../cussercenter/cussercenter_index",
    })
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.swiperVerticle.hotline 
    })
  },
  goBrandUni(){
    wx.navigateTo({
      url: "/pages/article/article_index?type=ppdx&name=品牌大学",//ppdx=品牌大学
    })
  },
  goDistributor(){
    wx.navigateTo({
      url: "/pages/article/article_index?type=jxsxt&name=经销商学堂"  ,//jxsxt=经销商学堂
    })
  },
  get_sjal(){
    //获取实景案例
    var that = this;
    var sjal = [];
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_sjal',
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      data: {
        'hello': 'world',
      },
      success: function (res) {
        //console.log(res);
        if (res.data.done) {
          var sjal_data = res.data.retval.result;
          sjal_data.forEach(function (item, i) {
            var test_sjal = {};
            if (!item.img) {
              test_sjal.url = item.url;
              test_sjal.img = '/src/image/bg_case.png';
            }
            sjal.push(test_sjal);
          })
          var img = app.globalData.url + res.data.retval.ptjj_img
          var reg = /<img(.*?)src=\"(.*?)\"(.*?)>/ig
          var con = res.data.retval.site_description.replace(reg,"")
          that.setData({
            case: sjal,
            'swiperVerticle.site_description': con,
            'swiperVerticle.hotline': res.data.retval.hotline,
            'swiperVerticle.ptjj_id': res.data.retval.ptjj_id,
            'swiperVerticle.ptjj_img': img
          })
        } else {

        }
       
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /* 实景案例跳转 */
  invitation: function(event) {
    //console.log(event);
    var url=event.currentTarget.dataset.gid;
    console.log(url);
    var url ="https://pano6.p.kujiale.com/design/3FO4HC3VJC88/show?kpm=Nnw.63c8d0d789f03c8a.7ff5ec0.1563427549230"
    var tz_cs = "/pages/link/link?url=" + url;
    //console.log(tz_cs);
    wx.navigateTo({
      url: tz_cs, 
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_hot_message();
    this.get_sjal();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.data.imgUrls.length = 0;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.get_message_count();
    this.get_lunbo();
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