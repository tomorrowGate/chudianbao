// pica/pages/pica_orderstate/pica_orderstate.js
const app= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderState:0,
      activeIndex:0,

      // 套餐数据
      meal:[],
      mealTen:[],
      add_time:"",
      order_sn:"",
      order_amount:"",
      now_state:200,
  },
  changeTabber:function(e){
    var current=e.currentTarget;
    console.log(current);
    var currentId = e.currentTarget.dataset.id;
    this.setData({
      activeIndex:currentId,
      now_state: currentId
    })
    console.log(this.data.activeIndex)
    this.getOrderByType()
  },
  getOrderByType(){
    var user_id=wx.getStorageSync("user_id")
    var that = this
    //console.log(parseInt(this.data.activeIndex))
    wx.request({
      url: app.globalData.url + 'index.php?app=setmeal&act=getOrderByType',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        type: this.data.now_state,
      },
      success: function (res) {
        console.log(res);
        let arr = res.data.retval;
        if (arr.length<=0){
          that.setData({
            isnull:true
          })
        }else{
          that.setData({
            isnull: false
          })
          arr.forEach((value, index) => {
            value.add_time = app.formatDateTime(value.add_time, 0)
          })
          //console.log(arr)
          that.setData({
            meal: arr
          })
          //that.spliceTen()
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
  spliceTen(){
    var meal = this.data.meal
    var mealTen = this.data.mealTen
    mealTen.push([...meal.splice(0, 10)])
    console.log(mealTen,'mealTen')
    this.setData({
      meal,
      mealTen
    })
  },
  test(e){
    //console.log(e.currentTarget.dataset.order_id,222222);
    var order_id = e.currentTarget.dataset.order_id
    var user_id = wx.getStorageSync("user_id")
    var that = this

    wx.request({
      url: app.globalData.url + 'index.php?app=pay&act=to_wxpay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        setmeal_id: 0,
        order_id: order_id
      },
      success: function (res) {
        //console.log(JSON.stringify(res),666666)
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
  cencle(e){
    var order_id = e.currentTarget.dataset.order_id
    var user_id = wx.getStorageSync("user_id")
    var that = this

    wx.showModal({
      title: '取消订单',
      content: '您确定要取消订单吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + 'index.php?app=setmeal&act=cancel_order',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            data: {
              user_id: user_id,
              order_id: order_id,
            },
            success: function (res) {
              //console.log(res);
              if(res.data.done){
                wx.showToast({
                  title:"取消成功"
                })
                that.getOrderByType()
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon:"none"
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  sure(e){
    var user_id = wx.getStorageSync("user_id")
    var order_id = e.currentTarget.dataset.order_id
    var that = this
    wx.showLoading({
      title: '正在确认',
      mask:true
    })
    wx.request({
      url: app.globalData.url + 'index.php?app=setmeal&act=confirm_order',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        order_id: order_id,
      },
      success: function (res) {
        //console.log(res,'sure');
        if (res.data.done) {
          setTimeout(()=>{
            wx.hideLoading()
            wx.showToast({
              title: "确认成功"
            })
          },1000)
         
          that.getOrderByType()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
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
  gosure(){
    wx.navigateTo({
      url: '/hkb/pages/village_index?',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let state = JSON.parse(options.state)
    
    //console.log('---'+state);
    this.setData({
      activeIndex: state,
      now_state:state,
    })
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
    this.getOrderByType()
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
   /*  console.log(this.data.mealTen,'底部')
    this.spliceTen() */
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})