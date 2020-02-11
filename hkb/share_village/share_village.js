// hkb/pages/village_index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shareId:0,
    /* isMaskHide:false, */
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
    identity_str: "",
    identity: 0,

    swiper: {
      imgUrls: []
    },
    village: { //小区 数据
      isBrand: true,
      pcategory: [],
      length: 0
    },
    gallery: {}
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
  get_pcategory: function (user_id) {
    //获取对应的小区分类
    var that = this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getHousingByUserid',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
      },
      success: function (res) {
        console.log(res);
        var pcategory_data = res.data.retval;//订单对象
        pcategory_data.forEach((value, index) => {
          value.housing_img = app.globalData.url + value.housing_img
        })
        that.setData({
          'village.pcategory': pcategory_data,
        });
      },
      fail: function (err) {
        //console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  goGoodDet(e) {
    //console.log(e)
    wx.navigateTo({
      url: `/hkb/share_vil_detail/share_vil_detail?houseid=${e.currentTarget.dataset.houseid}&imgsrc=${e.currentTarget.dataset.imgsrc}&shareId=${this.data.shareId}&housing_name=${e.currentTarget.dataset.housing_name}`
    })
  },
  goVr() {
    wx.navigateTo({
      url: "/pages/link/link?url=" + "https://yun.kujiale.com/design/3FO4HC3VJC88/show?kpm=Nnw.63c8d0d789f03c8a.7ff5ec0.1563427549230"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var shareId = options.user_id//分享者
    var user_id = wx.getStorageSync('user_id')//自己
    var phone_mob=wx.getStorageSync('phone_mob')//自己的手机号
    this.setData({
      shareId,
    })
    this.get_pcategory(shareId);
    this.getUserById(shareId);
    app.clickXqdz(user_id, shareId, phone_mob,1)
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
    app.add_share_log(user_id, brand_id, 1, 0)
    this.setData({
      isDiaShow: true
    })
    return {
      title: "我的小区",
      path: `/hkb/share_village/share_village?sharebtn=${true}&user_id=${user_id}`,
    }
  },
 
})