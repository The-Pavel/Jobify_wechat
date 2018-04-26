// pages/addjob/addjob.js
const AV = require('../../utils/av-weapp-min.js')
const checkboxItems = require('../../utils/checkboxItems.js')

Page({

  data: {
    companyLogo: null,
    checkboxItems: checkboxItems
  },


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
 

    if (new_job.email.length === 0 || new_job.company.length === 0 || new_job.title.length === 0 || (new_job.tag_list.length < 1 || new_job.tag_list.length > 5) || (new_job.description.length < 20 || new_job.description.length > 300)) {
      wx.showToast({
        title: 'Error!',
        image: '/image/warning.png'
      })
    } else {
      
      //     debugger

     


      wx.request({
        url: 'https://jobify.wogengapp.cn/api/v1/jobs/',
        // url: 'http://localhost:3000/api/v1/jobs/',
        method: 'POST',
        data: new_job,
        success: function (res) {
          wx.showToast({
            title: 'Created!',
            icon: 'success',
            duration: 2000
          })
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
}
    
    // relaunch at index
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
  },
  checkboxChange: function (e) {
    const page = this
    var checked = e.detail.value
    console.log('e', e)
    console.log('checked', checked)
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
    page.setData({tag_list: checked})
    console.log("What's being logged>", page.data.tag_list)
    if (page.data.tag_list.length == 5) {
      console.log("HOLD YOUR HORSES")
    console.log('e.length', e.detail.value.length)
      
    }
  },

  onLoad: function (options) {

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

  click:function(e){
    console.log(e)
  },

  uploadlogo: function() {
    var that = this
    wx.chooseImage({
      success: function(data){
        wx.showToast({
          title: 'Success',
          icon: "success"
        })
        const tempFiles = data.tempFilePaths[0]
        const file = new AV.File("company", {
          blob: {
            uri:tempFiles
          }
        })
      file.save()
        .then(savedFile => {
         const companyLogo = savedFile.attributes.url
         console.log('hello ' + companyLogo)
         that.setData({image: companyLogo})
        })
        .catch(err => {
          console.error(err)
        })
      }
    })
  },

  uploadDesc: function() {
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

            console.log('hello ' + companyLogo)
       
            that.setData({ attachment: companyLogo })

          })
          .catch(err => {
            console.error(err)
          })
      }
    })
  }


})
