//index.js  
//获取应用实例  
var app = getApp()
Page({
    data: {
        userid: '',
        cooperation: '11',
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        durations: 500,
        menuType: [],
        goodHeight: 88,
        windowHeight: "",
        windowWidth: "",
        show: true,
        iphoneX: true,
        autoHeight: '',
        maintain:false
    },
    onShow() {
        var that = this;
        var phone = wx.getStorageSync('phone');
        var userinfo = wx.getStorageSync('userinfo') || null;
        var uid = wx.getStorageSync('uid') || null;
        if (uid == null && phone == userinfo){
            that.submit(phone)
        }
        wx.getSystemInfo({
            success: (res) => {
                let windowHeights = (res.windowHeight * (750 / res.windowWidth));
                if (res.model.search('iPhone X') != -1) {
                    that.data.iphoneX = false
                }
                that.setData({
                    windowHeight: res.windowHeight / res.windowWidth * 750 - 150,
                    windowWidth: res.windowWidth,
                    iphoneX: that.data.iphoneX
                });
            }
        })
        that.getDocterMsg(phone)
    },
    //判断userId是否过期抓取信息
    onLoad: function(options) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        if (userinfo == null) { //判断登录信息
            that.setData({
                show: false
            },()=>{
                wx.redirectTo({
                    url: '../login/login',
                })
            })
        } else if (userinfo != undefined && userinfo.mfk_doctor_id == undefined) { // 有登录信息 信息审核中
            console.log('有信息')
            that.getCode(phone)
        } else {
            that.setData({
                userid: userid
            })
        }
    },
    // 提交
    submit: function (phone) {
        var that = this;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        params.code = '123456';
        app.net.$Api.expertPhoneSmsLogin(params).then((res) => {
            console.log(res.data);
            wx.setStorageSync("userinfo", phone);
            wx.setStorageSync("uid", res.data.user.id)
               
        })
    },
    //判断登录状态
    getCode(phone) {
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
        app.net.$Api.getCode(params).then((res) => {
            console.log(res.data.code)
            if (res.data.code == 301) {
                that.setData({
                    code: false
                })
                console.log('审核中')
            } else if (res.data.code == 200) {
                console.log("成功")
                app.globalData.user = res.data.msg;
                wx.setStorageSync("userinfo", app.globalData.user);
                that.onLoad()
            } else if (res.data.code == 302) {
                console.log('审核失败')
                that.setData({
                    code2: false,
                    err: res.data.msg
                })
            } else if (res.data.code == 500) {
                app.globalData.user = ''
                wx.removeStorageSync('userinfo')
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            } 
        })
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
            if(res.data.code == 200){
                that.setData({
                    cooperation: res.data.msg.cooperation || ''
                })
               
            }else{
                that.setData({
                    maintain: true
                })
            }
           
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    goFlow: function(e) {
        let that = this,
            ftype = e.currentTarget.dataset.type,
            title = e.currentTarget.dataset.title;
        if (ftype =='flow4'){
            wx.navigateTo({
                url: '/pages/Invitedoctor/Invitedoctor'
            })
        }else{
            wx.navigateTo({
                url: '../flow/flow?ftype=' + ftype + '&title=' + title,
            })
        }
    },
    // 重新上传三证
    goUploadagain: function() {
        wx.navigateTo({
            url: '../Uploadagain/Uploadagain',
        })
    },
    goCenter() {
        wx.redirectTo({
            url: '/pages/center/center',
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        let that = this;
        return {
            title: "民福康医生-工作站",
            path: '/pages/index/index?id=1',
        }
    },
})