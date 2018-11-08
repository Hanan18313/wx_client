// pages/attendee/attendee.js
var urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items : [],
    inputShowed : false,
    inputVal : "",
    pages:1,
    pageSize:10,
    dataArr:[],
    scrollHeight:0
  },
  showInput : function(){
    var that = this
    that.setData({
      inputShowed : true
    })
  },
  //取消
  hideInput : function(){
    var that = this
    wx.request({
      url: urlList.center_attendee,
      method: 'GET',
      header: {
        'content-type':'application/json'
      },
      success: function () { },
      fail: function () { },
      complete: function (res) {
        that.setData({
          items: res.data
        })
      }
    })
    that.setData({
      inputVal : "",
      inputShowed : false,
    })
  },
  //清空搜索框
  clearInput : function(){
    var that = this
    that.setData({
      inputVal : ""
    })
  },
  inputTyping : function(e){
    var that = this
    if(e.detail.value == null){
      wx.request({
        url: urlList.center_attendee,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          that.setData({
            items: res.data
          })
        }
      })
    }
    that.setData({
      inputVal : e.detail.value
    })
  },
  search : function(e){
    var that = this
    var value = e.detail.value
    if(e.detail.value == ''){
      wx.showToast({
        title: '请输入要搜索的内容！',
        icon : 'none',
        duration : 2000
      })
    }else if(e.detail.value != ''){
      wx.request({
        url: urlList.center_search_attendee,
        method : 'GET',
        data : {
          value : value
        },
        header : {
          'content-type':'application/json'
        },
        success : function(){},
        fail : function(){},
        complete : function(res){
          if(res.data.length == 0){
            that.setData({
              items : res.data
            })
            wx.showToast({
              title: '暂无信息',
              icon : 'none',
              duration : 2000
            })
          }else{
            that.setData({
              items: res.data,
              status: false
            })
          }
        },
      })
    }
  },

  previewImages : function(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //console.log(that.data)
    that.loadRoom()
  },
  lower : function(e){
    var that = this
    var dataArr = that.data.dataArr[0]
    var pageSize = that.data.pageSize;
    that.data.pages++
    wx.request({
      url: urlList.center_attendee,
      method : "GET",
      data : {
        page : that.data.pages,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      success : function(res){
        if(res.data.length > 0){
          var dataArr = that.data.dataArr
          //console.log(typeof(dataArr))
          dataArr.push(res.data)
          setTimeout(() => {
            that.setData({
              items: [].concat.apply([], dataArr),
              tipText:'加载中...',
              load:true,
              status:true
            })
          },1000)
        }else{
          that.setData({
            tipText: '加载完成',
            load:false,
            status: true
          })
        }
      }
    })
  },
  loadRoom : function(res){
    var that = this
    var page = that.data.page;
    var pageSize = that.data.pageSize;
    wx.request({
      url: urlList.center_attendee,
      method: 'GET',
      data: {
        page: 1,
        pageSize: pageSize
      },
      header: {
        'content-type': 'application/json'
      },
      success: function () { },
      fail: function () { },
      complete: function (res) {
        that.setData({
          items: res.data,
          status:false
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