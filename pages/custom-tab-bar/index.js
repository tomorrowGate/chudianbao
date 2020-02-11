Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/index",
      iconPath: "/src/image/icon_component.png",
      selectedIconPath: "/src/image/icon_component_HL.png",
      text: "首页"
    }, {
        pagePath: "/index/index2",
        "iconPath": "/src/image/icon_API.png",
        "selectedIconPath": "/src/image/icon_API_HL.png",
      text: "获客宝"
    }]
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