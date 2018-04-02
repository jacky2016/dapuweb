Page({
  /**
   * 服务条款
   */
  servicetap:function(){
    var target = "http://m.dapu.com/marticle-help-agreement.html";
     wx.navigateTo({
         url: '../about/template?url=' + target
     })  
  },
  /**
   * 大朴介绍
   */
  introtap:function(){
    var target = "http://m.dapu.com/marticle-help-about.html";
    wx.navigateTo({
      url: '../about/template?url=' + target
    })
  }
})