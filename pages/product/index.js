// pages/product/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
       title:"产品详情",
       images:[],
       detail:[],
       productspec:[],
       goodsid:0,
       cartnum:0,
       discuss:[]
  },
  /**
   * 查看商品详情
   */
  detailtap:function(event){
    var goodsid = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../product/detail?goodsid=' + goodsid
    })
  },
  /**
   * 查看商品全部评论
   */
  discusstap:function(event){
    var goodsid = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../discuss/index?goodsid=' + goodsid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var _this = this;
    var goodsid = option.goodsid;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-product-' + goodsid + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          const data = res.data.resmsg;
          wx.setNavigationBarTitle({
              title: data.name
          });
          console.log(data);
          _this.setData({
              title:data.name,
              images:data.images,
              goodsid:goodsid,
              detail:data,
              discuss: data.discuss
          })
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
    wx.navigateTo({
      url: '../product/detail?goodsid=' + this.data.goodsid+'&title='+this.data.title
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})