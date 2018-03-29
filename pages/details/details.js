// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: "",
    goodsInfo: [],
    isHiddenToast: true
  },
  isShowToast: function () {
    this.setData({
      isHiddenToast: false
    })
  },
  toastChange: function () {
    this.setData({
      isHiddenToast: true
    })
  },
  addCollect: function (e) {
    console.log("addCollection")
    var that = this;
    wx.request({
      url: 'https://www.cloud-rise.com/es/api/love',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        goods: that.data.goodsId,
        user: getApp().getUserId()
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.data.goodsInfo.love = true;
          that.setData({
            isHiddenToast: false,
            goodsInfo: that.data.goodsInfo
          })
        }
      }
    })
  },
  //取消收藏
  cancelCollect: function (e) {
    console.log("addCollection")
    var that = this;
    wx.request({
      url: 'https://www.cloud-rise.com/es/api/love',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        goods: that.data.goodsId,
        user: getApp().getUserId(),
        'delete':1
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.data.goodsInfo.love = false;
          that.setData({
            isHiddenToast: false,
            goodsInfo:that.data.goodsInfo
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: "https://www.cloud-rise.com/es/api/info",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        goods: options.goods,
        id: getApp().getAppId(),
        user: getApp().getUserId()
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            goodsInfo: res.data,
            goodsId:options.goods,
          })
        }
      }
    })
  },
  addCollection: function (res) {

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

  }
})