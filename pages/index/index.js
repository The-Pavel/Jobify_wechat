//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: ''
    
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  postjob: function (e) {
    wx.navigateTo({
      url:`/pages/addjob/addjob`,
    })
  },


  savedjobs: function (e) {
    wx.navigateTo({
      url: `/pages/savedjob/savedjob`,
    })
  },

  newjobs: function (e) {
    wx.navigateTo({
      url: `/pages/job/job`,
    })
  },

  takequiz: function (e) {
    wx.navigateTo({
      url: `/pages/quiz/quiz`,
    })
  },

  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function (userInfo) {
  //     //更新数据
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //   })
  // }

})
