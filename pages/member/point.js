var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      pointinfo:[],
      usage_point:0,
      pageindex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var _this = this;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       var usage_point = options.point;
       if (member_id){
         wx.request({
           url: 'http://m.dapu.com/wxapplet-myPoint-' + member_id + '.html',
           method: 'GET',
           header: {
             'content-type': 'application/json'
           },
           success: function (res) {
             const data = res.data.resmsg;
             _this.setData({
               pointinfo: data,
               usage_point: usage_point,
               pageindex: _this.data.pageindex+1
             })
           }
         })
       }
  },
  /**
   * 兑换优惠券
   */
  exchangetap:function(){
      wx.navigateTo({
           url: '../member/coupon'
      })
  },
  /**
   * 使用帮助
   */
  usehelp:function(){
     var target = "https://m.dapu.com/marticle-help-score.html";
      wx.navigateTo({
          url: '../about/template?url=' + target
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
        var _this = this;
        var globalData = app.globalData;
        var member_id = globalData.member_id;
        var pageindex = _this.data.pageindex;
        if (member_id){
          wx.request({
            url: 'http://m.dapu.com/wxapplet-myPoint-' + member_id + '-' + pageindex+'.html',
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              const data = res.data.resmsg;
              var list = _this.data.pointinfo;
              for (var i = 0; i < data.length; i++) {
                   list.push(data[i]);     
              }
              _this.setData({
                pointinfo: list,
                pageindex: _this.data.pageindex + 1
              })
            }
          }) 
        }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})