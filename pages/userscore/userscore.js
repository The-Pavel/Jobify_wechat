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
      { name: 'non- conflicting', value: 'non-conflicting' },
      { name: 'reserved', value: 'reserved' },
      { name: 'loyal', value: 'loyal' },
      { name: 'introverted', value: 'introverted' },
      { name: 'talkative', value: 'talkative' },
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
      { name: 'perfectionist', value: 'perfectionist' }]
  },


  // bindSubmit: function (e) {
  //   //collect data from form
  //   let page = this
  //   let new_job = e.detail.value
  //   let user = wx.getStorageSync('user')
  //   //     debugger

  //   console.log(new_job)
  //   console.log(page.data.tag_list)
  //   new_job.tag_list = page.data.tag_list
  //   new_job.user_id = user.id


  //   wx.request({
  //     //url: 'https://jobify.wogengapp.cn/api/v1/jobs/',
  //     url: 'http://localhost:3000/api/v1/jobs/',
  //     method: 'POST',
  //     data: new_job,
  //     success: function () {
  //       wx.showToast({
  //         title: 'Created!',
  //         icon: 'success'
  //       })
  //       wx.reLaunch({
  //         url: '/pages/index/index',
  //       })
  //     }
  //   })

    // relaunch at index
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })


  // },
  // checkboxChange: function (e) {
  //   const page = this
  //   var checked = e.detail.value
  //   // console.log(e)
  //   var changed = {}
  //   for (var i = 0; i < this.data.checkboxItems.length; i++) {
  //     if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
  //       changed['checkboxItems[' + i + '].checked'] = true
  //     } else {
  //       changed['checkboxItems[' + i + '].checked'] = false
  //     }
  //   }
  //   this.setData(changed)
  //   page.setData({ tag_list: checked })
  //   console.log(page.data.tag_list)
  // },

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

  },


  onShow: function () {

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
