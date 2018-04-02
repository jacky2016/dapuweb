var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
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
         url: 'http://m.dapu.com/wxapplet-memberinfo-' + member_id + '.html',
         method: 'GET',
         header: {
           'content-type': 'application/json'
         },
         success: function (res) {
           const data = res.data.resmsg;
           console.log(data)
           _this.setData({
             userInfo:data
           })
         }
       })
     }
  },
/**
 * 我的订单
 */
  myorders:function(event){
    wx.navigateTo({
       url: '../order/index'
    })
  },
  /**
   * 我的评论
   */
  mycomment: function (event){
     wx.navigateTo({
        url: '../member/comment'
     })
  },
/**
 * 我的消息
 */
  mymsg: function (event){
       wx.navigateTo({
         url: '../member/message'
       })
  },
  /**
   * 我的积分
   */
  mycores:function(event){
    var point = event.currentTarget.dataset.point;
    wx.navigateTo({
      url: '../member/point?point=' + point
     })
  },
  /**
   * 我的优惠券
   */
  mycoupon:function(){
     wx.navigateTo({
         url: '../member/coupon'
     })
  },
  /**
   * 我的礼品卡
   */
  mygiftcard:function(){
     wx.navigateTo({
           url: '../member/giftcard'
     })
  },
  /**
   * 我的地址
   */
  myaddress:function(){
     wx.navigateTo({
            url: '../member/receiver'
     })
  },
  /**
   * 关于大朴
   */
  aboutdapu:function(){
       wx.navigateTo({
           url: '../about/index'
       })
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