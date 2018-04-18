// pages/addjob/addjob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      { name: "outgoing", value: 'outgoing'},
      { name: 'aggressive', value: 'aggressive'},
      { name: 'assertive', value:'assertive'},
      { name: 'sociable', value:'sociable'},
      { name: 'extraverted',value:'extraverted'},
      { name: 'distant',value:'distant'},
      { name: 'non- conflicting',value:'non- conflicting'},
      { name: 'reserved',value:'reserved'},
      { name: 'loyal',value:'loyal'},
      { name: 'introverted',value:'introverted'},
      { name: 'talkative',value:'talkative'},
      { name: 'empathetic',value:'empathetic'},
      { name: 'light- hearted',value:'light- hearted'},
      { name: 'agreeable',value:'agreeable'},
      { name: 'warm- hearted',value:'warm- hearted'},
      { name: 'collaborative',value:'collaborative'},
      { name: 'independent',value:'independent'},
      { name: 'stubborn',value:'stubborn'},
      { name: 'direct' ,value:'direct'},
      { name: 'unemotional',value:'unemotional'},
      { name: 'responsible',value:'responsible'},
      { name: 'conscientious',value:'conscientious'},
      { name: 'structure- freak' ,value:'structure- freak'},
      { name: 'perfectionist',value:'perfectionist'}]
  },


  bindFormSubmit: function (e) {
    //collect data from form
    let page = this
    let new_job = e.detail.value
    console.log(new_job)
    console.log(page.data.tag_list)
    new_job.tag_list = page.data.tag_list

    wx.request({
      //url: 'https://jobify.wogengapp.cn/api/v1/jobs/',
      url: 'http://localhost:3000/api/v1/jobs/',
      method: 'POST',
      data: new_job,
      success: function () {
        wx.showToast({
          title: 'Created!',
          icon: 'success'
        })
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })

    // relaunch at index
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })


  },
  checkboxChange: function (e) {
    const page = this
    var checked = e.detail.value
    // console.log(e)
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    page.setData({tag_list: checked})
    console.log(page.data.tag_list)
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
  // listenerPickerSelected: function (e) {
  //   //改变index值，通过setData()方法重绘界面
  //   this.setData({
  //     index: e.detail.value
  //   });
  // }

  click:function(e){
    console.log(e)
  }
})