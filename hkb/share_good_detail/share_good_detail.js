// hkb/pages/goods_.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: "",
    brand_name: "",
    brand_content: "",
    address: "",
    identity_str: "",
    identity: 0,
    real_name2:'',

    isDiaShow:false,

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
      isBrand: true,//是品牌商
      product: []
    },
    //用户信息
    userInfo: {
      imgUrls: '',
      username: '',
      identity_str: '',
      brand_name: '',
      isstore: false,
      isbrand: false,
      issimple: false,
      identity_num: 0,
    },
    gallery: {
      showDialog: false
    },
    //分享的
    shareId:0,
    share: {
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
  showGallery(e) {
    this.setData({
      "gallery.showDialog": true
      , "gallery.imgsrc": e.currentTarget.dataset.imgsrc
      , "gallery.p_id": e.currentTarget.dataset.p_id
      , "gallery.url": e.currentTarget.dataset.url
      , "gallery.product_id": e.currentTarget.product_id
      , "gallery.isBrandShow": true
    })
  },
  goVr() {
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
  get_product: function (share_id,p_id) {
    //更具品牌分类获取产品
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_product',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        p_id: p_id
      },
      success: function (res) {
        //console.log(res);
        var product_data = res.data.retval;
        product_data.forEach(function (item, i) {
          item.default_image = app.globalData.url + "" + item.default_image;
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
  getUserById(user_id){
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
        //console.log(res);
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
          region_name: data.region_name,
          address: data.address,
          wx_id: data.wx_id,
          real_name2:data.real_name2,


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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var share_id = options.shareId//分享者
    console.log(share_id,'shareid')
    //var share_id = 372
    var p_id = options.p_id;
    //var p_id = '1617';
    this.get_product(share_id, p_id);

    var user_id = wx.getStorageSync('user_id')//自己
    var phone_mob = wx.getStorageSync('phone_mob')//自己的手机号
    //获取名片和头部品牌信息
    this.getUserById(share_id);
    //获取户型信息
    
    this.setData({
      p_id: p_id,
      shareId: share_id
    })

    if (options.share == 'true') {
      console.log("进入了物品的true");
      this.setData({
        "gallery.showDialog": true
        , "gallery.imgsrc": options.imgurl
        , "gallery.url": options.link
        , "gallery.p_id": options.p_id
        , "gallery.product_id": options.product_id
        , "gallery.isBrandShow": true
      })
      //return;
    }
    app.clickXqdz(user_id, share_id, phone_mob,0,0)
 
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
    var user_id = wx.getStorageSync('user_id')//自己
    var p_id = this.data.p_id;
    var brand_id = wx.getStorageSync("brand_id")
    app.add_share_log(user_id, brand_id, 2)
    
    this.setData({
      isDiaShow:true
    })
    console.log(this.data.isDiaShow,'hope')
    return {
      title: "我的产品详情",
      path: `/hkb/share_good_detail/share_good_detail?sharebtn=${true}&shareId=${shareId}&p_id=${p_id}`,
    }
  },
})