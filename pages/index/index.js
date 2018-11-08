//index.js
//获取应用实例
const app = getApp()
var urlList = require('../../utils/config.js');
var prom = require('../../utils/prom.js');
const { $Toast } = require('../../style/dist/base/index');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    _res : [],
    __res : [],
    isSignIn : false,
    isManager : false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  prizeManage : function(){
    wx.navigateTo({
      url: '../prizeManage/prizeManage',
    })
  },
  product : function(){
    wx.navigateTo({
      url: '../product/productManage/productManage',
    })
  },
  draw: function () {
    wx.navigateTo({
      url: '../drawPrize/drawPrize',
    })
  },

  signIn: function () {
    var that = this
    wx.login({
      success: function (res) {
        //console.log(res.code)
        if (res.code) {
          wx.request({
            url: urlList.userBaseInfo,
            data: {
              code: res.code,
            },
            method: 'GET',
            header: {
              'cocntent-type': 'application/json'
            },
            success: function () { },
            fail: function () { },
            complete: function (_res) {
              var unionid = _res.data['unionid'];
              var openid = _res.data['openid'];
              var avatarUrl = wx.getStorageSync('avatarUrl')
             if(unionid.length != 0 || unionid != undefined ){
                wx.request({
                  url: urlList.member_signIn,//表vip_basic 数据
                  method: "GET",
                  data: {
                    unionid: unionid,
                    openid: openid,
                    avatarUrl: avatarUrl
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function () { },
                  fail: function () { },
                  complete: function (__res) {
                    if (__res.data.msg == '会员') {
                      wx.setStorageSync('unionid', unionid)
                      $Toast({
                        content: '请求中',
                        type: 'loading',
                        duration: 1
                      })
                      setTimeout(() => {
                        wx.showToast({
                          title: '签到成功',
                          icon: 'success',
                          duration: 2000
                        })
                      }, 1000)
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../Center/Center',
                        })
                      }, 3000)
                    } else if (__res.data.msg == '非会员') {
                        $Toast({
                          content : '请求中',
                          type : 'loading',
                          duration : 1
                        })
                        setTimeout(() => {
                          wx.showToast({
                            title: '您还不是会员，请加入会员',
                            icon: 'none',
                            duration: 2000,
                          })
                        },1000)
                      setTimeout(function () {
                        wx.redirectTo({
                          url: '../Center/Center',
                        })
                      }, 3000)
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  onLoad: function () {
    var that = this
    wx.login({   
      success: function (res) {
       //console.log(res.code)
        if (res.code) {
        //  console.log(res.code)
          wx.request({
            //url: urlList.member_signIn,
            url : urlList.userBaseInfo,
            data: {
              code: res.code,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function () {},
            fail: function () {},
            complete: function (_res) {
              var unionid = _res.data.unionid
              var openid = _res.data.openid
              if(unionid.length != 0){
                wx.request({ //判断是否已经签到
                  url: urlList.member_checkSignIn,
                  method: 'GET',
                  data: {
                    unionid: unionid,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function () {},
                  fail: function () { },
                  complete: function (res) {
                    if (res.data.result.length != 0) {
                      //var unionid = res.data[0].unionid
                      wx.setStorageSync('unionid', unionid) //unionid 写入内存 center.prePrize调用
                      wx.redirectTo({
                        url: '../Center/Center',
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    var avatarUrl = JSON.parse(e.detail.rawData).avatarUrl
    wx.setStorageSync('avatarUrl', avatarUrl)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
