// hkb/pages/statistics_index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBrand:true,
    weekActive:true,
    activeIndex:0,
    /* 经销商 */
    custStas:{
      week_Customer:0,
      all_Customer:0,
    },
    sharedata:{
      week_share:0,
      week_browse:0,
      all_browse:0,
      all_share:0
    },
    customersWeek:[],
    customersTotal:{
      add_time: "",
      phone_mob: "",
      portrait: "",
      real_name: ""
    },
    /* 品牌商 */
    nineShareData:{}
  },
  /* 判断是否为品牌商 */
  checkBrand(){
    var ugrade = wx.getStorageSync('identity');
    if(ugrade ==1 ){
      //经销商
      this.setData({
        isBrand:false
      })
    }else{
      //品牌商
      this.setData({
        isBrand:true
      })
    }
  },
  getTen() {
    var user_id = wx.getStorageSync('user_id');
    var that = this
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_ten',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
      },
      success: function (res) {
        console.log(res,333322323);
        var data=res.data.retval;
        if (res.data.done) {
          that.setData({
            "custStas.all_Customer": data.all_Customer,
            "custStas.week_Customer": data.week_Customer,
            "sharedata.week_browse": data.week_browse,
            "sharedata.week_share": data.week_share,
            "sharedata.all_browse": data.all_browse,
            "sharedata.all_share": data.all_share,

          })
          that.setData({
            nineShareData:data
          })
        }
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
  getAllCustomerByUser(type){
    var user_id = wx.getStorageSync('user_id');
    var that = this
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getAllCustomerByUser',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        type,
      },
      success: function (res) {
        console.log(res, '厨电宝');
        var data = res.data.retval
        if (res.data.done) {
          that.setData({
            customersWeek:data
          })
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
  changeCustom(e){
    var i = e.currentTarget.dataset.week
        this.setData({
          activeIndex: i
        })
        this.getAllCustomerByUser(i)
    
    /* if (e.currentTarget.dataset.week){
      this.setData({
        weekActive: true
      })
      this.getAllCustomerByUser(0)
    }else{
      this.setData({
        weekActive: false
      })
      this.getAllCustomerByUser(1)
    } */
  },
  callPhone(e){
    console.log(e.currentTarget.dataset.mob)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mob
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkBrand()
    this.getTen()
    this.getAllCustomerByUser(0)
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

  }
})