// pages/tag/tag.js
var urlList = require('../../utils/config.js');
var prom = require('../../utils/prom.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // bindRepliceInput : function(e){
  //   console.log(e)
  //   var cursor = e.detail.cursor
  //   if(cursor != -1){
  //     //光标在中间
  //     var left = e.detail.value.slice(0, cursor)
  //     //计算光标的位置
  //     cursor = left.replace(/11/g, '2').length
  //   }
  // },
  bindSubmit : function(e){
    console.log(e)
    var that = this;
    var prize_id = wx.getStorageSync('prize_id')
    var signIn_id = e.detail.value.signIn_id
    console.log(prize_id)
    if(signIn_id.length <= 0 ){
      wx.showToast({
        title: '输入的值不能为空！',
        icon : 'none',
        duration : 2000
      })
    }else{
      wx.request({
        url: urlList.member_signIn_id,
        method: "POST",
        data: {
          prize_id: prize_id,
          signIn_id: signIn_id
        },
        dataType: 'json',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
         // console.log(res.data.length)
          if (res.data.length > 0) {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '添加失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var prize_id = wx.getStorageSync('prize_id')
    wx.request({
      url: urlList.prize_singlePrize,
      method : 'GET',
      data : {
        prize_id : prize_id
      },
      header : {
        'content-type':'application/json'
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        that.setData({
          items : res.data[0]
        })
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