var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
         giftcards:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var _this = this;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       if (member_id){
         wx.request({
           url: 'http://m.dapu.com/wxapplet-myGiftcard-' + member_id +'.html',
           method: 'GET',
           header: {
             'content-type': 'application/json'
           },
           success: function (res) {
             const data = res.data.resmsg;
             console.log(data);
             _this.setData({
               giftcards: data
             })
           }
         })
       }
  },
  /**
   * 添加礼品卡
   */
  addtap:function(){
     wx.navigateTo({
           url: '../member/addgiftcard'
     })
  },
  /**
   * 礼品卡使用说明
   */
  useinfotap:function(){
    var target = "http://m.dapu.com/marticle-help-giftcard.html";
    wx.navigateTo({
      url: '../about/template?url=' + target
    })
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