// pages/compnents/hotpage.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page:{
      type:Object,
      value:{
        title: "",
        time: "",
        content: "",
        havePage:false,
        options: {}
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatDateTime: function (timeStamp) {
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
      return y + "年" + m + "月" + d + "日";
    },
    getPage(options){
      console.log(options);
      var mid = options.mid;
      var that = this;
      that.set_is_read(mid);

      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=hot_messagebyid',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          mid: mid,
        },
        success: function (res) {
          console.log(res);
          console.log(res.data.retval.title);
          var add_time = app.formatDateTime(res.data.retval.add_time, 0);
          console.log(add_time);

          that.setData({
            title: res.data.retval.title,
            time: add_time,
            content: res.data.retval.content,
          })

        },
        fail: function (err) {
          console.log(err);
        }
        ,
        complete: function (res) {
          console.log(res);

        }
      })
    }
    , set_is_read: function (m_id) {
      //消除已读属性
      var that = this;

      wx.request({
        url: app.globalData.url + 'index.php?app=cdb_homepage&act=Browse',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          m_id: m_id,
        },
        success: function (res) {
          console.log(res);

        },
        fail: function (err) {
          console.log(err);
        }
        ,
        complete: function (res) {
          console.log(res);
        }
      })
    },
  }
  , lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.getPage(page.options)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
