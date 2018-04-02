Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    title: '商品详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var goodsid = options.goodsid;
    var title = options.title;
    this.setData({
      url: "https://m.dapu.com/openapi/cellphone/api?method=goods.productIntroHtml&goodsId=" + goodsid
    })
    wx.setNavigationBarTitle({
      title: title
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