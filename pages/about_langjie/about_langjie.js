// pages/about_langjie/about_langjie.js
var urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // bindFullScreenChange: function(e){
  //   console.log(e)
  // },
  bindWaiting: function(e){
    console.log(e)
    console.log('网络辣鸡')
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
  },
  langjie : function(){
    wx.navigateTo({
      url: '../langjieNet/langjieNet',
    })
  },
    bindPlay : function(){
      var that = this
      var path = urlList.basepath
      wx.request({
        url: urlList.center_about_langjie,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          console.log(res.data)
          var videoPath = path + res.data
          console.log(videoPath)
          that.setData({
            videoPath: videoPath
          })
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

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