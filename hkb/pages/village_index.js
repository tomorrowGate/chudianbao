// hkb/pages/village_index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      length:0
    },
    gallery:{}
  },
  get_hkb_info: function (shareUserId) {
    
    //获取品牌商和经销商的信息
    var user_id = (shareUserId ? shareUserId:wx.getStorageSync('user_id'));
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
        console.log(res, 'hkbibfo');
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
      , complete: function (res) {
        //console.log(res);
      }
    })
  },
  get_pcategory: function (shareUserId) {
    //获取对应的小区分类
    var user_id = (shareUserId ? shareUserId : wx.getStorageSync('user_id'));
    var brand_id = wx.getStorageSync('brand_id');
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
        console.log(res,'villages');
        if (res.data.retval){
          var pcategory_data = res.data.retval;//订单对象
          pcategory_data.forEach((value, index) => {
            value.housing_img = app.globalData.url + value.housing_img
          })
          that.setData({
            'village.pcategory': pcategory_data,
          });
        }
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
      url: `/hkb/pages/village_detailed?houseid=${e.currentTarget.dataset.houseid}&imgsrc=${e.currentTarget.dataset.imgsrc}&housing_name=${e.currentTarget.dataset.housing_name}`
    })
  },
  goVr() {
    wx.navigateTo({
      url: "/pages/link/link?url=" +"https://yun.kujiale.com/design/3FO4HC3VJC88/show?kpm=Nnw.63c8d0d789f03c8a.7ff5ec0.1563427549230"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,6666)
    if (options.user_id){
      //如果是分享进来的页面
      wx.setStorageSync("user_id", options.user_id)
     /*  this.get_hkb_info(options.user_id);
      this.get_pcategory(options.user_id); */
    }
    this.get_hkb_info();
    this.get_pcategory();
    
    
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
    var user_id = wx.getStorageSync('user_id');
    var brand_id = wx.getStorageSync('brand_id');
    app.add_share_log(user_id, brand_id, 1,0)

    return {
      title: "我的小区",
      path: `/hkb/share_village/share_village?sharebtn=${true}&user_id=${user_id}`,
    }
  },
  
})