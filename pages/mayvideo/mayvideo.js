// pages/mayvideo.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        tabberArr: ['最新发布', '最多浏览'],
        flag: true,
        count:0,//视频总数
        page: 1,
        doctor_id: '',
        on_off:false,
        doctorVideoList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        that.setData({
            doctor_id: userinfo.mfk_doctor_id,
        }, () => {
            that.getDoctorVideoList()
        })
        console.log(that.data.doctor_id)

    },
    fn() {
        wx.navigateTo({
            url: '/pages/Videoappointments/Videoappointments',
        })
    },
    swatchTab(e) {
        let that = this;
        that.setData({
            currentTab: e.currentTarget.dataset.index,
            doctorVideoList:[]
        },()=>{
            that.getDoctorVideoList()
        })
    },
    getDoctorVideoList() {
        let that = this;
        let params = {
            appid: app.globalData.appid,
            doctor_id: that.data.doctor_id,
            page: that.data.page,
            sort: that.data.currentTab+1
        }
        app.net.$Api.getDoctorVideoList(params).then((res) => {
            that.data.count = res.data.count
            if (that.data.count == 0){
                that.data.flag = false
            }
            if (res.data.data.length>0){
                res.data.data.forEach(val=>{
                    that.data.doctorVideoList.push(val)
                })
            }else{
                that.data.on_off = true
            }
            that.setData({
                doctorVideoList: that.data.doctorVideoList,
                on_off:that.data.on_off,
                count: res.data.count,
                flag: that.data.flag 
            })
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var that = this;
        if (!that.data.on_off){
            that.data.page++
            that.getDoctorVideoList()
        }
    },
    //视频详情
    goVideo(e) {
        var that = this
        console.log(e)
        var id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '/pages/video/video?videoId=' + id,
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})