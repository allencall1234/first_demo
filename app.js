//app.js
import Touches from './utils/Touches.js'

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

  getLoginUserId: function (cb) {
    console.log(cb)
    var that = this
    if (this.globalData.userId) {
      typeof cb == "function" && cb(this.globalData.userId)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.request({
            url: "https://www.cloud-rise.com/es/api/login",
            method: "POST",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              id: getApp().getAppId(),
              code: res.code
            },
            success: function (response) {
              console.log(response)
              that.globalData.userId = response.data.open;
              typeof cb == "function" && cb(that.globalData.userId)
            }, fail: function () {
              wx.showToast({
                title: '用户登录失败',
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
    return this.globalData.userId;
  },
  Touches: new Touches()
})