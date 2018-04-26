// pages/edit/edit.js

const AV = require('../../utils/av-weapp-min.js')

const checkboxItems = require('../../utils/checkboxItems.js')

    
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: checkboxItems
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // when onload, get load job
  onLoad: function (options) {
    let page = this;
    console.log(options)
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
        var job = res.data;
        const tags = job.tag_list

        // Update local data
        page.setData(
          job
        );
        wx.hideToast();
      }
    });
    // console.log("selected tags outside of API", )
  },
  // this is for the tag
  checkboxChange: function (e) {
    const page = this
    var checked = e.detail.value
    console.log('checked:', checked)
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    console.log("page.data:", page.data)
    this.setData(changed)
    if (e.detail.value.length == 6) {
      wx.showModal({
        title: 'STOP',
        content: 'Please only choose 5 tags',
        confirmText: "Ok",
        showCancel: false,
        success: function (res) {
          console.log('success')
        }
      })
    }
    page.setData({ tag_list: checked })
    console.log('Selected tags', page.data.tag_list)
  },
// after edit, upload the form back to the server 
  bindSubmit: function (e) {
    //collect data from form
    console.log(e.detail.value)
    let page = this
    let user = wx.getStorageSync('user')
    let new_job = e.detail.value
    console.log(new_job)

    new_job.tag_list = page.data.tag_list
    new_job.user_id = user.id
    new_job.image = page.data.image
    new_job.attachment = page.data.attachment

    if (new_job.email.length === 0 || new_job.company.length === 0 || new_job.title.length === 0 || (new_job.description.length < 20 || new_job.description.length > 300)) {
      wx.showToast({
        title: 'Error!',
        image: '/image/warning.png'
      })
    } else {

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
        wx.navigateBack({
          
        })
      }
    })
  }
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
  uploadlogo: function () {
    var that = this
    wx.chooseImage({
      success: function (data) {
        wx.showToast({
          title: 'Success',
          icon: "success"
        })
        const tempFiles = data.tempFilePaths[0]
        const file = new AV.File("company", {
          blob: {
            uri: tempFiles
          }
        })
        file.save()
          .then(savedFile => {
            const companyLogo = savedFile.attributes.url
            console.log('hello ' + companyLogo)
            that.setData({ image: companyLogo })
          })
          .catch(err => {
            console.error(err)
          })
      }
    })
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
