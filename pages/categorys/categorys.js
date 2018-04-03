
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    titleArray: [],
    childInfos: null,
    dataArray: []
  },
  toDetailsTap: function (e) {
      wx.navigateTo({
        url: "/pages/details/details?goods=" + e.currentTarget.dataset.id
      })
  },
  onLeftTap: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == this.data.currentIndex) {
      return
    }
    console.log(e)

    if (this.data.dataArray[index] != null) {
      var tempDatas = this.data.dataArray[index];
      this.setData({
        currentIndex: index,
        childInfos: tempDatas
      })
    } else {
      this.setData({
        currentIndex: index
      })
      this.loadChildItems()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: "https://www.cloud-rise.com/es/api/type",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: getApp().getAppId()
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.statusCode == 200) {
          that.setData({
            titleArray: res.data,
          })
          that.loadChildItems()
        }
      }
    })
  },
  /**
   * 小类加载
   */
  loadChildItems: function () {
    console.log("loadChildItems")
    var that = this
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: "https://www.cloud-rise.com/es/api/goods",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        id: getApp().getAppId(),
        type: that.data.titleArray[that.data.currentIndex]
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.statusCode == 200) {
          that.setData({
            childInfos: res.data
          })
          that.data.dataArray[that.data.currentIndex] = res.data
        }
      }
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