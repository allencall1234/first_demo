
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showDialog: false,
    name: null,
    phone: null,
    nameBorderColor: '#ddd',
    phoneBorderColor: '#ddd'
  },
  gotoOrderPage: function () {
    wx.navigateTo({
      url: '/pages/order/leftSlide',
    })

    // wx.showToast({
    //   title: '开发中...',
    //   duration: 2000
    // })
  },
  gotoCollectionPage: function () {
    if (app.globalData.userId == 0) {
      console.log("第一次查询userId为0");
      var that = this;
      app.getLoginUserId(function (userId) {
        //登录之后userId还是等于0，那么就引导用户去实名注册
        if (userId == 0) {
          console.log("登录之后查询userId为" + userId);
          that.setData({
            showDialog: true,
            name: null,
            phone: null,
            nameBorderColor: '#ddd',
            phoneBorderColor: '#ddd'
          })
        } else {
          console.log("登录之后查询userId为:" + userId);
          that.gotoNextPage();
        }
      })
    } else {
      console.log("第一次查询userId不为0");
      this.gotoNextPage();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo)
      that.setData({
        userInfo: userInfo
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

  },

  //输入姓名
  onInputName: function (input) {
    var name = input.detail.value
    var color = '#ddd'
    if (name == null || name.length == 0) {
      color = '#f00'
    }
    this.setData({
      name: name,
      nameBorderColor: color
    })
  },

  //输入电话
  onInputPhone: function (input) {
    var phone = input.detail.value
    var color = '#ddd'
    if (phone == null || phone.length == 0) {
      color = '#f00'
    }
    this.setData({
      phone: phone,
      phoneBorderColor: color
    })
  },

  //对话框确认
  onConfirm: function () {
    if (this.data.name == null || this.data.name.length == 0) {
      this.setData({
        nameBorderColor: '#f00'
      })
      return
    }

    if (this.data.phone == null || this.data.phone.length == 0) {
      this.setData({
        phoneBorderColor: '#f00'
      })
      return
    }

    this.setData({
      showDialog: false
    })

    var that = this
    app.userRegister(function () {
      that.gotoNextPage()
    },that.data.name,that.data.phone)
  },

  onCancel: function () {
    this.setData({
      showDialog: false,
    })
  },

  gotoNextPage() {
    wx.navigateTo({
      url: '/pages/collection/index',
    })
  }
})