//app.js
const Api = require('API/API.js');
App({
    loading: function() {
        wx.showToast({
            mask:true,
            title: '加载中',
            icon: 'loading',
            duration: 30000
        })
    },
    globalData: {
        firstGlance: 0, //用户第一次浏览某页
        appname: '民福康医生',
        userInfo: {},
        max_callback: 3,
        mfk_doctor_id: 0,
        apply_id: 0,
        login: false,
        appid: '7', //填写微信小程序appid  
        ip: 'https://mfkapi.39yst.com/app/api/record_app2.php'
    },
    onLaunch: function(option) { //初始化
        var that = this;
        var pass = true;
        var timer = setInterval(function() {
            var userinfo = wx.getStorageSync('userinfo') || {};
        }, 2000)
        
        console.log(Api.api)
    },
    share: function(path, success = '', fail = '', title = '', imageUrl = '') {

        var option = {};
        var that = this;
        var i = "?"
        console.log(that.globalData)
        path = i.indexOf(path) >= 0 ? path + '&shareChannel=' + that.globalData.user : path + '?shareChannel=' + that.globalData.user;
        console.log(path);
        option.path = path;
        option.success = function(res) {
            console.log('11111')
            //保存转发信息
            if (that.globalData.user != undefined) { //存在用户信息
                wx.request({
                    url: 'https://api.mfk.com/app/api/share.php?appid=' + that.globalData.appid + '&path=' + encodeURIComponent(path) + '&member_id=' + that.globalData.user.id,
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res)
                    }
                });
            }
            //执行成功函数
            if (typeof(success) == 'function') {
                success(res);
            }
        };
        if (typeof(fail) == 'function') {
            option.fail = fail;
        }
        if (imageUrl == '') {
            option.imageUrl = imageUrl;
        }
        option.title = title == '' ? that.globalData.appname : title;
        return option;
    },
    //挂载全局app
    net: {
        $Api: Api.api,
    },
    
    alert: function(content) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
        return this
    },

})