// pages/Center/Center.js
var urlList = require('../../utils/config.js');
var prom = require('../../utils/prom.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["会议安排", "公司简介"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    scrollTop : 0,
    current: 1,
    choose : [{
      id : 1,
      name : "是"
    },{
      id : 2,
      name : "否"
    }],
    currentLunch : false,
    position : "left",
    checked : false,
    signIn_info : []
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft+29,
      activeIndex: e.currentTarget.id,
      //sliderLeft : 29
    });
  },
click : function(e){
  console.log(e)
},
onChange ({detail = {}}){// -----------------openid
  //var openid = wx.getStorageSync('openid');
  console.log(detail)
  var unionid = wx.getStorageSync("unionid")
  var value = detail.value
  var that = this
 // console.log(detail)
  if(unionid.length != 0){
    wx.request({
      url: urlList.center_isLunch,
      method: 'PUT',
      data: {
        unionid: unionid,
        value: value
      },
      header: {
        'content-type': "application/json"
      },
      success: function () { },
      fail: function () { },
      complete: function (res) {
        if(res.data.msg == '操作成功'){
          wx.showToast({
            title: '操作成功！',
            icon: 'success',
            duration: 2000,
          })
          that.setData({
            currentLunch: detail.value
          })   
        }
      },
    }) 
  }else if(unionid.length == 0){
    wx.showToast({
      title: '非会员会宴请到前台登记！',
      icon: 'none',
      duration: 2000
    })
  }

},
  about_langjie : function(){
    wx.navigateTo({
      url: '../about_langjie/about_langjie',
    })
  },
  meeting : function(e){
    wx.navigateTo({
      url: '../meeting/meeting',
    })
  },
  production : function(){
    wx.navigateTo({
      url: '../production/production',
    })
  },
  attendee : function(){
    wx.navigateTo({
      url: '../attendee/attendee',
    })
  },
  drawPrize : function(){
    var unionid = wx.getStorageSync('unionid') //调用index onload() unionid
    if(unionid.length > 0){
      wx.navigateTo({
        url: '../prePrize/prePrize',
      })
    }else if(unionid.length == 0){
      wx.showToast({
        title: '只有会员才能查看奖品并参加呦！加入会员再来尝试！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  makePhoneCall : function(e){
    wx.makePhoneCall({
      phoneNumber: '0571-69958000',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var unionid = wx.getStorageSync('unionid')
    if(unionid.length != 0){
      wx.request({
        url: urlList.center_mineSignInfo,
        method: "GET",
        data: {
          unionid: unionid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          if (res.data[0].signIn_id == null) {
            that.setData({
              signIn_info: null
            })
          } else {
            that.setData({
              signIn_info: res.data[0].signIn_id
            })
          }
          if (res.data[0].is_lunch == "" || res.data[0].is_lunch == "0") {
            that.setData({
              currentLunch: false
            })
          } else if (res.data[0].is_lunch == "1") {
            that.setData({
              currentLunch: true
            })
          }
        }
      })
    }else{
      that.setData({
        signIn_info : null
      })
    }
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
    var that = this
    var unionid = wx.getStorageSync('unionid')
    if (unionid.length != 0) {
      wx.request({
        url: urlList.center_mineSignInfo,
        method: "GET",
        data: {
          unionid: unionid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          if (res.data[0].signIn_id == null) {
            that.setData({
              signIn_info: null
            })
          } else {
            that.setData({
              signIn_info: res.data[0].signIn_id
            })
          }
          if (res.data[0].is_lunch == "" || res.data[0].is_lunch == "0") {
            that.setData({
              currentLunch: false
            })
          } else if (res.data[0].is_lunch == "1") {
            that.setData({
              currentLunch: true
            })
          }
        }
      })
    } else {
      that.setData({
        signIn_info: null
      })
    }
    wx.showNavigationBarLoading();
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 1000)
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