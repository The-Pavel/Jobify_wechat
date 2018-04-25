// pages/job/job.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: false,
    right: false,
    activeIndex: 0,
    jobCard: false,
    saveJobBtn: false,
    indicatorDots: true,
    dataLoaded: false
  },
  

  // SWIPER

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeswiper: function (e) {
    var index = e.detail.current;//当前所在页面的 index
    if (index > this.data.activeIndex) {//左滑事件判断
      console.log(e)
      this.setData({
        left: true//若为左滑，left值为true,触发图片动画效果
      })
    } else if (index < this.data.activeIndex) {//右滑事件判断
      this.setData({
        right: true//若为右滑，right值为true,触发图片动画效果
      })
    }
    setTimeout(() => {//每滑动一次，数据发生变化
      this.setData({
        activeIndex: index,
        left: false,
        right: false
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const page = this
    const user = wx.getStorageSync('user')

    // wx.request({
    //   url: `http://localhost:3000/api/v1/users/${user.id}`,
    //   success: function (res) {
    //     console.log(res.data.tag_list)
    //     page.setData({ user_tags: res.data.tag_list })
    //   }
    // })

    // let data = { user_id: user.id }
    wx.request({
      url: `https://jobify.wogengapp.cn/api/v1/jobs`,
      // url: `http://localhost:3000/api/v1/jobs`,
      method: 'GET',
      data: {id: user.id},
      success: function (res) {
        console.log(res)
        page.setData({jobs: res.data.jobs, dataLoaded: true});

        // console.log(page.data.jobs)
        let jobs = page.data.jobs
        
        jobs = jobs.map(j => {
          j["saveJobBtn"] = false
          return j
        })

        page.setData({ jobs: jobs})
        console.log(jobs)
      }
    })
  },


  saveJob: function(e) {
    console.log(e)
    const jobId = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset)
    const page = this
    console.log(page)
     
    const user = wx.getStorageSync('user')
    let data = { job_id: jobId, user_id: user.id}
 
    wx.request({
      url: `https://jobify.wogengapp.cn/api/v1/saved_jobs`,
      // url: `http://localhost:3000/api/v1/saved_jobs`,
      method: 'POST',
      data: data,
      success: function (res) {
        // find this job in the jobs array
        let jobs = page.data.jobs
        console.log(jobs)
        let job = jobs.find(j => jobId === j.id)
        console.log(job)
        job.saveJobBtn = true

        // change job's save job btn

        page.setData({ jobs: jobs})
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // arrayMatch: function (arr1, arr2) {
  //   let ret = [];
  //   arr1.sort();
  //   arr2.sort();
  //   for (var i = 0; i < arr1.length; i += 1) {
  //     if (arr2.indexOf(arr1[i]) > -1) {
  //       ret.push(arr1[i]);
  //     }
  //   }
  //   console.log(ret);
  // },

  onReady: function () {
    // tag list comparison
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      saveJobBtn: false;
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

  
})