// pages/index/index3.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* logo: "",
    brand_name: "",
    brand_content: "",
    address: "", */
    identity_str: "",
    identity: 0,
    imgUrls: [
    ],
    
    /* 简介数据 */
    brief: {
      logo: "",
      brand_name: "",
      brand_content: "",
      address: "",
      identity_str: "",
      identity: 0,
      isbrief: false, //是否要打开简介
      isshopbrief: false,
    },
    swiper:{
      imgUrls: []
    },
    /*品牌热点数据*/
    brand_hot:[],
    /*文章数据*/
    articles:[],
    /* 品牌，经销商，产品 的数据 */
    brand: [],
    isActive: 1,
    blankpage: {
      isVistor: false
    },
  },

  brand(e){
    wx.showToast({
      title: '正在开发中，敬请期待',
      icon: 'none',
      duration: 2000
    })
  },

  checkVisitor() {
    var ugrade = wx.getStorageSync('identity');
    //var ugrade = app.globalData.userInfo.identity;
    //console.log(ugrade);
    //ugrade=0;
    var that = this;
    if (ugrade == 0 || ugrade == "") {
      that.setData({
        blankpage: { isVistor: true }
      })
    } else {
      that.setData({
        blankpage: { isVistor: false }
      })
    }
  },
  goAuthentication() {
    wx.navigateTo({
      url: '../../hkb/pages/authentication_index',
    })
  },
  add_visits(article_id){
    var user_id = wx.getStorageSync("user_id")
    wx.request({
      url: app.globalData.url + 'index.php?app=share&act=add_visits',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        article_id,
      },
      success: function (res) {
       
      },
      fail: function (err) {
        //console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  goDetail: function (event) {
    var a_id = event.currentTarget.dataset.a_id;
    console.log(a_id);
    wx.navigateTo({
      url: '/pica/pages/pica_service/pica_serviceDetail?a_id=' + a_id,
    })
  },
  goStore() {
    wx.switchTab({
      url: './store_index',
    })
  },
  get_hkb_info: function () {
    //获取品牌商和经销商的信息
    var user_id = wx.getStorageSync('user_id');
    var identity = wx.getStorageSync('identity');
    var identity_str = wx.getStorageSync('identity_str');
    //console.log(identity_str);

    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_hkb_info',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        identity: identity,
      },
      success: function (res) {
        //console.log(res);
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
  get_hot_article:function(){
    var that = this;
    var brand_id=wx.getStorageSync('brand_id');
    if(brand_id){
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_hot_article',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          brand_id:brand_id
        },
        success: function (res) {
          console.log(res);
          var articledata=res.data.retval;
          var articles=[];
          articledata.forEach(function (item, i) {
            var article = [];
            article.push(item.title);
            article.push(item.article_id);
            article.push(item.picture);
            articles.push(article);
          })

          that.setData({
            brand_hot: articles
          })

        },
        fail: function (err) {
          //console.log(err);
        }
        ,complete: function (res) {
          //console.log(res);
        }
      })
    }
  },
  get_article:function(options){
    //根据类型获取文章
    //console.log(options.currentTarget.dataset.type);
    var type = 1;
    if (typeof options == 'number') {
      type = options;
    } else {
      type = options.currentTarget.dataset.type;
      let num = parseInt(type)
      this.setData({
        isActive: num
      })
    }
    var brand_id = wx.getStorageSync('brand_id');
    var that = this;
    if (brand_id) {
      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_article',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          type: type,
          brand_id: brand_id
        },
        success: function (res) {
          console.log(res);
          var articledata = res.data.retval;
          var articles = [];
          articledata.forEach(function (item, i) {
            if (item.picture){
              item.picture = app.globalData.url +item.picture;
            }
            item.add_time = that.formatDateTime(item.add_time);
            articles.push(item);
          })
          //console.log(articles);

          that.setData({
            articles: articles
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
    }
  },
  goHotpage(e){
    var a_id = e.currentTarget.dataset.aid;
    //console.log(e);
    this.add_visits(a_id)
    wx.navigateTo({
      url: '/pages/article/article_index?a_id=' + a_id+"&title=品牌热点",
    })
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: wx.getStorageSync("server_num") //仅为示例，并非真实的电话号码
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
    this.checkVisitor();
    var identity = wx.getStorageSync('identity');
    if (identity > 0) {
      this.get_hkb_info();
      this.get_hot_article();
      this.get_article(this.data.isActive);
    }
    app.get_message_count();
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
    return m + "月" + d + "日";
  },
 
})