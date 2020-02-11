// hkb/pages/customized.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setmeal:[],
    selectMeal:"",//存储的是套餐类型的id
    mealInfo:[],
    footSelect:"",
    doneShow:true,//显示弹窗
    isShowMeal:true,//显示套餐
    selectIndex:0,
    isUserShow:false,
    isPrivacyShow:false,
    showArtDia:false,//显示

    isMask:true//显示文章弹窗
  },
  changeItem(e){
    //console.log(e.currentTarget.dataset.id)
    if (e){
      this.setData({
        selectMeal: e.currentTarget.dataset.id,
        selectIndex: e.currentTarget.dataset.index,
      })
      console.log(this.data.setmeal)
    }else{
      console.log(this.data.setmeal)
      this.setData({
        selectMeal: this.data.setmeal[0].id
      })
    }
    
  },
  dialog(e){
    /* this.setData({
      doneShow: !this.data.doneShow
    })
    this.data.doneShow ? this.fadeOut() : this.fadeIn() */
    this.fadeOut()
    wx.showToast({
      title: '成功',
    })
  },
  fadeOut() {
    app.sliderightshow(this, 'animation', 750, 0)
  },
  fadeIn() {
    app.sliderightshow(this, 'animation', 0, 1)
  },
  goBuyMeal(e){
    /* var id = this.data.setmeal[this.data.selectIndex].id */
   /*  console.log(id) */
    wx.navigateTo({
      url: '/hkb/pages/meal_buy?id=' + this.data.selectMeal,
    })
  },
  showSay(){
    this.setData({
      isMask:false
    })
    
  },
  getAllSetmeal(){
    var user_id = wx.getStorageSync("user_id")
    var that = this
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=getAllSetmeal',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
      },
      success: function (res) {
        if(res.data.done){
          console.log(res,'jjj');
          that.setData({
            setmeal:res.data.retval
          })
          if(that.data.setmeal.length<=0){
            that.setData({
              isShowMeal:false
            })
          }
          that.changeItem()
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
  test3() {
    var user_id = wx.getStorageSync("user_id")
    var that = this
    console.log(that.data.selectMeal,5555)
  
    wx.request({
      url: app.globalData.url + 'index.php?app=pay&act=to_wxpay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        setmeal_id: that.data.selectMeal,
        order_id:0
      },
      success: function (res) {
        //console.log(JSON.stringify(res),666666)
        console.log(res, 666666)
        var data = JSON.parse(res.data.jsApiParameters);

        if (res.data) {
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(res) {
              //console.log(res)
              //this.fadeIn()
              that.fadeIn()
            },
            fail(res) {
              //console.log(res)
            },
            complete(res){
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
  user(e){
    /* this.setData({
      isUserShow: !this.data.isUserShow
    }) */
    wx.navigateTo({
      url: '/hkb/user_argument/user_argument?type='+'1',
    })
  },
  privacy(e){
    /* this.setData({
      isPrivacyShow: !this.data.isPrivacyShow
    }) */
    wx.navigateTo({
      url: '/hkb/user_argument/user_argument?type=' + '2',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSetmeal()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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