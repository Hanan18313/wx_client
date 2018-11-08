// pages/prize/prize.js
var App = getApp();
var urlList = require('../../utils/config.js')
var prom = require('../../utils/prom.js');
var check = '';
var checkArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items : [],
    Items : [
      { name: 'orderByDraw', value: '按抽奖排序',checked :''}
    ],
  },
  orderByDraw : function(){
    var that = this    
    console.log(check)
    if(check == 1){
      wx.request({
        url: urlList.prizeOrderByDraw,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () {},
        fail: function () {},
        complete: function (res) {
          // console.log(res.data)
          that.setData({
            items: res.data,
            checked : true
          })

        },
      })
    }else if(check == 0){
      wx.request({
        url: urlList.prizeShow_prize,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          //console.log(res.data)
          that.setData({
            items: res.data,
            checked: false
          })
          console.log(checkArr)
        }
      })
    }
  },
  bindboxChange : function(e){
    console.log(e)
    if(e.detail.value ==''){
      check = 0
    }else{
      check = 1
    }
   // console.log(checkArr)
  },
  prizeAdd : function(){
    wx.navigateTo({
      url: '../prizeAdd/prizeAdd',
    })
  },
  details : function(e){
   // console.log(e)
   // var prize_id = e.currentTarget.dataset.prize_id
   var prize_id = e.currentTarget.dataset.prize_id
   // console.log(prize_id)
    wx.navigateTo({
      url: '../prizeEdit/prizeEdit?prize_id='+prize_id,
    })
  },
  // 浏览图片
  previewImage: function (e,v) {
    var that = this
    var id = e.currentTarget.id
    var imgUrl = e.target.dataset;
    var imgurlArr = []
    console.log(e)
    for(var i in imgUrl){
      imgurlArr.push(imgUrl[i])
    }
    //console.log(imgurlArr)
    wx.previewImage({
     urls : imgurlArr
    })
  },
  onLoad: function () {
    var that = this
    if(check == 0){
      wx.request({
        url: urlList.prizeShow_prize,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          //console.log(res.data)
          that.setData({
            items: res.data,
            checked : false
          })
          console.log(checkArr)
        }
      })
    }else if(check == 1){
      wx.request({
        url: urlList.prizeOrderByDraw,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          that.setData({
            items: res.data,
            checked : true
          })
        },
      })
    }
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
    if (check == 0) {
      wx.request({
        url: urlList.prizeShow_prize,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          //console.log(res.data)
          that.setData({
            items: res.data,
            checked : false
          })
          console.log(checkArr)
        }
      })
    } else if(check == 1){
      wx.request({
        url: urlList.prizeOrderByDraw,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          //console.log(res.data)
          that.setData({
            items: res.data,
            checked : true
          })
          console.log(check)
          console.log('222')
        },
      })
    }

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