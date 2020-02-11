//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phone:""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getPhoneNumber(e) {
    /*  wx.login({
       success(res){console.log(res,'login')}
     })
     console.log(e,"eee") */
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
          //2. 访问登录凭证校验接口获取session_key、openid
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              'appid': "wx62df5a31f8bebbd3",
              'secret': "90509df427e19e4c646d5500b32ab0f7",
              'js_code': res.code,
              'grant_type': "authorization_code"
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (data) {
              console.log("data", data)
              if (data.statusCode == 200) {
                //3. 解密
                wx.request({
                  url: 'https://www.captain2016.cn/index.php?app=cdb_homepage&act=test2',
                  data: {
                    'encryptedData': e.detail.encryptedData,
                    'iv': e.detail.iv,
                    'session_key': data.data.session_key,
                    'openid': data.data.openid
                  },
                  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (data2) {
                    wx.hideLoading()
                    console.log(data2)
                    if (data2.statusCode == 200 && data2.data.phoneNumber) {
                      self.setData({
                        phone: data2.data.phoneNumber
                      })
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
        }

      }
    })
  },
  postUserInfo(code, nickname, headimgurl, ) {
    var that = this
    wx.request({
      url: 'https://www.captain2016.cn/index.php?app=glogin',
      data: {
        code: code,
        nickname: nickname,
        headimgurl: headimgurl,
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res) {
        console.log("---------------------login---success")
        console.log(res)
        if (res.data.done) {
          var identity = res.data.retval.im_aliww;
          var identity_str = "游客";

          wx.setStorageSync("user_id", res.data.retval.user_id);//存user_id
          app.get_info();
          /*           app.globalData.userInfo.user_id = res.data.retval.user_id;//存到app中
                    wx.setStorageSync("identity", res.data.retval.im_aliww);
                    app.globalData.userInfo.user_id = res.data.retval.im_aliww;//存到app中
                    wx.setStorageSync("region_name", res.data.retval.region_name);//地址
                    wx.setStorageSync("address", res.data.retval.address);//详细地址
                    wx.setStorageSync("wx_id", res.data.retval.wx_id);//微信号
                    wx.setStorageSync("phone_mob", res.data.retval.wx_id);//手机号 */

          //wx.setStorageSync("identity_str", identity_str);
          //app.globalData.userInfo.identity_str=identity_str;//存到app中
          console.log("登录成功后存进来的user_id" + wx.getStorageSync("user_id"))
          wx.reLaunch({
            url: "store_index"
          });
          return;
        }
        else {
          wx.showToast({
            title: '授权失败1',
          })
          return;
        }

      },
      fail: function (res) {
        console.log("---------------------login---fail")
        console.log(res)
        wx.showToast({
          title: '授权失败faile',
        })
      },
      complete: function (res) {
        console.log("---------------------login---complete")
        console.log(res)
        if (res.data.done) {
          wx.reLaunch({
            url: "store_index"
          });
          return;
        }
        else {
          wx.showToast({
            title: '授权失败1',
          })
          return;
        }
      },
    })

  },

  getUserSetting() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称

          wx.showLoading({
            title: '正在自动登录',
          })

          wx.getUserInfo({
            success(res) {
              //console.log(res);
              console.log("已经授权，可以直接调用 getUserInfo 获取头像昵称");
              var nickname = res.userInfo.nickName;
              var headimgurl = res.userInfo.avatarUrl;
              //console.log(nickname + '||' + headimgurl);
              wx.login({
                success(res) {
                  //console.log(res);
                  if (res.code) {
                    wx.setStorageSync("code", res.code);
                    wx.setStorageSync("nickname", nickname);
                    wx.setStorageSync("headimgurl", headimgurl);
                    app.globalData.wxInfo.nickname = nickname;//存到app中
                    app.globalData.wxInfo.headimgurl = headimgurl;//存到app中

                    that.postUserInfo(res.code, nickname, headimgurl);
                    var timer = setTimeout(function () {
                      wx.hideLoading()
                    }, 2000)
                    //var new_url = "https://www.wjtxmobile.com/index.php?app=glogin&code=" + res.code + "&nickname=" + nickname + "&headimgurl=" + headimgurl;
                    //new_url = encodeURIComponent(new_url);
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        }
      }
    })
  },

  //获取地理位置信息
  getGeoInfo() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(res);

        wx.setStorageSync("latitude", latitude);
        wx.setStorageSync("longitude", longitude);
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  onLoad: function () {
    //先获取一波用户的头像和昵称
    var that = this
    wx.getSetting({
      success(res) {
        wx.getUserInfo({
          success(res) {
            console.log(res, 133)
            that.setData({
              userInfo: res.userInfo
            })
          }
        })
        //console.log(res);)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      },
      complete(res) { console.log(res, 'res') }
    })
    /* //console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        //console.log(111456)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } */

  },
  getUserInfo: function (e) {
    this.getUserSetting();
    return;
    /* 
        console.log(e.detail.errMsg === "getUserInfo:ok");
        console.log(e)
    
        app.globalData.userInfo = e.detail.userInfo
    
        if (e.detail.errMsg==="getUserInfo:ok"){
          this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          
        }
         */
  }
})
