// pica/pages/pica_card/pica_card.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brief:{
      logo: "",
      brand_name: "",
      brand_content: "",
      address: "",
      identity_str: "",
      identity: 0,
      isbrief: false, //是否要打开简介
      isshopbrief: true,
    },
    storeInfo:{
      wechart:"",
      brand:"",
      address:"",
      isInput:false,
      isWxdone:false,
      isWxErro:false,
      isWxInput:false,
      isInputCity:false,
      isErro:false,
      region: [],
    },
    identity: 0,

    imgUrls: '',
    username: '',
    brand_name: '',
    brandorigin: '',
    isstore: false,
    isbrand: false,
    issimple: false,
    identity_num: 0,

    identity_str: "",
    address: "",
    region_name:"",
    phone_mob: "",
    wx_id:""
  },
  
  gotMoreshopMsg(e){
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
        console.log(res);
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
      ,
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  addPhoneContact() {
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
  shareCard(e){
    console.log(e)
  },
  changeValue(e){
    if (this.data.storeInfo.isErro) {
      wx.showToast({
        title: '手机号码有问题',
        icon: 'none',
      })
    } else {
      //手机号输入正确时改做的事
      if (this.data.storeInfo.isInput){//只有按钮的文字为“完成”时才能发送请求
        this.submitInfo()
      }
      this.setData({
        "storeInfo.isInput": !this.data.storeInfo.isInput
      })
    }
  },
  changeWx(e){
    if (this.data.storeInfo.isWxErro) {
      wx.showToast({
        title: '微信号不能为空',
        icon: 'none',
      })
    } else {
      //微信号输入正确时改做的事
      if (this.data.storeInfo.isWxInput) {//只有按钮的文字为“完成”时才能发送请求
        //发送请求
        this.submitInfo_wx_id();
      }
      this.setData({
        "storeInfo.isWxInput": !this.data.storeInfo.isWxInput
      })
    }
    console.log(e)
    /* this.setData({
      "storeInfo.wechart":
    }) */
  },
  checkWx(e){
    if(e.detail.value==""){
      this.setData({
        'storeInfo.isWxErro':true
      })
    }
    else{
      //console.log(e.detail.value+"************");
      this.setData({
        'storeInfo.isWxErro': false,
        wx_id: e.detail.value
      })
    }
  },
  submitInfo(){
    //向后台发送请求--修改手机号
    var that = this;
    var edit_phone = this.data.storeInfo.tel;
    var user_id = wx.getStorageSync('user_id');

    if(!user_id){
      wx.showToast({
        title: '账号异常',
      })
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
      return;
    }
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=edit_phone_mob',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        phone_mob: edit_phone,
      },
      success: function (res) {
        //console.log(res);
        if(res.data.done){
          //存数据
          wx.setStorageSync('phone_mob', edit_phone);//手机号
          that.setData({
            phone_mob: edit_phone
          })
          wx.showToast({
            title: res.data.retval,
          })
          return;
        }else{
          console.log(res.data.msg)
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
          return;
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '系统异常',
        })
        return;
      }
      ,
      complete: function (res) {
        //console.log(res);

      }
    })
  },
  submitInfo_wx_id() {
    //向后台发送请求--修改微信号
    var that = this;
    var wx_id = this.data.wx_id;
    //console.log(wx_id+"************************************");
    var user_id = wx.getStorageSync('user_id');

    if (!user_id) {
      wx.showToast({
        title: '账号异常',
      })
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
      return;
    }
    if (wx_id==wx.getStorageSync('wx_id')){
      console.log("两次微信一致")
      return 
    }
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=edit_wx_id',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        wx_id: wx_id,
      },
      success: function (res) {
        console.log(res);
        if (res.data.done) {
          //存数据
          wx.setStorageSync('wx_id', wx_id);//手机号
          that.setData({
            wx_id: wx_id
          })
          wx.showToast({
            title: res.data.retval,
          })
          return;
        } else {
          /* console.log(res.data.msg) */
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
          return;
        }

      },
      fail: function (err) {
        wx.showToast({
          title: '系统异常',
        })
        return;
      }
      ,
      complete: function (res) {
        //console.log(res);
      }
    })
  },
  submitInfo_addr() {
    //向后台发送请求--修改地址
    var user_id = wx.getStorageSync('user_id');
    var nickname = wx.getStorageSync('nickname');
    var address = this.data.address;
    //console.log(address,"address++")
    var that = this;
    var region1 = this.data.storeInfo.region[0];
    var region2 = this.data.storeInfo.region[1];
    var region3 = this.data.storeInfo.region[2];
    if(!region1){
      wx.showToast({
        title: '请选择地址',
        icon:'none'
      })
      return;
    }
    //var user_id = 0;
  //return;

    if (!user_id) {
      wx.showToast({
        title: '账号异常',
      })
      wx.reLaunch({
        url: '/pages/index/authorize',
      })
      return;
    }
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=edit_address',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id: user_id,
        nickname:nickname,
        address: address,
        region1: region1,
        region2: region2,
        region3: region3,
      },
      success: function (res) {
        //console.log(res,64664);
        if(res.data.done){
          //存地址
           wx.setStorageSync("region_name", res.data.retval);//地址
          wx.setStorageSync("address", address);//地址


          //wx.setStorageSync("address", res.data.retval.address);//详细地址
          that.setData({
            region_name: res.data.retval,
            address:address
          })
        }else{
          console.log(res,'地址问题')
          wx.showToast({
            title: '您的地址不支持我们的服务',
            icon:"none"
          })
        }
      },
      fail: function (err) {
        console.log(err,'file');
      }
      ,
      complete: function (res) {
        //console.log(res);

      }
    })
  },
  checkTel(e){
    //检验是否符合手机号
    console.log(typeof e.detail.value)
    let str = e.detail.value.toString()
    let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    if (reg.test(str)) {
      this.setData({
        "storeInfo.isErro": false,
        "storeInfo.tel": str
      })
      return true;
    }else{
      wx.showToast({
        title: '手机号码有问题',
        icon: 'none',
      })
      this.setData({
        "storeInfo.isErro": true

      })
      return false
    }
  },
  bindRegionChange: function (e) { 
    this.setData({
      "storeInfo.region": e.detail.value,
    })
  },
  changeCity(){
    if (this.data.storeInfo.isInputCity) {//只有按钮的文字为“完成”时才能发送请求
      this.submitInfo_addr()
    }
    this.setData({
      "storeInfo.isInputCity": !this.data.storeInfo.isInputCity
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
          phone_mob: data.phone_mob,
          region_name: data.region_name,
          address: data.address,
          wx_id: data.wx_id,
          imgUrls: data.headimgurl,
          username: data.nickname,
          identity_str: data.identity_str,
          brand_name: data.brand_name,
          real_name2:data.real_name2
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
  initData() {
    //var address = wx.getStorageSync('address') == "undefined" ? "" : wx.getStorageSync('address')
    //赋值
    /* this.setData({
      phone_mob: wx.getStorageSync('phone_mob'),
      imgUrls: wx.getStorageSync('headimgurl'),
      username: wx.getStorageSync('nickname'),
      identity_str: wx.getStorageSync('identity_str'),
      brand_name: wx.getStorageSync('brand_name'),
      region_name: wx.getStorageSync('region_name'),
      address: address,
      wx_id: wx.getStorageSync('wx_id'),
    }) */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var identity = wx.getStorageSync('identity');
    //console.log("----------------"+wx.getStorageSync('region_name'))
    if (identity > 0) {
      this.get_hkb_info();
    }
    this.getUserById(wx.getStorageSync("user_id"))
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
    return {
      title: "厨电宝",
      path: "/pica/pages/pica_sharecard/pica_sharecard?user_id=" + user_id
    }
  },
  set_address:function(e){
    this.setData({
      address:e.detail.value
    })
  }
})