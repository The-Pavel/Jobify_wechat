Page({

  data: {
    companyLogo: null,
    checkboxItems: [
      { name: "outgoing", value: 'outgoing' },
      { name: 'aggressive', value: 'aggressive' },
      { name: 'assertive', value: 'assertive' },
      { name: 'sociable', value: 'sociable' },
      { name: 'extraverted', value: 'extraverted' },
      { name: 'distant', value: 'distant' },
      { name: 'non- conflicting', value: 'non- conflicting' },
      { name: 'reserved', value: 'reserved' },
      { name: 'loyal', value: 'loyal' },
      { name: 'introverted', value: 'introverted' },
      { name: 'talkative', value: 'talkative' },
      { name: 'empathetic', value: 'empathetic' },
      { name: 'light- hearted', value: 'light- hearted' },
      { name: 'agreeable', value: 'agreeable' },
      { name: 'warm- hearted', value: 'warm- hearted' },
      { name: 'collaborative', value: 'collaborative' },
      { name: 'independent', value: 'independent' },
      { name: 'stubborn', value: 'stubborn' },
      { name: 'direct', value: 'direct' },
      { name: 'unemotional', value: 'unemotional' },
      { name: 'responsible', value: 'responsible' },
      { name: 'conscientious', value: 'conscientious' },
      { name: 'structure- freak', value: 'structure- freak' },
      { name: 'perfectionist', value: 'perfectionist' }]
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

  newjobs: function (e) {
    wx.navigateTo({
      url: `/pages/job/job`,
    })
  },


  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')
    wx.request({
      // url: `http://jobify.wogengapp.cn/api/v1/users/${user.id}`,
      url: `http://localhost:3000/api/v1/users/${user.id}`,
      success: function(res) {
        console.log(res)
        page.setData({tags: res.data.tag_list})
      }
    })
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
  // listenerPickerSelected: function (e) {
  //   //改变index值，通过setData()方法重绘界面
  //   this.setData({
  //     index: e.detail.value
  //   });
  // }

  click: function (e) {
    console.log(e)
  },

})
