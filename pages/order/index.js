var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
       orderlist:[],
       status:'all',
       pageindex:1
  },
  /**
   * tab切换
   */
  handleTap: function (event) {
    var _this = this;
    var pageindex = 1;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    var status = event.currentTarget.dataset.status;
    if (status == 'all') {
         _this.setData({
           orderlist: [],
           pageindex: 1,
           status:'all'
         })
    } else if (status == 'nopayed') {
      _this.setData({
        orderlist: [],
        pageindex: 1,
        status: 'nopayed'
      })
    } else if (status == 'nosend') {
      _this.setData({
        orderlist: [],
        pageindex: 1,
        status: 'nosend'
      })
    } else if (status == 'besend'){
      _this.setData({
        orderlist: [],
        pageindex: 1,
        status: 'nosend'
      })
    } else if (status == 'finish') {
      _this.setData({
        orderlist: [],
        pageindex: 1,
        status: 'finish'
      })
    }else{
      _this.setData({
        orderlist: [],
        pageindex: 1,
        status: 'all'
      })
    }
    if (member_id) {
      this.getorderlist(member_id, status, pageindex);
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var status = this.data.status;
        var pageindex = this.data.pageindex;
        var globalData = app.globalData;
        var member_id = globalData.member_id;
        if(member_id){
          this.getorderlist(member_id, status, pageindex);
        } 
  },
  /**
   * 查看物流
   */
  deliverytap:function(event){
      var _this = this;
      var order_id = event.currentTarget.dataset.orderid;
      var imgurl = event.currentTarget.dataset.imgurl;
      wx.navigateTo({
        url: '../order/delivery?order_id=' + order_id + '&imgurl=' + imgurl
      })
  },
  /**
   * 取消订单
   */
  cancelorder:function(event){
     var _this = this;
     var order_id = event.currentTarget.dataset.orderid;
     wx.showModal({
      title: '提示',
      content: '您确定取消该订单么？',
      success: function (res) {
        if (res.confirm) {
           _this.callback_order(order_id);
        } else if (res.cancel) {
         
        }
      }
    })
  },
  /**
   * 取消订单
   */
  callback_order:function(order_id){
       var _this = this;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       wx.request({
         url: 'http://m.dapu.com/wxapplet-cancelAllorder-' + member_id + '-' + order_id + '.html',
         method: 'GET',
         header: {
           'content-type': 'application/json'
         },
         dataType: 'json',
         success: function (res) {
           var data = res.data.resmsg;
           wx.showToast({
             title: data,
             icon: 'success',
             duration: 2000
           });
           //数据初始化
           _this.setData({
             orderlist: [],
             pageindex: 1,
             status: 'all'
           })
           _this.getorderlist(member_id, "all",1);
         }
       })
  },
  /**
   * 获取订单列表
   */
  getorderlist: function (member_id,status,pageindex){
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-myorder-' + member_id + '-'+status+'-'+pageindex+'.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        var data = res.data.resmsg;
        console.log(data);
        var list = _this.data.orderlist;
        for (var i = 0; i < data.length; i++) {
          list.push(data[i]);
        }
        _this.setData({
          orderlist: list,
          status:status,
          pageindex: pageindex
        })
      }
    })
  },
  /**
   * 查看订单详情
   */
  detailtap:function(event){
      var order_id = event.currentTarget.dataset.orderid;
      wx.navigateTo({
        url: '../order/orderdetail?order_id=' + order_id
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
       var status = this.data.status;
       var pageindex = this.data.pageindex+1;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       if (member_id) {
           this.getorderlist(member_id, status, pageindex);
       } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})