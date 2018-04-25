// pages/quiz/quiz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phrases: ["Got it!", "Cool!", "Gotcha!", "I see!", "Alright!"],
    toView:'',
    questions: '',
    answers: [],
    scrollTop: 0,
    index: 0,
    count: 0,
    sending: false,
    dataLoaded: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')
    let data = { user_id: user.id }

    console.log(data);

    wx.request({
       url: `https://jobify.wogengapp.cn/api/v1/questions`,
      //  url: `http://localhost:3000/api/v1/questions`,
      method: 'GET',
      data: data,
      success: function (res) {
        console.log(res)
        page.setData({questions: res.data.questions, dataLoaded: true}) 

        // console.log(res.data)
       
        let questions = page.data.questions
        // console.log(page.data.questions)

        questions = questions.map(j => {
          j["showNoBtn"] = false
          j["showYesBtn"] = false
          return j
        })

        page.setData({ questions: questions })


      }
    })
  },

  switch1Change: function (e) {

    let questionId = e.currentTarget.dataset.id
    let index = this.data.questions.indexOf(questionId)
    console.log(questionId)
    console.log(index, e)
    let page = this

    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = false
    this.data.answers.push(answer)

    // find this question in the questions array
    let questions = page.data.questions
    console.log(questions)
    let question = questions.find(j => questionId === j.id)
    console.log(question)
    question.showNoBtn = true

    // change question's save question btn

    page.setData({ questions: questions })

    console.log(page.data)

    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        const offset = res.screenWidth / 750 * 460 * 2;
        console.log(offset);
        this.setData({
          scrollTop: this.data.scrollTop + offset
        })
      }
    })
 
    page.data.count++
    if (page.data.count == page.data.questions.length) {
      wx.showToast({
        title: 'Done!',
        image: '../../image/newjobs_active.png'
      })
    }
  },
  switch2Change: function (e) {

    let questionId = e.currentTarget.dataset.id
    let index = this.data.questions.indexOf(questionId)
    console.log(questionId)
    console.log(index, e)
    let page = this

    console.log('switch2', e)

    let answer = {}
    let user = wx.getStorageSync('user')
    answer.user_id = user.id
    answer.question_id = e.currentTarget.dataset.id
    answer.swiped_yes = true
    this.data.answers.push(answer)

    // find this question in the questions array
    let questions = page.data.questions
    console.log(questions)
    let question = questions.find(j => questionId === j.id)
    console.log(question)
    question.showYesBtn = true

    // change question's save question btn

    page.setData({ questions: questions })

    console.log(page.data)

    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        const offset = res.screenWidth / 750 * 460 * 2;
        console.log(offset);
        this.setData({
          scrollTop: this.data.scrollTop + offset
        })
      }
    }) 

    page.data.count++
    if (page.data.count == page.data.questions.length) {
      wx.showToast({
        title: 'Done!',
        image: '../../image/newjobs_active.png'
      })
    }
  },

  sendAnswers: function(e) {
    setTimeout(this.changeSending, 5000)
    this.data.answers.forEach(function (answer) {
      wx.request({
        url: "https://jobify.wogengapp.cn/api/v1/answers/",
        // url: 'http://localhost:3000/api/v1/answers/',
        method: 'POST',
        data: answer,
        success: function(res) {
          wx.reLaunch({
            url: '/pages/userscore/userscore',
          })
        }
      })
    });

  },

  changeSending: function() {
    this.setData({sending: true})
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
  redirection: function(){
    wx.reLaunch({
      url: '/pages/index/index',

    })
  }
})