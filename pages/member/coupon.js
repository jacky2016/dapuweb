var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],
    status:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pageindex = 1;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    if (member_id) {
       this.getuseable(member_id, pageindex, this.data.status);
    }
  },
  /**
   * 获取可用优惠券列表
   */
  getuseable: function (member_id, pageindex, status){
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-useable_coupon-' + member_id + '-' + pageindex+'.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        console.log(data);
        _this.setData({
            coupons: data,
            status: status
        })
      }
    })
  },
  /**
   * 获取不可用优惠券列表
   */
  getunuseable: function (member_id, pageindex, status) {
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-unuseable_coupon-' + member_id + '-' + pageindex + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        console.log(data);
        _this.setData({
          coupons: data,
          status: status
        })
      }
    })
  },
  /**
   * 获取可兑换优惠券列表
   */
  getexchange: function (status) {
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-exchange.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        console.log(data);
        _this.setData({
          coupons: data,
          status: status
        })
      }
    })
  },
  /**
   * tab切换 status：1 可用 0 不可用 2 可兑换
   */
  handleTap:function(event){
       var _this = this;
       var pageindex = 1;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       var status = event.currentTarget.dataset.status;
       if(status ==0){
            this.getunuseable(member_id, pageindex, status);
       }else if(status == 1){
            this.getuseable(member_id, pageindex, status);
       } else if (status == 2){
            this.getexchange( status);
       }else{
           this.getunuseable(member_id, pageindex, 0);
       }
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