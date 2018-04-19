// pages/quiz/quiz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phrases: ["Got it!", "Cool!", "Gotcha!", "I see!", "Alright!"],
    showYesButton: [false, false, false, false, false],
    showNoButton: [false, false, false, false, false],
    toView:'',
    questions: '',
    answers: [],
    scrollTop: 0,
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')
    let data = { user_id: user.id }
    wx.request({
      // url: `https://jobify.wogengapp.cn/api/v1/question`,
      url: `http://localhost:3000/api/v1/questions`,
      method: 'PUT',
      data: data,
      success: function (res) {
        console.log(res)
        page.setData(res.data) 
      }
    })
  },

  switch1Change: function (e) {

    let question = e.currentTarget.dataset.id
    let index = this.data.questions.indexOf(question)
    console.log(question)
    console.log(index, e)
    let page = this

    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = false
    this.data.answers.push(answer)



    this.setData({
      // showNoButton: this.data.showNoButton.splice(index, 1, true),
      scrollTop: this.data.scrollTop + 480
    })
    // this.data.index++
    // console.log(this.data.showNoButton)
    // const questions = this.data.questions
    
    // for (var i = 0; i < questions.length; ++i) {
    //   if (questions[i] === this.data.toView) {
    //     this.setData({
    //       toView: questions[i + 1]
    //     })
    //     break
    //   }
    // }
  },
  switch2Change: function (e) {

    let page = this
    
    console.log('switch2', e)

    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = true
    this.data.answers.push(answer)



    this.setData({
      // showNoButton: this.data.showNoButton.splice(index, 1, true),
      scrollTop: this.data.scrollTop + 480
    })
    // this.data.index++
    // console.log(this.data.showNoButton)
    // const questions = this.data.questions

    // for (var i = 0; i < questions.length; ++i) {
    //   if (questions[i] === this.data.toView) {
    //     this.setData({
    //       toView: questions[i + 1]
    //     })
    //     break
    //   }
    // }
  },

  sendAnswers: function(e) {
    this.data.answers.forEach(function (answer) {
      wx.request({
        // url: "https://jobify.wogengapp.cn/api/v1/answers",
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