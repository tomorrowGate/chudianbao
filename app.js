//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    /* wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }) */
    // 获取用户信息
    /* wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) */
  },
  onShow(e) {
    //wx.getShareInfo

    console.log(e.shareTicket, 'app.js,分享ticket')

    //e.path 进入到当前页面的route
    this.globalData.prevRoute = '/' + e.path
    //this.checksession()

    this.checkAuthorize(e.path) //检查有没有授权
    this.checkUserId()
  },
  checksession: function() {
    wx.checkSession({
      success: function(res) {
        wx.showToast({
          title: '欢迎回来',
          icon: 'none',
          duration: 1000
        })
      },
      fail: function(res) {
        wx.reLaunch({
          url: "/pages/index/authorize"
        });
      }
    })
  },
  getPhoneNumber(e) {
    return new Promise((req, rej) => {
      if (e.detail.errMsg == "getPhoneNumber:fail user deny") return;
      //用户允许授权
      console.log("lv", e.detail.iv);
      console.log(e.detail.encryptedData);
      wx.showLoading()
      var self = this
      //1. 调用登录接口获取临时登录code
      wx.login({
        success: res => {
          if (res.code) {
                  //3. 解密
                  wx.request({
                    url: 'https://www.captain2016.cn/index.php?app=cdb_homepage&act=test2',
                    data: {
                      'encryptedData': e.detail.encryptedData,
                      'iv': e.detail.iv,
                      'code':res.code
                    },
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/json'
                    }, // 设置请求的 header
                    success: function (data2) {
                      wx.hideLoading()
                      console.log(data2, 'data2')
                      if (data2.statusCode == 200 ) {
                        /* self.setData({
                          phone: data2.data.phoneNumber
                        }) */
                        self.get_info()
                        req('123')
                      }
                    },
                    fail: function (err) {
                      console.log(err);
                    }
                  })
                }
              },
              fail: function (err) {
                console.log(err);
              }
            })
          })
  },
  checkAuthorize(path) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权
          console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称");
          //检查登录有没有过期
          that.checksession()
        } else {
          wx.reLaunch({
            url: "/pages/index/authorize"
          })
        }
      }
    })
  },
  checkUserId() {
    if (!wx.getStorageSync('user_id')) {
      wx.reLaunch({
        url: "/pages/index/authorize"
      })
    }
  },
  /* 封装动画 */
  show: function(that, param, opacity) {
      var animation = wx.createAnimation({
        //持续时间800ms
        duration: 800,
        timingFunction: 'ease',
      });
      animation.opacity(opacity).step()
      //将param转换为key
      var json = '{"' + param + '":""}'
      json = JSON.parse(json);
      json[param] = animation.export()
      //设置动画
      that.setData(json)
  },
  //滑动渐入渐出
  slideupshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  sliderightshow: function(that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  get_message_count: function() {
    return new Promise((resove,rej)=>{
      var that = this;
      var user_id = wx.getStorageSync('user_id');
      wx.request({
        url: that.globalData.url + 'index.php?app=cdb_homepage&act=get_message_count',
        data: {
          code: user_id
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          that.globalData.msgcount = res.data.retval;
          wx.setStorageSync("msgcount", that.globalData.msgcount);
          console.log(that.globalData.msgcount, "app.js")
          var count = wx.getStorageSync("msgcount");
          if (count != 0) {
            count = count.toString();
            wx.setTabBarBadge({
              index: 3,
              text: count,
            })
          } else {
            wx.removeTabBarBadge({
              index: 3
            })
          }
          resove("over")
        },
        fail: function (res) {
          //console.log(res.data.retval);
          that.globalData.msgcount = 0;
          wx.setStorageSync("msgcount", 0);
          rej("消息更新失败")
        }
      })

       
      }
    )
    
  },
  globalData: {
    userInfo: {
      identity_str: "",
      identity: "",
      user_id: "",
      brand_id: "",
      brand_name: "",
      server_num: "",
      ptjj: ""
    },
    wxInfo: {
      nickname: "",
      headimgurl: "",
    },
    url: "https://www.captain2016.cn/",
    msgcount: 0,
    prevRoute: '',
    defaultRoute: '/pages / index / hkb_index'
  },
  //添加分享记录
  add_share_log: function(user_id, brand_id, type,housing_id) {
    console.log(user_id);
    console.log(brand_id);
    var that = this;
    wx.request({
      url: that.globalData.url + 'index.php?app=share&act=add_share_log',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        brand_id,
        type,
        housing_id,
      },
      success: function(res) {

      },
      fail: function(err) {
        //console.log(err);
      },
      complete: function(res) {
        console.log(res,'share');
      }
    })
  },
  //添加浏览记录
  clickXqdz: function(user_id, share_id, phone_mob, type,housing_id) {
    console.log(user_id);
    console.log(share_id);
    console.log(phone_mob);

    var that = this;
    wx.request({
      url: that.globalData.url + 'index.php?app=share&act=clickXqdz',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        user_id,
        share_id,
        phone_mob,
        type,
        housing_id
        
      },
      success: function(res) {

      },
      fail: function(err) {
        //console.log(err);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  //添加浏览记录
  clickXqdz2: function (p_id,user_id,share_id) {
    console.log(p_id);
    console.log(user_id);
    console.log(share_id);

    var that = this;
    wx.request({
      url: that.globalData.url + 'index.php?app=share&act=clickXqdz2',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        p_id,
        user_id,
        share_id
      },
      success: function (res) {

      },
      fail: function (err) {
        //console.log(err);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  formatDateTime: function(timeStamp, type) {
    //时间戳转年月日
    //type 0 返回年月日，1返回Y-M-D这样子的
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    //return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    switch (type) {
      case 0:
        return y + "年" + m + "月" + d + "日";
        break;
      case 1:
        return y + "-" + m + "-" + d;
        break;
      default:
        return y + "年" + m + "月" + d + "日";
        break;
    }

  },
  dateLater: function(dates, later) {
    //年月日转周几 later填0就行
    let dateObj = {};
    let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
    let date = new Date(dates);
    date.setDate(date.getDate() + later);
    let day = date.getDay();
    let yearDate = date.getFullYear();
    let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
    let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    dateObj.time = yearDate + '-' + month + '-' + dayFormate;
    dateObj.week = show_day[day];
    return dateObj;
  },
  get_info: function() {
    var user_id = wx.getStorageSync('user_id')
    var that = this;
    if (user_id == 0 || user_id == "" || !user_id) {
      wx.reLaunch({
        url: '/pages/index/authorize.wxml',
      })
      return;
    } else {
      //查询好多数据
      wx.request({
        url: that.globalData.url + 'index.php?app=cdb_homepage&act=get_info',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          user_id
        },
        success: function(res) {
          if (res.data.done) {
            var identity = res.data.retval.im_aliww;
            var identity_str = "游客";
            switch (parseInt(identity)) {
              case 1:
                identity_str = "经销商";
                break;
              case 2:
                identity_str = "品牌总部";
                break;
              case 3:
                identity_str = "职员";
                break;
              default:
                identity_str = "游客";
                break;
            }
            //console.log(res,'get_info')
            //member数据
            wx.setStorageSync("identity_str", identity_str);
            wx.setStorageSync("identity", res.data.retval.im_aliww);
            wx.setStorageSync("real_name2", res.data.retval.real_name2);
            wx.setStorageSync("phone_mob", res.data.retval.phone_mob);
            wx.setStorageSync("zhun", res.data.retval.zhun);
            wx.setStorageSync("apply_store", res.data.retval.apply_store);
            wx.setStorageSync("my_dealer", res.data.retval.my_dealer);
            wx.setStorageSync("my_brand", res.data.retval.my_brand);
            wx.setStorageSync("wx_id", res.data.retval.wx_id);
            //address
            wx.setStorageSync("region_name", res.data.retval.region_name);
            wx.setStorageSync("address", res.data.retval.address);
            //brand
            wx.setStorageSync("brand_name", res.data.retval.brand_name);
            wx.setStorageSync("brand_logo", res.data.retval.brand_logo);
            wx.setStorageSync("brand_introduce", res.data.retval.brand_introduce);
            //平台简介和服务热线
            wx.setStorageSync("server_num", res.data.retval.hotline);
            wx.setStorageSync("ptjj", res.data.retval.site_description);

          } else {

          }
        },
        fail: function(err) {

        },
        complete: function(res) {
          console.log(res);
        }
      })
    }
  }

})