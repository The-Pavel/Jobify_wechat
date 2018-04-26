// pages/singlejob/singlejob.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  showJd: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.showLoading({
      title: 'Loading',
      duration: 1000
    })
    wx.getImageInfo({
      src: `${e.currentTarget.dataset.id}`,
      success: function (ret) {
        const path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log(result)
            wx.showToast({
              title: 'Saved!',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this;
    page.setData({ user_id: wx.getStorageSync('user').id, option: options.id })
    
    
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
    
    let page = this;
    

    wx.request({
      // url: `http://localhost:3000/api/v1/jobs/${id}`,
      url: `https://jobify.wogengapp.cn/api/v1/jobs/${page.data.option}`,
      success: function (res) {
        console.log(res.data)
        page.setData({ job: res.data });
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  editJob: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`,
    })

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