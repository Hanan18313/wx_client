// pages/prizeEdit/prizeEdit.js
var urlList = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classArray: ['特等奖', '一等奖', '二等奖', '三等奖'],
    objectClasstArray: [
      {
        id: 0,
        name: '特等奖'
      },
      {
        id: 1,
        name: '一等奖'
      },
      {
        id: 2,
        name: '二等奖'
      },
      {
        id: 3,
        name: '三等奖'
      }
    ],
    classIndex: [],
    roundArray: ['第一轮', '第二轮', '第三轮'],
    objectRoundArray: [
      {
        id: 0,
        name: '第一轮',
      },
      {
        id: 1,
        name: '第二轮'
      },
      {
        id: 2,
        name: '第三轮'
      }
    ],
    roundIndex: 0,
    items : [],
    round : [],
  },
  bindPickerChangeClass: function (e) {
    console.log(e)
    var that = this
    that.setData({
      classIndex: e.detail.value
    })
  },
  bindPickerChangeRound: function (e) {
    var that = this
    console.log(e)
    that.setData({
      roundIndex: e.detail.value
    })
  },
  //update
  formSubmit : function(e){
    var that = this
    var id = e.detail.value.id
    var prize_name = e.detail.value.prize_name
    var prize_info = e.detail.value.prize_info
    var price = e.detail.value.price
    console.log(e)
    if (prize_name.length > 0  && price.length > 0 && prize_info.length > 0){
      wx.request({
        url: urlList.prizeEdit_update,
        method: 'PUT',
        data: e.detail.value,
        header: {
          'content-type': 'application/json'
        },
        success: function () {},
        fail: function () {},
        complete: function (res) {
          if (res.data == '修改成功') {
            wx.showToast({
              title: '修改成功',
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
              title: '修改失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '输入的值不能为空，请重新输入！',
        icon : 'none'
      })
    }
  },
  //del
  del : function(e){
    console.log(e)
    var id = wx.getStorageSync('id')
    wx.request({
      url : urlList.prizeEdit_delete,
      method : 'DELETE',
      data : {
       id : id
      },
      header : {
        'content-type':'application/json'
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        if(res.data == '删除成功'){
          wx.showToast({
            title : '删除成功',
            icon : 'success',
            duration : 2000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta : 1
            })
          },2000)
        }else{
          wx.showToast({
            title: '删除失败',
            icon : 'none',
            duration : 2000
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options['prize_id']
    console.log(id)
    wx.setStorageSync('id', id)
    wx.request({
      url: urlList.prizeEdit_prizeShow,
      data : {
       id : id
      },
      method : 'GET',
      header : {
        'content-type':'application/json'
      },
      success : function(){},
      fail : function(){},
      complete : function(res){
        var r = res.data[0]['round']
        switch(r){
          case '1' :
            that.setData({
              rounds : '第一轮'
            })
            break;
          
          case '2' : 
            that.setData({
              rounds : '第二轮'
            })
            break;
          
          case '3' : 
            that.setData({
              rounds : '第三轮'
            })
            break;
          
        }

        var c = res.data[0]['prize_class']
        console.log(c)
        switch(c){
          case '特等奖' :
          that.setData({
            classIndex : '0'
          })
          break;
          case '一等奖' :
          that.setData({
            classIndex : '1'
          })
          break;
          case '二等奖':
            that.setData({
              classIndex: '2'
            })
            break;
          case '三等奖':
            that.setData({
              classIndex: '3'
            })
            break;
        } 
        console.log(res.data[0])
        console.log(typeof (Number(res.data[0]['round'])))
        console.log(Number(res.data[0]['round']))
        that.setData({
          items : res.data[0],
          roundIndex: Number(res.data[0]['round'])-1,
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