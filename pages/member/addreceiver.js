var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    regionlist: [],
    regionArr:[],
    citylist: [],
    cityArr: [],
    countrylist: [],
    multiArray: [],
    multiIndex: [0,0,0],
    region_id:0
  },
  /**
   * 保存地址
   */
  formSubmit:function(e){
      var data = e.detail.value;
      var ship_name = data.ship_name;
      if (ship_name == '' || ship_name.length==0){
        wx.showToast({
          title: "请填写收货人",
          icon: 'success',
          duration: 2000
        })
        return;
      }
      var ship_mobile = data.ship_mobile;
      if (ship_mobile == '' || ship_mobile.length == 0) {
        wx.showToast({
          title: "请填写联系方式",
          icon: 'success',
          duration: 2000
        })
        return;
      }
      var ship_addr_area = data.ship_addr_area;
      if (ship_addr_area == '' || ship_addr_area.length == 0) {
        wx.showToast({
          title: "请填写详细地址",
          icon: 'success',
          duration: 2000
        })
        return;
      }
      var ship_area = data.ship_area;
      var province = this.data.regionlist[ship_area[0]].local_name;
      var city = this.data.citylist[ship_area[1]].local_name;
      var country = this.data.countrylist[ship_area[2]].local_name;
      var cregionid = this.data.countrylist[ship_area[2]].region_id;
      var area = "mainland:" + province + "/" + city + "/" + country + ":" + cregionid;
      var globalData = app.globalData;
      var member_id = globalData.member_id;
      if (member_id){
        wx.request({
          url: 'http://m.dapu.com/wxapplet-saveReceiver.html',
          data: {
            'member_id': member_id,
            'ship_name': ship_name,
            'ship_mobile': ship_mobile,
            'ship_area': area,
            'ship_addr_area': ship_addr_area
          },
          method: 'POST',
          dataType: 'json',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            var data = res.data.resmsg;
            wx.showToast({
              title: data,
              icon: 'success',
              duration: 2000
            });
            wx.navigateTo({
              url: '../member/receiver'
            })
          }
        })
      }
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://m.dapu.com/wxapplet-addReceiver.html',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      dataType:'json',
      success: function (res) {
        var regionlist = res.data.resmsg;
        var regionArr = regionlist.map(item => { return item.local_name;});
        that.setData({
          multiArray: [regionArr, [],[]],
          regionlist: regionlist,
          regionArr: regionArr
        });
        var default_region_id = regionlist[0]['region_id'];
        if (default_region_id) {
          that.searchgetregions(default_region_id);
        }
      }
    })
  },
  /**
   * 获取市区或县级
   */
  searchgetregions: function (region_id,index=0){
    var that = this;
    if (region_id){
      this.setData({
          region_id: region_id
      });
      wx.request({
        url: 'http://m.dapu.com/wxapplet-getregions-' + region_id + '.html',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var cityList = res.data.resmsg;
          var cityArr = cityList.map(item => {
              return item.local_name;
          });
          var regionArr = that.data.regionArr;
          that.setData({
            multiArray: [regionArr, cityArr,[]],
            cityArr: cityArr,
            citylist: cityList
          });
          var default_region_id = cityList[index]['region_id'];
          if (default_region_id) {
            that.getcountrys(default_region_id);
          }
        }
      })
    }
  },
  getcountrys: function (region_id) {
    var that = this;
    if (region_id) {
      wx.request({
        url: 'http://m.dapu.com/wxapplet-getregions-' + region_id + '.html',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var countryList = res.data.resmsg;
          var countryArr = countryList.map(item => {
            return item.local_name;
          });
          var regionArr = that.data.regionArr;
          var cityArr = that.data.cityArr;
          that.setData({
            multiArray: [regionArr, cityArr, countryArr],
            countrylist: countryList
          });
        }
      })
    }
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var regionlist = this.data.regionlist;
        var region_id = regionlist[e.detail.value]['region_id'];
        this.searchgetregions(region_id, e.detail.column);
        data.multiIndex[1] = 0;
        break;
    }
    this.setData(data);
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