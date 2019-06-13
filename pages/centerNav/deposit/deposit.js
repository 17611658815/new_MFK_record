// pages/centerNav/deposit/deposit.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,//页码
        on_off:false,//分页开关
        flag: false,
        doctorId:'',//医生id
        depositList: [],//提现记录
           
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let userinfo = wx.getStorageSync('userinfo') || null;
        let doctorId = userinfo.mfk_doctor_id;
        that.setData({
            doctorId: doctorId,
        })
        that.getcashOutLog()
    },
    getcashOutLog() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctorId,
            page: that.data.page
        }
        app.net.$Api.cashOutLog(params).then((res) => {
            if (res.data.data.length ==0 && that.data.page==1){
                that.data.flag = true
            }
            if(res.data.data.length>0){
                res.data.data.forEach(val=>{
                    that.data.depositList.push(val)
                })
            }else{
                that.data.on_off = true;
            }
            that.setData({
                depositList: that.data.depositList,
                on_off: that.data.on_off,
                flag: that.data.flag
            })
            console.log(that.data.flag)

        })
    },
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off) {
            that.data.page++
            that.getcashOutLog()
        }
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