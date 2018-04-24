// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  /**
   * 生命周期函数--监听页面加载
   */
  // when onload, get load job
  onLoad: function (options) {
    let page = this;
    page.setData({id: options.id})
    wx.showToast({
      title: 'Loading...',
      icon: 'loading',
      duration: 1500
    });
    wx.request({

      url: `https://jobify.wogengapp.cn/api/v1/jobs/${page.data.id}`,
      // url: `http://localhost:3000/api/v1/jobs/${options.id}`,

      method: 'GET',
      success(res) {
        // console.log(res)
        var job = res.data;

        // Update local data
        page.setData(
          job
        );
        console.log(job)
        wx.hideToast();
      }
    });
  },
  // this is for the tag
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
    page.setData({ tag_list: checked })
    console.log(page.data.tag_list)
  },
// after edit, upload the form back to the server 
  bindSubmit: function (e) {
    //collect data from form
    let page = this
    let new_job = e.detail.value
    let user = wx.getStorageSync('user')
  
  
    // new_job.id = page.job.id
    new_job.tag_list = page.data.tag_list
    new_job.user_id = user.id
    new_job.image = page.data.image
    new_job.attachment = page.data.attachment


    wx.request({
      url: `https://jobify.wogengapp.cn/api/v1/jobs/${page.data.id}`,
      // url: 'http://localhost:3000/api/v1/jobs/?={{new_job.id}}',
      method: 'PUT',
      data: new_job,
      success: function () {
        wx.showToast({    
          title: 'Updated!',
          icon: 'success'
        })
        wx.reLaunch({
          url: '/pages/postedjobs/postedjobs',
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

  uploadDesc: function () {
    var that = this
    wx.chooseImage({
      success: function (data) {
        const tempFiles = data.tempFilePaths[0]
        const file = new AV.File("company", {
          blob: {
            uri: tempFiles
          }
        })
        file.save()
          .then(savedFile => {
            const companyLogo = savedFile.attributes.url
            // console.log('hello ' + companyLogo)
            that.setData({ attachment: companyLogo })
          })
          .catch(err => {
            console.error(err)
          })
      }
    })
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
