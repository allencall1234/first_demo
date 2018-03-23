//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow: function () {
    console.log("onShow!")
  },
  onHide: function () {
    console.log("onHide!")
  },
  getUserInfo: function (cb) {
    console.log(cb)
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res)
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              that.globalData.res = res
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    res: null,
    subDomain: "tz",
    appId: "gh_564f5cbb3136"
  },

  getAppId: function () {
    console.log("id = " + "wx155070bad7024d12")
    return "gh_564f5cbb3136";
  }
})