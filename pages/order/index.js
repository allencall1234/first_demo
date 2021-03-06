Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    canLoadMore: true,
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...',
    })
    this.data.pageIndex = 1;
    var that = this;
    this.loadData(function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      var pageIndex = that.data.pageIndex++;
      that.data.canLoadMore = true;
      var data = []
      if (res.data.length > 0 && res.data != "none") {
        data = res.data;
      }
      console.log(data)
      that.setData({
        goods: data,
        pageIndex: pageIndex
      })
    })
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
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...',
    })

    this.data.pageIndex = 1;
    var that = this;
    this.loadData(function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      var pageIndex = that.data.pageIndex++;
      var data = [];
      that.data.canLoadMore = true;
      if (res.data.length > 0 && res.data != "none") {
        data = res.data;
      }
      that.setData({
        goods: data,
        pageIndex: pageIndex
      })

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.canLoadMore) {
      return;
    }
    wx.showLoading({
      title: '正在加载...',
    })

    this.data.pageIndex++;
    var that = this;
    this.loadData(function (res) {
      wx.hideLoading();
      if (res.data.length < 10) {
        that.data.canLoadMore = false
      }
      var data = []
      if (res.data.length > 0 && res.data != "none") {
        data = res.data;
      }
      const newGoods = that.data.goods.concat(data);
      that.setData({
        goods: newGoods
      })
    })
  },
  /*
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

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
        phone: getApp().getPhone(),
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        typeof cb == 'function' && cb(res)
      }
    })
  }
})