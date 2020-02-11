Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    "list": [
      {
        "pagePath": "index1",
        "iconPath": "/src/image/home.png",
        "selectedIconPath": "/src/image/home0.png",
        "text": "首页"
      }, 
      {
        "pagePath": "index2",
        "iconPath": "/src/image/customer.png",
        "selectedIconPath": "/src/image/customer0.png",
        "text": "获客宝"
      },
      {
        "pagePath": "index3",
        "iconPath": "/src/image/trends.png",
        "selectedIconPath": "/src/image/trends0.png",
        "text": "动态"
      },
      {
        "pagePath": "myinfo",
        "iconPath": "/src/image/my.png",
        "selectedIconPath": "/src/image/my0.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})