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
          console.log("login res = ")
          console.log(res)
          let code = res.code
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              that.globalData.res = res
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: "https://www.cloud-rise.com/es/api/login",
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  id: getApp().getAppId(),
                  code: code
                },
                success: function (response) {
                  if (response.statusCode == 200) {
                    console.log("login--------------------")
                    console.log(response)
                    that.globalData.userId = response.data.open;
                  }
                }
              })
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
    appId: "wx155070bad7024d12",
    userId: null
  },

  getAppId: function () {
    console.log("id = " + "wx155070bad7024d12")
    // return "gh_564f5cbb3136";
    return "wx155070bad7024d12";
  },

  getUserId: function () {
    console.log("userId = " + this.globalData.userId)
    return getApp().globalData.userId;
  }
})