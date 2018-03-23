//index.js
//获取应用实例

var app = getApp()
var flag = true
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    swiperCurrent: 0,
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: "0",
    loadingMoreHidden: true,
    top: 0,
    scrollTop: 520,
    pageIndex: 1,
    canLoadMore:true
  },
  toDetailsTap: function (e) {
    console.log("click");
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
    if(!this.data.canLoadMore){
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
        page: that.data.pageIndex
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          wx.hideLoading();
          const newGoods = that.data.goods.concat(res.data);
          if(res.data.length < 10){
            that.data.canLoadMore = false
          }
          that.setData({
            goods: newGoods
          })
        }
      }
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
    var that = this
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
        if (res.statusCode == 200) {
          that.setData({
            banners: res.data.images
          })
        }
      }
    })

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
        if (res.statusCode == 200) {
          let pageIndex = that.data.pageIndex++;
          that.setData({
            goods: res.data,
            pageIndex: pageIndex
          })
        }
      }
    })
  }
})
