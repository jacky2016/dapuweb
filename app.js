//app.js
App({
  onLaunch: function () {
    var _this = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'http://m.dapu.com/wxapplet-weixin_login-' + res.code+'.html',
            success:function(res){
                console.log(res.data.resmsg);
                var data = res.data.resmsg;
                _this.globalData = data;
            }
          })
        } else {
             console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    userInfo: null
  }
})