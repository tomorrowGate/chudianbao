// pages/link/link.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link:"",
    p_id:0,
    user_id:0,
    a_name:"",
    imgurl:"",
    square:"",
    housing_name:"",
    houseid: "",

    product_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var url = options.url;
    var user_id = options.user_id;
    var p_id = options.p_id;
    var a_name = options.a_name;
    var imgurl = options.img;
    var square = options.square;
    var housing_name = options.housing_name;
    var houseid = options.houseid;



    var my_user_id=wx.getStorageSync('user_id');
    if(user_id==my_user_id){
      console.log("自己点自己不写记录"+user_id+"----"+my_user_id);
    } else if (my_user_id&&user_id == my_user_id){
      console.log("其他人点的写记录" + user_id + "----" + my_user_id);
      app.clickXqdz2(p_id,my_user_id,user_id);
    }else{
      console.log("物品分享的页面")
      app.clickXqdz2(p_id, my_user_id, user_id);
    }

    if (options.prePath){
      this.setData({
        prePath: options.prePath
      })
    }

    this.setData({
      link: options.url,
      user_id: user_id,
      p_id:p_id,
      a_name: a_name,
      imgurl: imgurl,
      square: square,
      housing_name: options.housing_name,
      houseid: options.houseid,

      //物品
      product_id: options.product_id
    })
    console.log(this.data.link,'link')
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
    if (this.data.prePath){
      return {
        title: "VR全景",
      }
    } else if (this.data.product_id){
      console.log("物品分享")
      var p_id = this.data.p_id;
      var shareId = wx.getStorageSync("user_id");
      var brand_id = wx.getStorageSync('brand_id');
      var link = this.data.link;
      var imgurl = this.data.imgurl;
      var product_id = this.data.product_id

      app.add_share_log(shareId, brand_id, 0);

      return {
        title: "我的物品",
        path: `/hkb/share_good_detail/share_good_detail?sharebtn=${true}&shareId=${shareId}&share=${true}&imgurl=${imgurl}&p_id=${p_id}&product_id=${product_id}&link=${link}`,
      }
    }
    else{
      var p_id = this.data.p_id;
      var my_user_id = wx.getStorageSync('user_id');

      var shareId = wx.getStorageSync("user_id");
      var housing_name = this.data.housing_name;
      var housing_id = this.data.houseid;
      var brand_id = wx.getStorageSync('brand_id');

      var link = this.data.link;
      var a_name = this.data.a_name;
      var imgurl = this.data.imgurl;
      var square = this.data.square;

      app.add_share_log(shareId, brand_id, 1, housing_id);

      return {
        title: "我的小区",
        path: `/hkb/share_vil_detail/share_vil_detail?sharebtn=${true}&shareId=${shareId}&housing_name=${housing_name}&houseid=${housing_id}&share=${true}&link=${link}&a_name=${a_name}&imgurl=${imgurl}&square=${square}&p_id=${p_id}`,
      }
    }
  }
})