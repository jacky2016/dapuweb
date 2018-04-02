var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    if (member_id) {
      wx.request({
        url: 'http://m.dapu.com/wxapplet-mynews-' + member_id + '.html',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          const data = res.data.resmsg;
          _this.setData({
            comments: data
          });
        }
      })
    }
  },
  /**
   * 更新未读消息
   */
  updatestatus: function (event) {
    var commentid = event.currentTarget.dataset.commentid;
    console.log(commentid);
    wx.request({
      url: 'http://m.dapu.com/wxapplet-update_newstatus-' + commentid + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

      }
    })
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

  }
})