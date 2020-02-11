// hkb/pages/goods_.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo:"",
    brand_name:"",
    brand_content:"",
    address:"",
    identity_str:"",
    identity:0,

    brief: {
      logo: "",
      brand_name: "",
      brand_content: "",
      address: "",
      identity_str: "",
      identity: 0,
      isbrief: false, //是否要打开简介
      isshopbrief: false,
      //要打开简介
      isbrief: false,
      isshopbrief: false,
    },
    brand: {
      isBrand: true ,//是品牌商
      product: []
    },
    //用户信息
    userInfo:{
      imgUrls: '',
      username: '',
      identity_str: '',
      brand_name: '',
      isstore: false,
      isbrand: false,
      issimple: false,
      identity_num:0,
    },
    gallery: {
      showDialog: false
      , imgsrc: ""
      , square: ""
      , text: ""
      ,url:""
      , isBrandShow:true,
    },
    p_id:'',
  },
  gotMoreMsg(e) {
    this.setData({
      'brief.isbrief': !this.data.brief.isbrief
    })
  },
  gotMoreshopMsg(e) {
    this.setData({
      'brief.isshopbrief': !this.data.brief.isshopbrief
    })
  },
  get_hkb_info:function(){
    //获取品牌商和经销商的信息
    var user_id=wx.getStorageSync('user_id');
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
        identity:identity,
      },
      success: function (res) {
        console.log(res);
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
      ,complete: function (res) {
        //console.log(res);
      }
    })
  },
  addPhoneContact() {
    var mobilePhoneNumber = wx.getStorageSync("phone_mob")
    var weChatNumber = wx.getStorageSync("wx_id")
    var firstName = wx.getStorageSync("real_name2")
    wx.addPhoneContact({
      firstName,
      mobilePhoneNumber,
      weChatNumber,
      success(res) {
        console.log(res, '大帅哥')
      }
    })
  },

  get_product: function (p_id) {
    //更具品牌分类获取产品
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_product',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        p_id:p_id
      },
      success: function (res) {
        console.log(res,'product');
        var product_data = res.data.retval;
        product_data.forEach(function(item,i){
          item.default_image = app.globalData.url+""+item.default_image;
        })
        that.setData({
          'brand.product': product_data
        });
      },
      fail: function (err) {
        console.log(err);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  showGallery(e) {
    //console.log(e.currentTarget.dataset.imgsrc)
    this.setData({
      "gallery.showDialog": true
      , "gallery.imgsrc": e.currentTarget.dataset.imgsrc
      , "gallery.p_id": e.currentTarget.dataset.p_id
      , "gallery.url": e.currentTarget.dataset.url
      , "gallery.product_id": e.currentTarget.product_id
      ,"gallery.isBrandShow":true
    })
  },
  goVr(){
    var url = this.data.gallery.url;
    console.log(url, 'url')
    var p_id = this.data.gallery.p_id;
    var my_user_id = wx.getStorageSync('user_id');
    var imgsrc = this.data.gallery.imgsrc;
    var product_id = this.data.gallery.product_id;

    var sss = "/pages/link/link?p_id=" + p_id + "&user_id=" + my_user_id + "&img=" + imgsrc + "&product_id=" + product_id + "&url=" + url;
    wx.navigateTo({
      url: sss
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'goods_detail');
    var p_id=options.p_id;
    if(p_id){
      this.get_product(p_id);
    }
    //加载微信信息
    this.setData({
      'userInfo.username':wx.getStorageSync('nickname'),
      'userInfo.identity_str': wx.getStorageSync('identity_str'),
      'userInfo.brand_name': wx.getStorageSync('brand_name'),
      'userInfo.imgUrls': wx.getStorageSync('headimgurl'),

      p_id,
    })
    /* app.globalData.tset=1;
    console.log(app.globalData.tset); */
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log(options);
    this.get_hkb_info();
    
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
    var shareId = wx.getStorageSync("user_id");
    var p_id = this.data.p_id;
    var brand_id = wx.getStorageSync('brand_id');
    app.add_share_log(shareId, brand_id, 2);

    return {
      title: "我的商品详情",
      path: `/hkb/share_good_detail/share_good_detail?sharebtn=${true}&shareId=${shareId}&p_id=${p_id}`,
    }
  }
})