// pages/quiz/quiz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    questions: '',
    answers: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')
    let data = { user_id: user.id, id: user.id }
    wx.request({
      url: `http://localhost:3000/api/v1/questions`,
      method: 'PUT',
      data: data,
      success: function (res) {
        page.setData(res.data)
      }
    })
  },

  switch1Change: function (e) {
    console.log('switch1', e)
    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = false
    this.data.answers.push(answer)
  },
  switch2Change: function (e) {
    console.log('switch2', e)
    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = true
    this.data.answers.push(answer)
  },

  sendAnswers: function(e) {
    this.data.answers.forEach(function (answer) {
      wx.request({
        url: 'http://localhost:3000/api/v1/answers/',
        method: 'POST',
        data: answer,
        success: function(res) {
          wx.navigateTo({
            url: '/pages/userscore/userscore',
          })
        }
      })
    });

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