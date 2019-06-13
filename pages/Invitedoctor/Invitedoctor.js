// pages/Invitedoctor/Invitedoctor.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        doctorId:'',
        doctorName:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userinfo = wx.getStorageSync('userinfo') || null;
        console.log(userinfo)
        let doctorId = userinfo.mfk_doctor_id,
            doctorName = userinfo.wx_nick
        this.setData({
            doctorId: doctorId,
            doctorName: doctorName
        })
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
        let that = this;
        return {
            title: that.data.doctorName +"医生邀请您加入民福康医生，加入后领取双重奖励哟~",
            path: '/pages/joinMFk/joinMFk?doctorId=' + that.data.doctorId + "&doctorName=" + that.data.doctorName,
        }
    }
})