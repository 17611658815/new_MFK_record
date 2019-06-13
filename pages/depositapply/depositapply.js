// pages/depositapply/depositapply.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneyNum:'',//提现金额
        time:'',
        money:0

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let doctorId = userinfo.mfk_doctor_id;
        let time = that.formatTime(new Date());
        that.setData({
            doctorId: doctorId,
            time,
            money: options.money

        })
    },
    moneyNumFn(e){
        console.log(e)
        let that = this;
        let time = that.formatTime(new Date());
        that.setData({
            moneyNum: e.detail.value
        })
    },
    //全部提现
    alldepositapply(){
        let that = this;
        that.setData({
            moneyNum: that.data.money
        })
    },
    confirm(){
        wx.navigateTo({
            url: '/pages/schedule/schedule?moneyNum=' + this.data.moneyNum,
        })
    },
    formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        var hours = date.getHours();      
        var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
        return year + '-' + month + '-' + day + '-' + hours + ':' + minute
    },
    pushCashOut() {
        let that = this;
        // if (parseInt(that.data.money) < parseInt(that.data.moneyNum)){
        //     console.log('提现金额过大')
        //     return 
        // }
        // let params = {
        //     appid: app.globalData.appid,
        //     doctor_id: that.data.doctorId,
        //     money: that.data.moneyNum
        // }
        // app.net.$Api.pushCashOut(params).then((res) => {
        //     if(res.data.code == 200){
        //         wx.showModal({
        //             title: '提示',
        //             content: res.data.msg,
        //             showCancel: false,
        //             success:function(){
        //                 that.confirm()
        //             }
        //         })
        //     }
        //     if (res.data.code == 402){
        //         wx.showModal({
        //             title: '提示',
        //             content: res.data.msg,
        //             showCancel: false,
        //             success: function () {
        //                 wx.navigateBack({
        //                     delta: 1
        //                 })
        //             }
        //         })
        //     }
        // })
        that.confirm()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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

    }
})