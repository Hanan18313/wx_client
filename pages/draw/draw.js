
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var dataList = '';
var prom = require('../../utils/prom.js');
var urlList = require('../../utils/config.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["第一轮", "第二轮", "第三轮"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    items: [],
    isShow : false,
    isManager : false
  },
  tag : function(e,v){
    console.log(e)
    //console.log('111')
    var that = this
    var prize_id = e.currentTarget.dataset.prize_id
    wx.setStorageSync('prize_id', prize_id)
    wx.navigateTo({
      url: '../tag/tag',
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: urlList.member_draw_prizeView,
      method : 'GET',
      header : {
        'content-type':'application/json'
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        console.log(res.data)
        that.setData({
          items : res.data
        })
      }
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 浏览图片
  previewImage: function (e, v) {
    var that = this
    var id = e.currentTarget.id
    var imgUrl = e.target.dataset;
    var imgurlArr = []
    console.log(e)
    for (var i in imgUrl) {
      imgurlArr.push(imgUrl[i])
    }
    //console.log(imgurlArr)
    wx.previewImage({
      urls: imgurlArr
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: urlList.member_draw_prizeView,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function () { },
      fail: function () { },
      complete: function (res) {
      //  console.log(res.data)
        that.setData({
          items: res.data
        })
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