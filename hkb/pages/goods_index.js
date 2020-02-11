// hkb/pages/goods_brand.js
const app = getApp()

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
    
    identity_str:"",
    identity:0,
    swiper:{
      imgUrls:[]
    },
    brand:{
      isBrand:true, //是品牌商
      pcategory:[]
    },
  },
  checkBrand(opt){
    let identity = wx.getStorageSync('identity')
    if (identity==2){//如果是品牌商
      wx.setNavigationBarTitle({
        title: '产品系列',
      })
    }else{
      wx.setNavigationBarTitle({
        title: '我的商品',
      })
    }
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
      ,complete: function (res) {
        //console.log(res);
      }
    })
  },
  gotMoreMsg(e){
    this.setData({
      'brief.isbrief': !this.data.brief.isbrief
    })
  },
  goGoodDet(options){
    console.log(options);
    var p_id=options.currentTarget.dataset.p_id;
    wx.navigateTo({
      url: '../../hkb/pages/goods_detailed?p_id='+p_id,
    }) 
  },
  get_pcategory:function(){
    //获取对应的品牌分类
    var user_id=wx.getStorageSync('user_id');
    var brand_id = wx.getStorageSync('brand_id');
    var that=this;
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_pcategory',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        brand_id:brand_id
      },
      success: function (res) {
        console.log(res);
        var pcategory_data=res.data.retval;
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'655555546')
    var user_id=wx.getStorageSync('user_id')
    var share_id = options.shareInfo

    
    this.checkBrand(options)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.get_hkb_info();
    this.get_pcategory();
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
    var brand_id = wx.getStorageSync('brand_id');
    app.add_share_log(shareId, brand_id, 2);
    return {
      title: "我的商品详情",
      path: `/hkb/share_good/share_good?sharebtn=${true}&shareId=${shareId}&share_brandid=${brand_id}`,
    }
  }
})