Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '类目',
    classify: [],
    products: [],
    color: "color:rgb(177, 85, 80);border-botton: 3px solid rgb(177, 85, 80);",
    hover: "color:#000;border-botton: 0px solid #fff;",
    cateid: 0
  },
  handleTap: function (event) {
    var _this = this;
    var cateid = event.currentTarget.dataset.cateid;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-menu_cate-' + cateid + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        _this.setData({
          products: data.products,
          cateid: cateid
        })
      }
    })
  },
  /**
   * 点击查看商品详情
   */
  productdetail: function (event) {
    var goodsid = event.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../product/index?goodsid=' + goodsid
    })
  },
  /**
   * 返回上一页
   */
  goback: function () {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var _this = this;
    var parentid = option.parentid;
    var cateid = option.cateid;
    var catename = option.catename;
    console.log(cateid);
    wx.setNavigationBarTitle({
      title: catename
    })
    wx.request({
      url: 'http://m.dapu.com/wxapplet-gallery_item-' + parentid + '-' + cateid + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        const data = res.data.resmsg;
        console.log(data);
        _this.setData({
          text: catename,
          classify: data.catelist,
          products: data.products,
          cateid: cateid
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: ''
    }
  }
})