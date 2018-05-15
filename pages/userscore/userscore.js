Page({

  data: {
    loading: true,
    companyLogo: null,
    dataLoaded: false
  },
   

  toprofile: function (e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/index/index`,
    })
  },

  backtoquiz: function (e) {
    wx.navigateTo({
      url: `/pages/quiz/quiz`,
    })
  },

  continueQuiz: function (e) {
    wx.navigateTo({
      url: `/pages/quiz/quiz`,
    })
  },

  backtohome: function (e) {
    wx.reLaunch({
      url: `/pages/index/index`,
    })
  },

  newjobs: function (e) {
    wx.reLaunch({
      url: `/pages/job/job`,
    })
  },


  onLoad: function (options) {
    setTimeout(this.stopLoad, 1000)
    const page = this
    const user = wx.getStorageSync('user')
    wx.request({
      url: `https://jobify.wogengapp.cn/api/v1/users/${user.id}`,
      // url: `http://localhost:3000/api/v1/users/${user.id}`,
      success: function(res) {
        // console.log(res.data.tag_list)
        page.setData({tags: res.data.tag_list, dataLoaded: true})
        // wx.setStorageSync('user_tags', res.data.tag_list)
      }
    })
  },

  stopLoad: function(e) {
    this.setData({loading: false})
  },

  
  onReady: function () {
    this.setData({userInfo: getApp().globalData.userInfo})
  },


  onShow: function () {
    // this.setData({userInfo: })
    
  },


  onHide: function () {

  },


  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },


  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },

  // click: function (e) {
  //   console.log(e)
  // },

  redirection: function () {
    wx.reLaunch({
      url: '/pages/quiz/quiz',

    })
  }

})
