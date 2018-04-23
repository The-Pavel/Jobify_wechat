Page({

  data: {
    loading: true,
    companyLogo: null,
    checkboxItems: [
      { name: "outgoing", value: 'outgoing' },
      { name: 'aggressive', value: 'aggressive' },
      { name: 'assertive', value: 'assertive' },
      { name: 'sociable', value: 'sociable' },
      { name: 'extraverted', value: 'extraverted' },
      { name: 'distant', value: 'distant' },
      {name: 'talkative', value:'talkative'},
      { name: 'empathetic', value: 'empathetic' },
      { name: 'light- hearted', value: 'light-hearted' },
      { name: 'agreeable', value: 'agreeable' },
      { name: 'warm- hearted', value: 'warm-hearted' },
      { name: 'collaborative', value: 'collaborative' },
      { name: 'independent', value: 'independent' },
      { name: 'stubborn', value: 'stubborn' },
      { name: 'direct', value: 'direct' },
      { name: 'unemotional', value: 'unemotional' },
      { name: 'responsible', value: 'responsible' },
      { name: 'conscientious', value: 'conscientious' },
      { name: 'structure- freak', value: 'structure-freak' },
      { name: 'non- conflicting', value: 'non-conflicting' }]

  },
   

  toprofile: function (e) {
    console.log(e)
    wx.reLaunch({
      url: `/pages/index/index`,
    })
  },

  backtoquiz: function (e) {
    wx.reLaunch({
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
    setTimeout(this.stopLoad, 3000)
    const page = this
    const user = wx.getStorageSync('user')
    wx.request({
      url: `http://jobify.wogengapp.cn/api/v1/users/${user.id}`,
      // url: `http://localhost:3000/api/v1/users/${user.id}`,
      success: function(res) {
        console.log(res)
        page.setData({tags: res.data.tag_list})
        wx.setStorageSync('user_tags', res.data.tag_list)
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

})
