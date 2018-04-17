//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const page = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
          
          //发起网络请求
          wx.request({

            url: 'http://localhost:3000/api/v1/users/',

            //url: 'http://jobify.wogengapp.cn/api/v1/users/',
            method: "POST",
            data: {
              code: res.code
            },
            success: function(res) {
               console.log(res.data)
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('user_id', res.data.id)
              // page.globalData,setData({})
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.rawData)
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.rawData)
              this.globalData.userInfo = res.userInfo
              
              // wx.request({
              //   url: 'http://localhost:3000/api/v1/users/',
              //   method: "POST",
              //   data: {
              //     name: res.userInfo.nickName}
              //   });

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
