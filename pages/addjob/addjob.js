// pages/addjob/addjob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },


  bindSubmit: function (e) {
    //collect data from form
    let new_job = e.detail.value

    wx.request({
      //url: 'http://jobify.wogengapp.cn/api/v1/jobs/',
      url: 'http://localhost:3000/api/v1/jobs/',
      method: 'POST',
      data: new_job,
      success: function () {
        wx.showToast({
          title: 'Done!',
          icon: 'success'
        })
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })

    // relaunch at index
    wx.reLaunch({
      url: '/pages/index/index'
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
  
  },
  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: e.detail.value
    });
  }
})