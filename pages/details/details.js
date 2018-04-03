// pages/details/details.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: "",
    goodsInfo: [],
    finalImages: [],
    isHiddenToast: true,
    showDialog: false,  //对话框句柄
    name: null, //用户名
    phone: null, //用户联系电话
    nameBorderColor: '#ddd', //对话框输入用户名外框样式
    phoneBorderColor: '#ddd', //对话框输入电话外框样式
    collectState: -1 //0-等待收藏，1-等待取消收藏
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
    //如果userId=0,先登录
    if (app.globalData.userId == 0) {
      console.log("第一次查询userId为0");
      var that = this;
      app.getLoginUserId(function (userId) {
        //登录之后userId还是等于0，那么就引导用户去实名注册
        if (userId == 0) {
          console.log("登录之后查询userId为" + userId);
          that.setData({
            collectState: 0,
            showDialog: true,
            name: null,
            phone: null,
            nameBorderColor: '#ddd',
            phoneBorderColor: '#ddd'
          })
        } else {
          console.log("登录之后查询userId为:" + userId);
          that.method_collection(0);
        }
      })
    } else {
      console.log("第一次查询userId不为0");
      this.method_collection(0);
    }
  },

  //取消收藏
  cancelCollect: function (e) {
    this.method_collection(1)
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
          console.log(res.data.images)
          console.log(res.data.images.slice(1))
          that.data.finalImages = res.data.images.slice(1)
          that.setData({
            goodsInfo: res.data,
            finalImages: that.data.finalImages,
            goodsId: options.goods,
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
    app.userRegister(function(){
      if (that.data.collectState != -1) {
        that.method_collection(that.data.collectState)
      }
    },that.data.name,that.data.phone)
  },

  onCancel: function () {
    this.setData({
      showDialog: false,
      collectState: -1
    })
  },

  //收藏-取消收藏接口，flag-0收藏，flag-1取消收藏
  method_collection: function (flag) {
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
        'delete': flag
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.data.goodsInfo.love = (flag == 0);
          that.setData({
            isHiddenToast: false,
            goodsInfo: that.data.goodsInfo
          })
        }
      }
    })
  },

})