// pages/collection/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSources: [1, 2, 3],
    pageIndex: 1,
    goods: [],
    canLoadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showNavigationBarLoading();
    // wx.showLoading({
    //   title: '正在加载...',
    // })
    // var that = this;
    // wx.request({
    //   url: "https://www.cloud-rise.com/es/api/goods",
    //   method: "POST",
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   data: {
    //     id: getApp().getAppId(),
    //     user: getApp().getUserId(),
    //     page: 1
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.hideLoading()
    //     wx.stopPullDownRefresh()
    //     wx.hideNavigationBarLoading()
    //     that.data.canLoadMore = true;
    //     if (res.statusCode == 200) {

    //       let pageIndex = that.data.pageIndex++;
    //       that.setData({
    //         goods: res.data,
    //         pageIndex: pageIndex
    //       })
    //     }
    //   }
    // })
  },

  gotoDetailPage: function (e) {
    if (app.globalData.useId) {
      console.log("userId不为空" + app.globalData.userId)
      wx.navigateTo({
        url: "/pages/details/details?goods=" + e.currentTarget.dataset.id
      })
    } else {
      console.log("重新获取userId")
      app.getLoginUserId(function (userId) {
        wx.navigateTo({
          url: "/pages/details/details?goods=" + e.currentTarget.dataset.id
        })
      })
    }
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
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...',
    })
    this.data.pageIndex = 1;
    var that = this;
    wx.request({
      url: "https://www.cloud-rise.com/es/api/goods",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        user: getApp().getUserId(),
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        that.data.canLoadMore = true;
        if (res.statusCode == 200) {
          let pageIndex = that.data.pageIndex++;
          that.setData({
            goods: res.data,
            pageIndex: pageIndex
          })
        }
      }
    })
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

  onPullDownRefresh: function () {
    console.log("onPullDownRefresh!")
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...',
    })
    this.setData({
      pageIndex: 1
    })
    var that = this;
    wx.request({
      url: "https://www.cloud-rise.com/es/api/goods",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        user: getApp().getUserId(),
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        that.data.canLoadMore = true;
        if (res.statusCode == 200) {
          let pageIndex = that.data.pageIndex++;
          that.setData({
            goods: res.data,
            pageIndex: pageIndex
          })
        }
      }
    })
  },

  onReachBottom: function () {
    console.log("on Reach bottom!");
    if (!this.data.canLoadMore) {
      return;
    }
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    that.data.pageIndex++;
    wx.request({
      url: "https://www.cloud-rise.com/es/api/goods",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        user: getApp().getUserId(),
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.hideLoading();
          if (res.data.length < 10) {
            that.data.canLoadMore = false
          }

          if (res.data.length > 0 && res.data != "none") {
            const newGoods = that.data.goods.concat(res.data);
            that.setData({
              goods: newGoods
            })
          }
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})