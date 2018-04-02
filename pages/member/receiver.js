var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    receiver: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    if (member_id) {
         this.getreceiver(member_id);
    }
  },
  /**
   * 获取地址列表
   */
  getreceiver: function (member_id){
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-receiver-' + member_id + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        _this.setData({
          receiver: data
        })
      }
    })
  },
  /**
   * 设置默认地址
   */
  defaddrtap:function(event){
    var _this = this;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    var addr_id = event.currentTarget.dataset.addrid;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-set_default-' + member_id + '-' + addr_id+'.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        _this.getreceiver(member_id);
      }
    })
  },
  /**
   * 添加收货地址
   */
  addtap:function(){
    wx.navigateTo({
      url: '../member/addreceiver'
    })
  },
  /**
   * 编辑地址
   */
  edittap: function (event){
    var addr_id = event.currentTarget.dataset.addrid;
    wx.navigateTo({
      url: '../member/editreceiver?addrid=' + addr_id
    })
  },
  /**
   * 删除地址
   */
  deletetap: function (event){
    var _this = this;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    var addr_id = event.currentTarget.dataset.addrid;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-del_rec-' + member_id + '-' + addr_id + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.getreceiver(member_id);
      }
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