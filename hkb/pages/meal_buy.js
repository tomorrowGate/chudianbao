// hkb/pages/meal_buy.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList:{},
    selectMeal:"",
    housing_name:[],
    apartment_name:[],
    apartment_count:0,
    housing_count:0,//小区数量
    area:[],
    subData:[],
    emile:"1529714202@qq.com"
  },
  copyTBL(){
    wx.setClipboardData({
      data: this.data.emile,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showToast({
          title: '复制成功',
          icon:"none"
        })
      }
    })
  },
  test3() {
    var user_id = wx.getStorageSync("user_id")
    var that = this
    console.log(that.data.selectMeal, 5555)

    wx.request({
      url: app.globalData.url + 'index.php?app=pay&act=to_wxpay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        setmeal_id: that.data.selectMeal,
        order_id: 0,
        arr: this.data.subData
      },
      success: function (res) {
        //console.log(JSON.stringify(res),666666)
        console.log(res, 666666)

        if (res.data) {
          var data = JSON.parse(res.data.jsApiParameters);
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
              //console.log(res)
              //this.fadeIn()
              //that.fadeIn()
              wx.navigateTo({
                url: '/pica/pages/pica_orderstate/pica_orderstate?state=20',
              })
            },
            fail(res) {
              //console.log(res)
            },
            complete(res) {
              //console.log(res,1000000)
            }
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
  addOne(){

  },
  getOneSetmealInfo(){
    var that = this
    wx.request({
      url: app.globalData.url + 'index.php?app=setmeal&act=getOneSetmealInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        setmeal_id: that.data.selectMeal,
        order_id: 0
      },
      success: function (res) {
        //console.log(JSON.stringify(res),666666)
        console.log(res, 666666)
        var data = res.data.retval;
        if (res.data.done) {
         that.setData({
           formList:data,
           apartment_count: parseInt(data.apartment_count),
           housing_count: parseInt(data.housing_count),
         })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
        //console.log(that.data.formList,"formList")
      },
      fail: function (err) {
        //console.log(err);
      },
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  set_value(e){
    //console.log(e,9)
    var canshu = e.currentTarget.dataset.canshu
    var arrIndex = e.currentTarget.dataset.index
    var arr = []
    switch (canshu){
      case 'village':
        this.data.housing_name[arrIndex]=e.detail.value
        break
      case "apartment":
        this.data.apartment_name[arrIndex] = e.detail.value
        break
      case "area":
        this.data.area[arrIndex] = e.detail.value
        break
    }
    
    this.setData({
      housing_name: this.data.housing_name,
      apartment_name: this.data.apartment_name,
      area: this.data.area
    })
    this.data.subData = [this.data.housing_name, this.data.apartment_name, this.data.area] 
    //console.log(this.data.subData,7)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      selectMeal:options.id
    })
    //console.log(this.data.selectMeal)
    this.getOneSetmealInfo()
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