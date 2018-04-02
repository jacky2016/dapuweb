var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    giftcards: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 添加礼品卡
   */
  formSubmit:function(e){
      var data = e.detail.value;
      var code = data.sub_card_code;
      var pwd = data.sub_card_pwd;
      if (code ==''||code.length==0){
        wx.showToast({
          title: "请输入卡号",
          icon: 'success',
          duration: 2000
        })
        return;
      }
      if(pwd == ''||pwd.length==0){
        wx.showToast({
          title: "请输入密码",
          icon: 'success',
          duration: 2000
        })
        return;
      }
      var _this = this;
      var globalData = app.globalData;
      var member_id = globalData.member_id;
      if (member_id){
        wx.request({
          url: 'http://m.dapu.com/wxapplet-bingGiftcard.html',
          data: {
            'member_id': member_id,
            'sub_card_code': code,
            'sub_card_pwd': pwd
          },
          method: 'POST',
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            var data = res.data.resmsg;
            wx.showToast({
              title: data,
              icon: 'success',
              duration: 2000
            });
            wx.navigateTo({
              url: '../member/giftcard'
            })
          }
        })
      }
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