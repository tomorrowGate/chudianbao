// hkb/pages/goods_brand.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareId: 0,
    brand_id:0,
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
    share: {
      isShare: true
    },
    identity_str: "",
    identity: 0,
    swiper: {
      imgUrls: []
    },
    brand: {
      isBrand: true, //是品牌商
      pcategory: []
    },
  },
  checkBrand() {
    let identity = wx.getStorageSync('identity')
    if (identity == 2) {//如果是品牌商
      wx.setNavigationBarTitle({
        title: '产品系列',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '我的产品',
      })
    }
  },
  gotMoreMsg(e) {
    this.setData({
      'brief.isbrief': !this.data.brief.isbrief
    })
  },
  goGoodDet(options) {
    console.log(options);
    var shareId = this.data.shareId
    var p_id = options.currentTarget.dataset.p_id;
    wx.navigateTo({
      url: `/hkb/share_good_detail/share_good_detail?p_id=${p_id}&shareId=${shareId}`,
    })
  },
  get_pcategory: function (user_id, brand_id) {
    //获取对应的品牌分类
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_pcategory',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        brand_id: brand_id
      },
      success: function (res) {
        console.log(res);
        var pcategory_data = res.data.retval;
        that.setData({
          'brand.pcategory': pcategory_data
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

          "brief.logo": app.globalData.url + "" + data.brand_logo,
          "brief.brand_name": data.brand_name,
          "brief.brand_content": data.brand_introduce,
          "brief.identity_str": data.identity_str,
          "brief.identity": data.im_aliww,

          phone_mob: data.phone_mob,
          region_name: data.region_name,
          address: data.address,
          wx_id: data.wx_id
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
    var shareId = options.shareId//分享者
    //var shareId = 372//分享者
    var share_brandid = options.share_brandid//分享者的brandid
    //var share_brandid = 101
    var user_id = wx.getStorageSync('user_id')//自己
    var phone_mob = wx.getStorageSync('phone_mob')//自己的手机号
    this.setData({
      shareId,
      share_brandid,

    })
    this.getUserById(shareId);
    this.get_pcategory(shareId, share_brandid);
    app.clickXqdz(user_id, shareId, phone_mob,0,0)

    this.checkBrand()
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
    var user_id = this.data.shareId;
    var brand_id = wx.getStorageSync("brand_id")
    var share_brandid = this.data.share_brandid;
    app.add_share_log(user_id, brand_id, 2)

    this.setData({
      isDiaShow: true
    })

    return {
      title: "我的产品",
      path: `/hkb/share_good/share_good?sharebtn=${true}&user_id=${user_id}&share_brandid=${share_brandid}`,
    }
  },
 
})