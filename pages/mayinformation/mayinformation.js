// pages/mayinformation/mayinformation.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        doctor: {
            name: '',
            identity_code: '',
            hospital: '',
            department: '',
            doctor_rank: '',
            mobile: '',
            describe: '',
            introduction: '',
            cooperation: "11" //合作协议
        },
        array: ['主任', '副主任', '主治', '医师', '教授', '高级营养师', '中级营养师', '初级营养师', '康复师'], //客服
        index: '',
        msg: {},
        code: '',
        userInfoAvatar: '',
        multiIndex: [],
        multiArray: [],
        objectMultiArray: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var that = this
        var userinfo = wx.getStorageSync('userinfo') || {};
        var phone = wx.getStorageSync('phone')
        if (JSON.stringify(userinfo) == "{}") {
            wx.reLaunch({
                url: '/pages/login/login',
            })
        }
        that.getDocterMsg(phone)
        that.getCode(phone)
    },
    //判断审核状态
    getCode(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.mobile = phone;
        app.net.$Api.checkExpertData(params).then((res) => {
            console.log(res.data.code)
            that.setData({
                code: res.data.code
            })
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
            that.data.doctor.name = res.data.msg.name;
            that.data.doctor.hospital = res.data.msg.hospital;
            that.data.doctor.department = res.data.msg.department;
            that.data.doctor.mobile = res.data.msg.mobile;
            that.data.doctor.identity_code = res.data.msg.identity_code;
            that.data.doctor.describe = res.data.msg.describe;
            that.data.doctor.introduction = res.data.msg.introduction;
            that.data.doctor.doctor_rank = res.data.msg.doctor_rank
            // that.data.index = res.data.msg.doctor_rank,
            that.data.userInfoAvatar = res.data.msg.avatar,
                that.data.doctor.cooperation = res.data.msg.cooperation //合作协议
            that.setData({
                doctor: that.data.doctor,
                msg: res.data.msg,
                index: that.data.index,
                userInfoAvatar: that.data.userInfoAvatar
            })
        })
    },
    //去录三证
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    goaddadept() {
        var that = this
        wx.navigateTo({
            url: '/pages/addadept/addadept',
        })
    },
    //去看三证
    gonextStep() {
        var that = this
        if (that.data.code == 201) {
            wx.navigateTo({
                url: '../certification/certification',
            })
        } else if (that.data.code == 203) {
            wx.navigateTo({
                url: '../Uploadagain/Uploadagain',
            })
        } else {
            wx.navigateTo({
                url: '/pages/identification/identification',
            })
        }


    },
    //去编辑个人简介
    goindividualresume() {
        wx.navigateTo({
            url: '/pages/individualresume/individualresume',
        })
    },
    //去擅长描述
    goadeptdescription() {
        wx.navigateTo({
            url: '/pages/adeptdescription/adeptdescription',
        })
    },
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-个人资料",
            path: '/pages/mayinformation/mayinformation',
        }
    },
})