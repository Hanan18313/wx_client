// pages/prizeAdd/prizeAdd.js
var urlList = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items : [],
    files : []
  },
  bindPickerChangeClass : function(e){
    var that = this
   // console.log(e)
    that .setData({
      classIndex : e.detail.value
    })
  },
  bindPickerChangeRound : function(e){
    var that = this
   // console.log(e)
    that.setData({
      roundIndex : e.detail.value
    })
  },
  chooseImage: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['从相册选取', '拍照'],
      itemColor: '#1531AE',
      success: function () { },
      fail: function () { },
      complete: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImages('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImages('camera')
          }
        }
      }
    })
  },

  chooseWxImages: function (type) {
    var that = this
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // console.log(that.data)
        // console.log(res)
        that.setData({
         // tempFliePaths: res.tempFilePaths,
          files: that.data.files.concat(res.tempFilePaths)
        })
       // console.log('res:' + res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: urlList.prize_uploadImage,
          // url : 'https//api.langjie.com/wxImage',
          filePath: tempFilePaths[0],
          name: 'file',  //文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          success: function (_res) {
            // console.log('返回数据：' + _res.data)
            // console.log('状态码：' + _res.statusCode)
          },
          fail: function (_res) {
           // console.log('上传失败')
          },
          complete: function (_res) {
            //console.log('imgUrl:', _res.data)
            var imgUrl = _res.data
            wx.setStorageSync('imgUrl', imgUrl) //图片路径写入内存
          }
        })
      },
    })
  },

  //预览
  previewImage: function (e) {
    var that = this
    console.log(e)
    console.log(this)
    wx.previewImage({
     // current : e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.files // 需要预览的图片http链接列表
    })
  },
  bindSubmit : function(e,v){
    console.log(e)
    var that = this
    var value = e.detail.value
    //var prize_id = value.prize_id
    var prize_name = value.prize_name
    var price = value.price
    var numbers = value.numbers
    var prize_info = value.prize_info
    var imgUrl = wx.getStorageSync('imgUrl')
    var connImgUrl = urlList.imgUrl + imgUrl
    //var connImgUrl = urlList.wxImages + imgUrl
    // console.log(value)
    // console.log(connImgUrl)
    if( prize_name.length > 0  &&  price.length > 0  && numbers.length > 0 && prize_info.length > 0){
      wx.request({
        url: urlList.prizeAdd,
        method: "POST",
        data: {
          value, 
          connImgUrl,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function () { },
        fail: function () { },
        complete: function (res) {
          console.log(res.data)
          if (res.data == '添加成功') {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '添加失败',
              icon: 'none'
            })
          }

          // that.setData({
          //   items: res.data
          // })
        }
      })
    }else{
      wx.showToast({
        title : '添加失败，输入的值不能为空',
        icon : 'none',
        duration : 2000
      })
    }
   
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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