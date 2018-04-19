//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
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


  postedjobs: function (e) {
    wx.navigateTo({
      url: `/pages/postedjobs/postedjobs`,
    })
  },

  personality: function (e) {
    wx.navigateTo({
      url: `/pages/userscore/userscore`,
    })
  },

  takequiz: function (e) {
    wx.navigateTo({
      url: `/pages/quiz/quiz`,
    })
  },

  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    const app = getApp()
    that.setData({ userInfo: app.globalData.userInfo})
    
  }

})
