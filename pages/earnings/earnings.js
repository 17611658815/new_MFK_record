// pages/earnings/earnings.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast: false,
        flag: true,
        cooperation: '11',
        month: '', //当天日期
        page: 1,
        profit: {},
        userid: '',
        on_off: false, //分页开关
        profitInfoList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let userid = userinfo.id;
        let phone = wx.getStorageSync('phone');
        let doctorId = userinfo.mfk_doctor_id;
        that.setData({
            doctorId: doctorId,
            month: that.formatTime(new Date()), //月份
            userid: userid
        })
        that.getDocterMsg(phone)
        that.getprofitInfo()

    },
    getprofitInfo() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.profitInfo(params).then((res) => {
            if (res.data.data.length == 0 && that.data.page == 1) {
                that.data.flag = false
            }
            if (res.data.data.length > 0) {
                res.data.data.forEach(val => {
                    that.data.profitInfoList.push(val)
                })
            } else {
                that.data.on_off = true;
            }
            that.setData({
                profitInfoList: that.data.profitInfoList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })

        })
    },
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return month
        // return [year + '年' + month + '月' + day + '日'].map(formatNumber).join('-')
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res.data.msg.cooperation)
            that.setData({
                cooperation: res.data.msg.cooperation || '',
                profit: res.data.profit,
            })
            console.log(that.data.flag)
        })
    },
    goaudioList() {
        wx.navigateTo({
            url: '/pages/audioList/audioList',
        })
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    //提现说明
    check() {
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    // 立即提现
    goDeposit() {
        let that = this;
        let money = that.data.profit.total
        // if (parseInt(that.data.day) !== 20) {
        //     app.alert('每月20日才能提现哟~')
        //     return 
        // }
        // if (parseInt(that.data.day) == 20 && that.data.profit.sure>200) {
        //     app.alert('满200元才可以提现哟~')
        //     return 
        // }
        wx.navigateTo({
            url: '/pages/depositapply/depositapply?money=' + money,
        })
    },
    //检查授权
    checkauth: function() {
        var that = this;
        console.log('开始授权')
    },
    bindGetUserInfo(res) {
        var that = this;
        let userInfo = res.detail.userInfo;
        console.log(userInfo)
        var openid = wx.getStorageSync('openid') || 0;
        // if (parseInt(that.data.profit.total) < 200){
        //     app.alert('满200元才可以提现哟~')
        //     return
        // }
        if (openid != 0) {
            console.log('有openid')
            that.goDeposit()
        } else {
            console.log('没有openid')
            if (res.detail.userInfo) {
                app.loading()
                wx.login({
                    success: function(res) {
                        console.log(res)
                        that.getOpenid(res.code, userInfo)
                    },
                    fail: function(res) {
                        app.alert('信息获取失败')
                    },
                    complete: function(res) {
                        wx.hideToast()
                    },
                })
            } else {
                app.alert('“允许”授权后才可以提现哟~请再次点击“立即提现”按钮进行授权~')
            }
        }

    },
    getOpenid: function(loginCode, userInfo) {
        var that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.code = loginCode;
        app.net.$Api.getOpenId(params).then((res) => {
            console.log(res)
            wx.setStorageSync("openid", res.data.openid)
            that.register(res.data.openid, userInfo)
        })
    },
    register(openid, userInfo) {
        var that = this,
            params = new Object();
            wx.request({
                url: 'https://mfkapi.39yst.com/appInterface/user/wxLogin',
                header: {
                    'content-type': 'application/json'
                },
                method: "POST",
                data:{
                    appid:app.globalData.appid,
                    id:that.data.userid,
                    openid:openid,
                    userInfo:userInfo,
                },
                success:function(res){
                    that.goDeposit()
                }
            })
        // params.appid = app.globalData.appid;
        // params.id = that.data.userid;
        // params.openid = openid;
        // params.userInfo = userInfo;
        // app.net.$Api.wxLogin(params).then((res) => {
        //     console.log(res)
               
        // })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})