var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      comment:[],
      nodiscuss:[],
      status:1,
      pageindex:1
  },
  /**
   * tab切换
   */
  handleTap:function(event){
     var pageindex = this.data.pageindex;
     var globalData = app.globalData;
     var member_id = globalData.member_id;
     var status = event.currentTarget.dataset.status;
     if(status == 0) {
       this.setData({
         comment: [],
         nodiscuss:[],
         status: 0,
         pageindex: 1
       });
         this.myNoDiscuss(member_id, status);
     } else if (status == 1){
       this.setData({
         comment: [],
         nodiscuss: [],
         status: 1,
         pageindex: 1
       });
       this.getcommentlist(member_id, pageindex, status); 
     }else{
       this.setData({
         comment: [],
         nodiscuss: [],
         status: 1,
         pageindex: 1
       });
       this.getcommentlist(member_id, pageindex, status);  
     }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       var pageindex = this.data.pageindex;
       var status = this.data.status;
       var globalData = app.globalData;
       var member_id = globalData.member_id;
       if(member_id) {
         this.getcommentlist(member_id, pageindex, status);
       }
  },
/**
 * 获取已评论列表
 */
  getcommentlist: function (member_id, pageindex, status) {
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-myDiscuss-' + member_id + '-' + pageindex + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        var data = res.data.resmsg;
        var list = _this.data.comment;
        for (var i = 0; i < data.length; i++) {
          list.push(data[i]);
        }
        _this.setData({
          comment: list,
          pageindex: pageindex+1,
          status: status
        })
      }
    })
  },
  /**
   * 获取未评论列表
   */
  myNoDiscuss: function (member_id,status){
    var _this = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-myNoDiscuss-' + member_id + '.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        var data = res.data.resmsg;
        console.log(data);
        _this.setData({
          nodiscuss: data,
          status: status
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
    var pageindex = this.data.pageindex;
    var globalData = app.globalData;
    var member_id = globalData.member_id;
    if (member_id) {
      this.getcommentlist(member_id, pageindex);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})