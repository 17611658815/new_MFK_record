// pages/login/login.js
var app = getApp();
Page({
    data: {
        tapTime: "",
        num: 60,
        phone: '',
        pwd: '',
        noSend: true,
        agree: true,
        errorMsg: '', //错误信息
        isHide: 'none',
    },
    onLoad: function() {
        var that = this;
    },
    savePhone: function(e) {
        var that = this;
        var phone = that.data.phone;
        that.setData({
            phone: e.detail.value
        })
        console.log(that.data.phone);
    },
    savePwd: function(e) {
        var that = this;
        var pwd = that.data.pwd;
        that.setData({
            pwd: e.detail.value
        })
    },
    // 检测手机号码
    checkPhone: function(phone) {
        var that = this;
        if (phone.length == 0) {
            that.alert("请输入手机号");
            return false;
        }
        if (phone.length != 11) {
            that.alert("手机号长度有误！");
            return false;
        }
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(phone)) {
            that.alert("手机号有误！")
            return false;
        }
        return true;
    },
    // 检测密码不为空
    checkCode: function(pwd) {
        var that = this;
        if (pwd.length == 0) {
            that.alert("请输入验证码！");
            return false;
        }
        return true;
    },
    checkAgree: function(agree) {
        var that = this;
        if (agree == false) {
            that.alert("您还没同意用户协议哦！")
            return false;
        }
        return true;
    },
    //校验手机号
    sendCode: function() {
        var that = this;
        var num = that.data.num;
        var phone = that.data.phone;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.checkExpertPhone(params).then((res) => {
            if (res.data.code == 500) {
                wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    confirmText: '立即注册',
                    success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '/pages/register/register',
                            })
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                that.getCode()
            }
        })
    },
    //获取验证码
    getCode() {
        var that = this;
        var num = that.data.num;
        var phone = that.data.phone;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        if (that.checkPhone(phone)) {
            app.net.$Api.sendSmsCode(params).then((res) => {
                console.log(res.data);
                if (res.data.code == 500) {
                    app.alert(res.data.msg)
                } else {
                    that.setData({
                        noSend: false
                    });
                    that.data.timer = setInterval(function() {
                        num--;
                        that.setData({
                            num: num,
                        });
                        if (that.data.num == 0) {
                            clearInterval(that.data.timer);
                            that.setData({
                                num: 60,
                                noSend: true
                            });
                        }
                    }, 1000);
                }
            })
        }
    },
    //注册
    goRegister() {
        var that = this
        wx.navigateTo({
            url: '/pages/register/register',
        })
    },
    checkboxChange: function() {
        var that = this;
        that.setData({
            agree: !that.data.agree
        })
        console.log(that.data.agree);
    },
    goAgreement: function() {
        wx.navigateTo({
            url: '../agreement/agreement',
        })
    },
    // 提交
    submit: function() {
        var that = this;
        var phone = that.data.phone;
        var pwd = that.data.pwd;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        params.code = pwd;
        wx.setStorage({
            key: 'phone',
            data: phone,
        })
        console.log(pwd)
        var agree = that.data.agree;
        if (that.checkAgree(agree) && that.checkPhone(phone) && that.checkCode(pwd)) {
            app.net.$Api.expertPhoneSmsLogin(params).then((res) => {
                console.log(res.data);
                if (res.data.code == 501) {
                    console.log("失败")
                    app.alert(res.data.msg);
                    return
                } else if (res.data.code == 500) {
                    console.log("失败")
                    app.alert(res.data.msg);

                } else if (res.data.code == 301) {
                    wx.setStorageSync("userinfo", phone);
                    wx.setStorageSync("uid", res.data.user.id)
                    wx.redirectTo({
                        url: '../index/index?phone=' + phone,
                    })

                } else {
                    console.log("成功")
                    app.globalData.user = res.data.msg;
                    console.log(app.globalData.user)
                    wx.setStorageSync("userinfo", app.globalData.user);
                    wx.redirectTo({
                        url: '../index/index',
                    })
                }
            })
        }
    },


    alert(content) {
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: false
        })
        return this
    },
    loading: function() {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生登录",
            path: '/pages/login/login',
        }
    },
})