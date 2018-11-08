// pages/drawPrize/drawPrize.js
var urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager : false
  },
  draw : function(){
    wx.navigateTo({
      url: '../draw/draw',
    })
  },
  winner : function(){
    wx.navigateTo({
      url: '../winner/winner',
    })
  },
  prePrize: function () {
    var unionid = wx.getStorageSync('unionid') //调用index onload() unionid
    wx.request({
     url: urlList.member_checkSignIn,
     method : 'GET',
     data : {
       unionid : unionid
     },
     header : {
       'content-type':'application/json'
     },
     success : function(){},
     fail : function(){},
     complete : function(res){
       console.log(res.data)
       if (res.data[0]['is_vip'] == 0 || res.data[0]['is_vip'] == null) {
         wx.showToast({
           title: '只有会员才能查看呦！加入会员再来尝试！',
           icon: 'none',
           duration: 2000
         })
       } else {
         wx.navigateTo({
           url: '../prePrize/prePrize',
         })
       }
     }
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: urlList.checkManager,
      method : 'GET',
      data : {
        openid : openid
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        if(res.data.length > 0){
          that.setData({
            isManager : true
          })
        }else if(res.data.length == 0){
          that.setData({
            isManager : false
          })
        }
      },
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