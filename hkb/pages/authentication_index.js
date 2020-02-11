// hkb/pages/authentication_index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    canDistributor: true,
    fuzzyQuery: {
      city: [],
      filterData: [],
      inputValue: "",
      canSwitch: true
    },
    fuzzyQuery2: {
      city: [],
      filterData: [],
      inputValue: "",
    },
    idType: {
      isBrand: "13",//是否选择品牌商
      isShowDia: false
    },
    storeInfo: {
      tel: 0,
      address: "",
      isInput: false,
      isInputCity: false,
      isErro: false,
      region: '',
      second: 0
    },
    submitData: {
        'jxs_id':0,
        brand_id:0
    },
    dialog: {
      isDone: false,
      showText: "您的认证申请已提交，开始您的厨电宝之旅吧~",
      btnText: "确定"
    },
    yzm: ""
  },
  filter(e) {
    console.log(e)
    let keywords = e.detail.value
    let result = []
    let result2 = []

    this.setData({
      "fuzzyQuery.inputValue":e.detail.value
    })

    //将e.currentTarget.dataset.filterdata作为参数使用
    if (e.currentTarget.dataset.type_id == 0) {
      e.currentTarget.dataset.filterdata.city.forEach((city, index) => {
        if (city.brand_name.includes(keywords) && keywords != "") {
          result.push(city)
        }
      })
      this.setData({
        'fuzzyQuery.filterData': result
      })
    } else {
      e.currentTarget.dataset.filterdata.city.forEach((city, index) => {
        if (city.real_name2.includes(keywords) && keywords != "") {
          result2.push(city)
        }
      })
      this.setData({
        'fuzzyQuery2.filterData': result2
      })
    }
    //console.log(this.data.fuzzyQuery.filterData,"this.data.fuzzyQuery.filterData")
  },
  clearFilter(e) {
    /* 
     *设置定时器的原因：输入框的失去焦点事件比其他冲突事件先执行，会导致点了下拉框，而输入框没反应
     * */
    console.log(e)
    let that = this
    if (e.currentTarget.dataset.type_id == 0) {
      that.setData({
        'submitData.brand_name': e.detail.value
      })
    } else {
      that.setData({
        'submitData.jxs_real_name2': e.detail.value
      })
    }

    setTimeout(function() {
      that.setData({
        'fuzzyQuery.filterData': []
      })
    }, 300)
  },
  makesure(e) {
    console.log(e)
    if (e.currentTarget.dataset.indexkey) {
      if (e.currentTarget.dataset.type_id == 0) {
        this.setData({
          'fuzzyQuery.inputValue': e.currentTarget.dataset.indexkey,
          'fuzzyQuery.filterData': [],
          'submitData.brand_name': e.currentTarget.dataset.indexkey,
          'submitData.brand_id': e.currentTarget.dataset.brand_id,
          /* "fuzzyQuery.canSwitch":false//是否可以点击新品牌 */
        })
        console.log(this.data.submitData.brand_name,'input')
        

        this.get_jxs_by_brand(e.currentTarget.dataset.brand_id);
      } else {
        this.setData({
          'fuzzyQuery2.inputValue': e.currentTarget.dataset.indexkey,
          'fuzzyQuery2.filterData': [],
          'submitData.jxs_id': e.currentTarget.dataset.jxs_id,
          'submitData.jxs_real_name2': e.currentTarget.dataset.indexkey,
          /* "fuzzyQuery.canSwitch":false//是否可以点击新品牌 */
        })
      }
    } else {
      this.setData({
        'fuzzyQuery.filterData': [],
        'fuzzyQuery2.filterData': []

      })
    }
  },
  checkAlready() {
    if (!this.data.fuzzyQuery.canSwitch) {
      wx.showToast({
        title: '该品牌已存在',
        icon: "none"
      })
    }
  },
  switchChange(e) {
    console.log(e)
    if (e.detail.value) { //如果为选中
      this.setData({
        canDistributor: false,
        'fuzzyQuery2.inputValue': "",
        'submitData.is_new_brand': true,
        'submitData.is_new_jxs': true

      })

    } else {
      this.setData({
        canDistributor: true,
        'submitData.is_new_brand': false,
        'submitData.is_new_jxs': false
      })
    }
  },
  watchData(data) {
    if (data === false) {

    } else {

    }
  },
  switchChangeDis(e) {
    console.log(e)
    if (e.detail.value) { //如果为选中
      this.setData({
        'submitData.is_new_jxs': true
      })
    } else {
      this.setData({
        'submitData.is_new_jxs': false
      })
    }

    if (!this.data.canDistributor) {
      //e.detail = { value: true }
      wx.showToast({
        title: '选择新品牌后必须成为新经销商',
        icon: "none"
      })
    }
  },
  changeIdType(e) {
    if (e.currentTarget.dataset.idtype === "0") {
      this.setData({
        "idType.isBrand": true
      })
    } else {
      this.setData({
        "idType.isBrand": false
      })
    }
  },
  checkTel(str) {
    //检验是否符合手机号
    /* let str = e.detail.value.toString() */
    //return 
    let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    if (reg.test(str)) {
      this.setData({
        "storeInfo.isErro": false,
        "storeInfo.tel": str
      })
    } else {
      wx.showToast({
        title: '手机号码有问题',
        icon: 'none',
      })
      this.setData({
        "storeInfo.isErro": true
      })

    }
  },
  /* 申请认证 */
  getCode() {
    //验证手机号
    var that = this;
    let phone_mob = this.data.submitData.phone_mob;
    let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    var num = "";
    for (var i = 0; i < 6; i++) {
      num += Math.floor(Math.random() * 10);
    }
    if (reg.test(phone_mob)) {
      this.setData({
        "storeInfo.isErro": false
      })
      if (this.data.storeInfo.second>0){ 
        console.log(this.data.storeInfo.second)
        return 
      }
      //发送请求
      wx.request({
        url: app.globalData.url + 'index.php?app=sms&act=app_crsms',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          telphone: phone_mob,
          verify: num
        },
        success: function(res) {
          console.log(res,'验证码');
          that.setData({
            yzm: res.data[0].yzm
          })
        },
        fail: function(err) {
          console.log(err);
          that.setData({
            yzm: "0"
          })
        },
        complete: function(res) {
          //console.log(res);
        }
      })
      //倒计时
      if (this.data.storeInfo.second <= 0) {
        this.countDown()
      }
    } else {
      wx.showToast({
        title: '手机号码有问题',
        icon: 'none',
      })
      this.setData({
        "storeInfo.isErro": true
      })
    }

  },
  countDown() {
    //倒计时
    let i = 60;
    let that = this
    let timer = setInterval(function() {
      if (i > 0) {
        i--;
        that.setData({
          "storeInfo.second": i
        })
        //console.log(that.data.storeInfo.second)
      } else {
        clearInterval(timer)
      }
    }, 1000)
  },
  getLocation(e) {
    let that = this
    /* if (this.data.storeInfo.region.length<=0){
      wx.chooseLocation({
        success(res) {
          console.log(res);
          that.setData({
            "storeInfo.region": res.address + res.name
          })
        }
        , complete(e) {
          console.log(e)
        }
      })
    } */
  },
  bindRegionChange: function(e) {
    //获取地址
    console.log(e.detail.value.join(""))
    this.setData({
      "storeInfo.region": e.detail.value.join(""),
    })
    this.setData({
      'submitData.region1': e.detail.value[0],
      'submitData.region2': e.detail.value[1],
      'submitData.region3': e.detail.value[2]
    })
  },
  submitForm() {
    console.log(this.data.submitData, this.data.fuzzyQuery);
    //return;
    let that = this
    
    if (that.data.idType.isBrand) {
      var func_str = "Authentication_store";
    } else {
      var func_str = "Authentication_jxs";
    }
   /*  var is_new_brand = that.data.submitData.is_new_brand;
    var is_new_jxs = that.data.submitData.is_new_jxs; */
    var user_id = wx.getStorageSync('user_id');
    /* var is_brand = that.data.submitData.brand_id; */
    var brand_id = that.data.submitData.brand_id;
    var brand_name = that.data.fuzzyQuery.inputValue;
    console.log(this.data.fuzzyQuery.inputValue, brand_name, 'input') 

    var phone_mob = that.data.submitData.phone_mob;
    
   /*  var jxs_id = that.data.submitData.jxs_id; */
   /*  var jxs_real_name2 = that.data.submitData.jxs_real_name2; */
    var real_name2 = that.data.submitData.real_name2;
    var yz_num = that.data.submitData.yz_num;
    var region1 = that.data.submitData.region1;
    var region2 = that.data.submitData.region2;
    var region3 = that.data.submitData.region3;
    var address = that.data.submitData.address;
    console.log(address,32)
    console.log(brand_name,"brand_name,394")

    if (brand_name == "") {
      wx.showToast({
        title: '请填写品牌名称',
        icon: "none"
      })
      return
    }
    if (that.data.idType.isBrand == "13") {
      wx.showToast({
        title: '请选择身份',
        icon: 'none'
      })
      return;
    }
    if (!real_name2) {
      wx.showToast({
        title: '请填写名字',
        icon: "none"
      })
      return
    }
    if (!phone_mob){
      wx.showToast({
        title: '请填写手机',
        icon: "none"
      })
      return
    }
    if (this.data.storeInfo.isErro) {
      wx.showToast({
        title: '请填写正确的手机号码',
        icon: "none"
      })
      return
    }
    if (yz_num == "") {
      wx.showToast({
        title: '请填写验证码',
        icon: "none"
      })
      return
    }
    if (this.data.yzm != yz_num || this.data.yzm == "0") {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      })
      return;
    } else {
      console.log("验证码对", this.data.yzm, yz_num)
    }
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=' + func_str,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        /* is_new_brand, */
        /* is_new_jxs, */
        /* is_brand, */
        brand_id,
        brand_name,
        /* jxs_id, */
        /* jxs_real_name2, */
        real_name2,
        region1,
        region2,
        region3,
        address,
        phone_mob
      },
      success: function(res) {
        console.log(res);
        
        if (res.data.done) {
          app.get_info();
          that.setData({
            'dialog.showText': "您的认证申请已提交，开始您的厨电宝之旅吧~",
            'dialog.btnText': "确定",
            'idType.isShowDia': true
          })
          
          var timer = setTimeout(function(){
            
            wx.showToast({
              title: '认证成功',
            })
            wx.switchTab({
              url: '/pages/index/store_index',
            })
          },2000)
          
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      },
      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {
        console.log(res);

      }
    })

  },
  goHkb() {
    wx.switchTab({
      url: '../../pages/index/hkb_index',
    })
  },
  goCancle() {
    /* this.setData({
      'idType.isShowDia': false
    }) */
    wx.showToast({
      title: '你已申请成功',
      icon:"none"
    })
  },
  set_value(e) {
    //赋值，前端输入的
    var k = "'submitData." + e.currentTarget.dataset.canshu + "'";
    console.log(k);
    switch (e.currentTarget.dataset.canshu) {
      case 'real_name2':
        this.setData({
          'submitData.real_name2': e.detail.value
        })
        break;
      case 'phone_mob':
        this.checkTel(e.detail.value)
        this.setData({
          'submitData.phone_mob': e.detail.value
        })
        break;
      case 'yz_num':
        this.setData({
          'submitData.yz_num': e.detail.value
        })
        break;
      case 'address':
        this.setData({
          'submitData.address': e.detail.value
        })
        break;
    }
    console.log(this.data.submitData);
    console.log(this.data.fuzzyQuery.inputValue, 'input') 
  },
  get_all_brand() {
    var that = this;
    var all_brand = [];
    var brand = {};
    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_all_brand',
      method: 'GET',
      data: {
        'hello': 'world',
      },
      header: {
        'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res);
        if (res.data.done) {
          that.setData({
            'fuzzyQuery.city': res.data.retval
          })
        } else {

        }
      },
      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {
        console.log(res);
      } //结束后的回调(成功，失败都会执行)
    })
  },
  get_jxs_by_brand(brand_id) {
    var that = this;

    wx.request({
      url: app.globalData.url + 'index.php?app=cdb_homepage&act=get_jxs_by_brand',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        brand_id: brand_id
      },
      success: function(res) {
        console.log(res);
        console.log(res);
        if (res.data.done) {
          that.setData({
            'fuzzyQuery2.city': res.data.retval
          })
        } else {

        }
      },
      fail: function(err) {
        console.log(err);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //this.morkRequire()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.get_all_brand();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  
})