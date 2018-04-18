// pages/job/job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')
    wx.request({
      url: `http://localhost:3000/api/v1/users/${user.id}`,
      success: function (res) {
        console.log(res.data)
        page.setData({ user_tags: res.data.tag_list })
      }
    })
    let data = { user_id: user.id, id: user.id }
    wx.request({
      url: `http://localhost:3000/api/v1/jobs`,
      method: 'PUT',
      data: data,
      success: function (res) {
        page.setData(res.data)
      }
    })
  },

  saveJob: function(e) {
    const job = e.currentTarget.dataset.id
    const page = this
    const user = wx.getStorageSync('user')
    let data = {job_id: job, user_id: user.id}
    wx.request({
      url: `http://localhost:3000/api/v1/users/${user.id}`,
      method: 'PUT',
      data: data,
      success: function (res) {
        wx.reLaunch({
          url: '/pages/job/job',
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