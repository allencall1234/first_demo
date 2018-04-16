//app.js
import Touches from './utils/Touches.js'

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this
    this.loadBanner(function (res) {
      that.globalData.storeName = res.data.name;
      that.globalData.storeDesc = res.data.description;
      that.globalData.banner = res.data.images
      wx.setNavigationBarTitle({
        title: res.data.name,
      })
    })
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

  //获取用户登录userId
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
              console.log('--------userinfo-----------')
              console.log(response)
              console.log(that.globalData)
              console.log('--------userinfo-----------')
              var id = 0;
              if (response.data.id) {
                id = response.data.id
              }
              that.globalData.open = response.data.open;
              that.globalData.userId = id;
              that.globalData.name = response.data.name;
              that.globalData.phone = response.data.phone;
              typeof cb == "function" && cb(id)
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

  //用户实名制
  userRegister: function (cb, name, phone) {
    var that = this;
    //引导实名制
    wx.request({
      url: 'https://www.cloud-rise.com/es/api/user',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.getAppId(),
        open: that.globalData.open,
        nick: that.globalData.userInfo.nickName,
        avatar: that.globalData.userInfo.avatarUrl,
        gender: that.globalData.userInfo.gender,
        city: that.globalData.userInfo.city,
        province: that.globalData.userInfo.province,
        country: that.globalData.userInfo.country,
        name: name,
        phone: phone
      },
      success: function (res) {
        console.log("用户实名成功回调:")
        console.log(res)
        console.log("phone:" + phone + ",name:" + name)
        that.globalData.userId = res.data;
        that.globalData.name = name;
        that.globalData.phone = phone;
        typeof cb == "function" && cb(that.globalData.userId)
      },
      fail: function (res) {

      }
    })
  },

  globalData: {
    userInfo: null,
    res: null,
    subDomain: "tz",
    // appId: "wx155070bad7024d12",
    appId: "wx2017f10d39748643",
    userId: 0,
    phone: null,
    name: null,
    open: null,
    storeName: null,
    storeDesc: null,
    banner: []
  },

  getAppId: function () {
    // return "gh_564f5cbb3136";
    return this.globalData.appId;
  },

  getUserId: function () {
    console.log("userId = " + this.globalData.userId)
    return this.globalData.userId;
  },

  getPhone: function () {
    console.log("phone = " + this.globalData.phone)
    return this.globalData.phone;
  },

  Touches: new Touches(),

  //加载banner
  loadBanner: function (cb) {
    wx.request({
      url: "https://www.cloud-rise.com/es/api/index",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: this.getAppId()
      },
      success: function (res) {
        console.log(res)
        typeof cb == 'function' && cb(res)
      }
    })
  },
})