// hkb/pages/goods_.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    housing_name:"",
    housing_id:"",
    houseid:0,
    gallery:{
      showDialog: false
      ,imgsrc: ""
      , square:""
      , text:""
    },
    identity_str: "",
    region_name: wx.getStorageSync('region_name'),
    address: wx.getStorageSync('address'),
    phone_mob: wx.getStorageSync('phone_mob'),
    wx_id: "",
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
       // wx.setStorageSync('brand_id', res.data.retval.brand_id);
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
      , complete: function (res) {
        //console.log(res);
      }
    })
  },
  addPhoneContact(){
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
 
  get_product: function (housing_id) {
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
  showGallery(e) {
    //console.log(e.currentTarget.dataset.imgsrc)
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
    console.log(url,'url')
    var p_id = this.data.gallery.p_id;
    var my_user_id =wx.getStorageSync('user_id');

    var a_name = this.data.gallery.text;
    var square = this.data.gallery.square;
    var imgsrc = this.data.gallery.imgsrc;
    var housing_name = this.data.housing_name;
    var houseid = this.data.houseid;


    var sss = "/pages/link/link?p_id=" + p_id + "&user_id=" + my_user_id + "&a_name=" + a_name + "&square=" + square + "&img=" + imgsrc + "&housing_name=" + housing_name + "&houseid=" + houseid +"&url=" + url  ;
    wx.navigateTo({
      url: sss
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    //如果是正常的点进来的
    var houseid = options.houseid;
      this.get_product(houseid);
      this.setData({
        housing_name: options.housing_name,
        houseid: options.houseid
      })

    //加载微信信息
    this.setData({
      'userInfo.username': wx.getStorageSync('nickname'),
      'userInfo.identity_str': wx.getStorageSync('identity_str'),
      'userInfo.brand_name': wx.getStorageSync('brand_name'),
      'userInfo.imgUrls': wx.getStorageSync('headimgurl'),
    })
    this.get_hkb_info();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log(options);
    
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
    var housing_name = this.data.housing_name;
    var housing_id = this.data.houseid;
    var brand_id = wx.getStorageSync('brand_id');
    app.add_share_log(shareId, brand_id, 1, housing_id);

    return {
      title: "我的小区",
      path: `/hkb/share_vil_detail/share_vil_detail?sharebtn=${true}&shareId=${shareId}&housing_name=${housing_name}&houseid=${housing_id}`,
    }
  },
  
})