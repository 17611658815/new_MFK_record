// pages/addadept/addadept.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        docinfo: {},
        adeptInfo: [], //擅长疾病
        adeptInfo2: [], //擅长疾病
        inpval: "",
        length: ''
    },

    onLoad: function(options) {
        var that = this
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone')
        that.getDocterMsg(phone)
    },
    // 获取医生信息
    getDocterMsg(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
            var arr = res.data.msg.adept.split(",")
            var adeptInfo = that.data.adeptInfo
            for (var i = 0; i < arr.length; i++) {
                adeptInfo.push({
                    type: 1,
                    item: arr[i]
                })
            }
            that.setData({
                docinfo: res.data.msg,
                adeptInfo: adeptInfo,
                adeptInfo2: res.data.msg.adept.split(",")
            })
        })
    },
    submitMsg() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            name: that.data.docinfo.name,
            mobile: that.data.docinfo.mobile,
            hospital: that.data.docinfo.hospital,
            department: that.data.docinfo.department,
            adept: that.data.adeptInfo2.join(','),
            identity_code: that.data.docinfo.identity_code,
            title: that.data.docinfo.title,
            qualification: that.data.docinfo.qualification,
            qualification2: that.data.docinfo.qualification2,
            cooperation: that.data.docinfo.cooperation,
            identity: that.data.docinfo.identity,
            identity2: that.data.docinfo.identity,
            doctor_rank: that.data.docinfo.doctor_rank
        }
        app.net.$Api.saveExpertInfo(params).then((res) => {
            wx.navigateBack({
                delta: 1
            })
        })
    },
    // 添加擅长
    addadep(e) {
        var that = this
        that.setData({
            inpval: e.detail.value
        })
    },
    addPuhs() {
        var that = this
        if (that.data.inpval == '') {
            app.alert('请输入您擅长的疾病')
        } else {
            that.data.adeptInfo.unshift({
                type: 2,
                item: that.data.inpval
            })
            that.data.adeptInfo2.unshift(that.data.inpval)
            that.setData({
                adeptInfo: that.data.adeptInfo,
                adeptInfo2: that.data.adeptInfo2,
                inpval: ''
            })
        }
    },
    deladep(e) {
        console.log(e)
        var that = this
        var index = e.currentTarget.dataset.index
        var adep = that.data.adeptInfo
        adep.splice(index, 1);
        that.setData({
            adeptInfo: adep
        })
    },
})