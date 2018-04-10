//index.js
//获取应用实例

var app = getApp()
var flag = true
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
    top: 0,
    scrollTop: 520,
    pageIndex: 1,
    canLoadMore: true
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/details/details?goods=" + e.currentTarget.dataset.id
    })
  },

  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      // wx.navigateTo({ })
    }
  },
  //上拉刷新
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh!")
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    this.data.pageIndex = 1
    this.loadGoods(function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      that.data.canLoadMore = true;
      var pageIndex = that.data.pageIndex++;
      that.setData({
        goods: res.data,
        pageIndex: pageIndex
      })
    })
  },
  //下拉加载更多
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
    this.loadGoods(function (res) {
      wx.hideLoading();
      const newGoods = that.data.goods.concat(res.data);
      if (res.data.length < 10) {
        that.data.canLoadMore = false
      }
      that.setData({
        goods: newGoods
      })
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    //加载banner
    this.loadBanner(function (res) {
      that.setData({
        banners: res.data.images
      })
    })
    //加载商品
    this.loadGoods(function (res) {
      var pageIndex = that.data.pageIndex++;
      that.setData({
        goods: res.data,
        pageIndex: pageIndex
      })
    })
  },

  onShareAppMessage: function (res) {

  },

  //加载banner
  loadBanner: function (cb) {
    wx.request({
      url: "https://www.cloud-rise.com/es/api/index",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId()
      },
      success: function (res) {
        console.log(res)
        typeof cb == 'function' && cb(res)
      }
    })
  },

  
  //加载商品列表
  loadGoods: function (cb) {
    var that = this
    wx.request({
      url: "https://www.cloud-rise.com/es/api/goods",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId(),
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        typeof cb == 'function' && cb(res)
      }
    })
  }
})
