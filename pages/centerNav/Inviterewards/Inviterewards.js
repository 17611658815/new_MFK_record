// pages/centerNav/Inviterewards/Inviterewards.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        textArr:['已邀请好友','已获得奖励'],
        showToast:false,
        flag:false,//是否邀请好友
        page:1,
        doctorId:'',
        doctorName:'',
        count:'',
        invitationNum:0,//邀请医生数量
        doctorList:[],//专家列表
        profit:'0',//奖励金额
        on_off:false

    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let doctorId = userinfo.mfk_doctor_id,
            doctorName = userinfo.wx_nick
        that.setData({
            doctorId: doctorId,
            doctorName: doctorName
        })
        that.getInvitationProfit()
    },
    getInvitationProfit() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.getInvitationProfit(params).then((res) => {
            console.log(res.data.data.profit)
            that.data.invitationNum = res.data.data.invitationNum;
            that.data.profit = res.data.data.profit || that.data.profit;
            if (res.data.data.invitationNum == 0 && that.data.page == 1) {
                that.data.flag = true
            }
            if (res.data.data.doctorList.length > 0) {
                res.data.data.doctorList.forEach(val => {
                    that.data.doctorList.push(val)
                })
            } else {
                that.data.on_off = true
            }
            that.setData({
                doctorList: that.data.doctorList,
                on_off: that.data.on_off,
                invitationNum: that.data.invitationNum,
                profit: that.data.profit,
                flag: that.data.flag
            })
            console.log(that.data.flag)
            
        })
    },
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off) {
            that.data.page++
            that.getInvitationProfit()
        }
    },
    showExplain(){
        let that = this;
        that.setData({
            showToast: !that.data.showToast
        })
    },
    onShareAppMessage: function () {
        let that = this;
        return {
            title: that.data.doctorName + "医生邀请您加入民福康医生，加入后领取双重奖励哟~",
            imageUrl:"https://api.mfk.com/statics/images/shareimg/share_1.jpg",
            path: '/pages/joinMFk/joinMFk?doctorId=' + that.data.doctorId + "&doctorName=" + that.data.doctorName,
        }
    }
})