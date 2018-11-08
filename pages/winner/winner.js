// pages/winner/winner.js
var urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: urlList.member_winnerItems,
      method : 'GET',
      header : {
        'content-type':'application/json'
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        console.log(res.data)
        if(res.data.length > 0){
          // console.log(res.data[0][0].length)
          
          // console.log(res.data.length)
          var orderArr = [];
          for(let j = 0; j < res.data.length; j++){
            console.log(res.data[j][0][0]['round'])
          }
          that.setData({
            dataArr: res.data,
          })
          var prizeItems = []
          var memberItems = []
          for (let i = 0; i < res.data.length; i++) {
            prizeItems.push(res.data[i][0])
            memberItems.push(res.data[i][1])
          }
          console.log(prizeItems)
          console.log(memberItems)
          that.setData({
            Pitems: prizeItems,
            Mitems: memberItems
          })
        }else{
          wx.showToast({
            title: '暂时没有中奖会员',
            icon : 'none',
            duration :2000
          })
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