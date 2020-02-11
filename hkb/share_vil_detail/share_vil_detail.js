// hkb/pages/goods_.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareId: 0,
    housing_name: "",
    housing_id: "",

    identity_str: "",
    identity: 0,
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
    brand: {
      isBrand: true,//是品牌商
      product: []
    },
    //用户信息
    userInfo: {
      imgUrls: '',
      username: '',
      identity_str: '',
      brand_name: '',
      messagetotal: 0,
      mystore: '',
      mystorenum: '',
      isstore: false,
      isbrand: false,
      issimple: false,
      identity_num: 0,
    },
    housing_name: "",
    houseid: 0,
    gallery: {
      showDialog: false
      , imgsrc: ""
      , square: ""
      , text: ""
    },
    identity_str: "",
    region_name: "",
    address: "",
    phone_mob: "",
    wx_id: "",
    real_name2:"",

    share:{
      isShare: true
    },
    shareInfo: {
      identity_str: "",
      brand_name: "",
      region_name: "",
      address: "",
      phone_mob: "",
      wx_id: ""
    }
  },
  addPhoneContact() {
    var mobilePhoneNumber = this.data.phone_mob
    var weChatNumber = this.data.wx_id
    var firstName = this.data.real_name2
    wx.addPhoneContact({
      firstName,
      mobilePhoneNumber,
      weChatNumber,
      success(res) {
        console.log(res, '大帅哥')
      }
    })
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
  get_product: function (user_id, housing_id) {
    //根据小区活动小区户型
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getApartmentByHousing',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        housing_id,
      },
      success: function (res) {
        console.log(res);
        var product_data = res.data.retval;
        product_data.forEach(function (item, i) {
          item.a_img = app.globalData.url + "" + item.a_img;
        })
        that.setData({
          'brand.product': product_data
        });
      },
      fail: function (err) {
        // console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  getUserById: function (user_id) {
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getUserById',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
      },
      success: function (res) {
        console.log(res);
        var data = res.data.retval;
        that.setData({
          'userInfo.username': data.nickname,
          'userInfo.identity_str': data.identity_str,
          'userInfo.imgUrls': data.headimgurl,
          'userInfo.brand_name': data.brand_name,

          "brief.logo": app.globalData.url + "" + data.brand_logo,
          "brief.brand_name": data.brand_name,
          "brief.brand_content": data.brand_introduce,
          "brief.identity_str": data.identity_str,
          "brief.identity": data.im_aliww,

          phone_mob: data.phone_mob,
          real_name2: data.real_name2,
          region_name: data.region_name,
          address: data.address,
          wx_id: data.wx_id,


          'shareInfo.region_name': data.region_name,
          'shareInfo.address': data.address,
          'shareInfo.phone_mob': data.phone_mob,
          'shareInfo.wx_id': data.wx_id,
          'shareInfo.brand_name': data.brand_name,
        })
      },
      fail: function (err) {
        // console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  showGallery(e) {
    this.setData({
      "gallery.showDialog": true
      , "gallery.imgsrc": e.currentTarget.dataset.imgsrc
      , "gallery.square": e.currentTarget.dataset.square
      , "gallery.text": e.currentTarget.dataset.text
      , "gallery.url": e.currentTarget.dataset.url
      , "gallery.p_id": e.currentTarget.dataset.p_id
    })
  },
  goVr() {
    var url = this.data.gallery.url;
    console.log(url, 'url')
    var p_id = this.data.gallery.p_id;

   

    var url = this.data.gallery.url;
    var p_id = this.data.gallery.p_id;

    var a_name = this.data.gallery.text;
    var square = this.data.gallery.square;
    var imgsrc = this.data.gallery.imgsrc;
    var housing_name = this.data.housing_name;
    var houseid = this.data.houseid;


    var shareId = this.data.shareId;
    var sss = "/pages/link/link?p_id=" + p_id + "&user_id=" + shareId + "&a_name=" + a_name + "&square=" + square + "&img=" + imgsrc + "&housing_name=" + housing_name + "&houseid=" + houseid + "&url=" + url;
    wx.navigateTo({
      url: sss
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    

    var share_id = options.shareId//分享者
    var user_id = wx.getStorageSync('user_id')//自己
    var phone_mob = wx.getStorageSync('phone_mob')//自己的手机号
    var housing_id = options.houseid//分享者
    var housing_name = options.housing_name; //分享者
    //获取名片和头部品牌信息
    this.getUserById(share_id);
    //获取户型信息
    this.get_product(share_id, housing_id);
    this.setData({
      housing_name: housing_name,
      houseid: housing_id,
      shareId: share_id
    })
    if (options.share == 'true') {
      console.log("进入了true");
      this.setData({
        "gallery.showDialog": true
        , "gallery.imgsrc": options.imgurl
        , "gallery.square": options.square
        , "gallery.text": options.a_name
        , "gallery.url": options.link
        , "gallery.p_id": options.p_id
      })
      //return;
    }

    app.clickXqdz(user_id, share_id, phone_mob, 1, housing_id)
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
    var shareId = this.data.shareId;
    var housing_name = this.data.housing_name;
    var housing_id = this.data.houseid;
    /* var user_id = this.data.shareId; */
    var brand_id = wx.getStorageSync('brand_id');
    app.add_share_log(shareId, brand_id, 1, housing_id)


    this.setData({
      isDiaShow: true
    })

    return {
      title: "我的小区",
      path: `/hkb/share_vil_detail/share_vil_detail?sharebtn=${true}&shareId=${shareId}&housing_name=${housing_name}&houseid=${housing_id}`,
    }
  },
})