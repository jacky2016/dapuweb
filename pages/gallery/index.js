Page({
    /**
     * 页面的初始数据
     */
    data: {
          text: '类目',
          classify: [],
          gallery: "",
          imgUrl: "",
          cates: [],
          currentindex: 0,
          color: "color:rgb(177, 85, 80);border-left: 3px solid rgb(177, 85, 80);",
          hover:"color:#000;border-left: 0px solid #fff;"
    },
    changetab: function (event){
        var _this = this;
        var index = event.currentTarget.dataset.item;
        wx.getStorage({
            key: 'gallery',
            success: function (res) {
                 var data = res.data;
                 _this.setData({
                    classify: data,
                    gallery: data[index].name,
                    imgUrl: data[index].imgUrl,
                    cates: data[index].child_cate,
                    currentindex: index
                 })
            }
        })
    },
    galleryitem:function(event){
          var  _this = this;
          var parentid = event.currentTarget.dataset.parentid;
          var cateid = event.currentTarget.dataset.cateid;
          var catename = event.currentTarget.dataset.catename;
          wx.navigateTo({
            url: '../gallery/gallery?parentid=' + parentid + '&cateid=' + cateid + '&catename=' + catename
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.request({
          url: 'http://m.dapu.com/wxapplet-gallery.html',
          method: 'GET',
          header: {
               'content-type': 'application/json'
          },
          success: function (res) {
                const data = res.data.resmsg;
                wx.setStorage({
                  key: "gallery",
                  data: data
                });
                _this.setData({
                    classify: data,
                    gallery: data[0].name,
                    imgUrl: data[0].imgUrl,
                    cates: data[0].child_cate,
                    currentindex:0
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
      return {
        title: '自定义转发标题',
        path: ''
      }
    }
})