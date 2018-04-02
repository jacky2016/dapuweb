Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    order_id: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var _this =this;
       var order_id = options.order_id;
       console.log(order_id);
       wx.request({
         url: 'http://m.dapu.com/wxapplet-orderdetail-'+ order_id + '.html',
         method: 'GET',
         header: {
           'content-type': 'application/json'
         },
         dataType: 'json',
         success: function (res) {
           var data = res.data.resmsg;
           console.log(data.order);
           //数据初始化
           _this.setData({
             detail: data.order,
             order_id: order_id
           })
         }
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