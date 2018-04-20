const AV = require('./utils/av-weapp-min.js')
const keys = require('./secret_keys.js')

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const page = this

    // call my own function
    this.initleancloud()
    const app = this


    // 登录
    wx.login({
      success: function (res) {
          wx.getUserInfo({
            success: res => {
              // console.log(res.userInfo)
              // 可以将 res 发送给后台解码出 unionId
              getApp().globalData.userInfo = res.userInfo
              console.log(getApp().globalData.userInfo)
            }
          })

        if (res.code) {

          wx.request({

            //  url: 'http://localhost:3000/api/v1/users/',



            //  url: 'http://e-charge.herokuapp.com/api/v1/users/',
            // method: "POST",


            url: 'https://jobify.wogengapp.cn/api/v1/users',
            method: "POST",

              data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              wx.setStorageSync('openid', res.data.openid)
              wx.setStorageSync('user_id', res.data.id)
              wx.setStorageSync('user', res.data)

              // page.globalData,setData({})
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息

  },

  // initialize lean cloud and call it in global data
  initleancloud() {
    AV.init({
    appId: keys.appId,
    appKey: keys.appKey
    })
    this.globalData.AV = AV
  },


  //   // 展示本地存储能力
  //   const page = this
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   wx.login({
  //     success: function (res) {
  //       if (res.code) {
  //         console.log(res.code)

  //         //发起网络请求
  //         wx.request({

  //           url: 'http://localhost:3000/api/v1/users/',

  //           // url: 'http://e-charge.herokuapp.com/api/v1/users/',
  //           method: "POST",
  //           data: {
  //             code: res.code
  //           },
  //           success: function (res) {
  //             console.log(res.data)
  //             wx.setStorageSync('openid', res.data.openid)
  //             wx.setStorageSync('user_id', res.data.id)
  //             wx.getSetting({
  //               success: res => {
  //                 console.log(res)
  //                 if (res.authSetting['scope.userInfo']) {
  //                   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //                   wx.getUserInfo({
  //                     success: res => {
  //                       console.log(res)
  //                       // 可以将 res 发送给后台解码出 unionId
  //                       this.globalData.userInfo = res.userInfo


  //                     }
  //                   })
  //                 }
  //               }
  //             })
  //             // page.globalData,setData({})
  //           }
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  //   // 获取用户信息

  // },


  globalData: {
    userInfo: null,
    AV: null
  }

})
