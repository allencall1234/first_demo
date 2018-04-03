// pages/leftSlide/leftSlide.js

const App = getApp()
import itemData from './mock.js'

Page({
  data: {
    pageIndex: 1,
    itemData,
  },
  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)
    itemData && this.setData({ itemData: itemData })

  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData: itemData })
  },
  itemDelete: function (e) {  // itemDelete
    let itemData = App.Touches.deleteItem(e, this.data.itemData)
    itemData && this.setData({ itemData: itemData })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    console.log(getApp().globalData)
    this.loadData(function (res) {
      console.log(res)
      that.setData({
        itemData: res.data
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  loadData: function (cb) {
    var that = this;
    wx.request({
      url: "https://www.cloud-rise.com/es/api/order",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        phone: "13424260451",
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        typeof cb == 'function' && cb(res)
      }
    })
  }
})