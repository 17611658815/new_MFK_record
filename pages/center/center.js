// pages/center/center.js
var app = getApp();
Page({
    data: {
        nickName: '',
        userid: '',
        userInfoAvatar: '',
        position: '',
        userPic: '',
        page: 1,
        winWidth: 0,
        winHeight: 0,
        isHide: 'none',
        count_num: 0,
        isIphoneX: false,
        chexk: false, //是否认证信息
        doctorid: '',
        userObj: {},
        month:'',//月份
        profit:{},//收益
        navigitList:[
            {
                name:'我的有声问题',
                icon:'../../images/recordIcon.png',
                path:'/pages/answer/answer'
            },
            {
                name:'我的自问自答',
                icon:'../../images/zwzd.png',
                path:'/pages/askList/askList'
            },
            {
                name:'我的视频',
                icon:'../../images/icon/center_viewo_icon.png',
                path:'/pages/mayvideo/mayvideo'
            },
            {
                name:'我的文章',
                icon:'../../images/icon/center_article_icon.png',
                path:'/pages/mayarticle/mayarticle'
            },
            {
                name:'意见反馈',
                icon:'../../images/fankiu.png',
                path:'/pages/feedback/feedback'
            }
        ],
        moneyList:[
            {
                name: '邀请奖励',
                icon: '../../images/icon/center_icon_4.png',
                path: '/pages/centerNav/Inviterewards/Inviterewards'
            },
            {
                name: '答题奖励',
                icon: '../../images/icon/center_icon_1.png',
                path: '/pages/centerNav/answerMoney/answerMoney'
            },
            {
                name: '分成奖励',
                icon: '../../images/icon/center_icon_2.png',
                path: '/pages/centerNav/shareMone/shareMone'
            },
            {
                name: '提现明细',
                icon: '../../images/icon/center_icon_3.png',
                path: '/pages/centerNav/deposit/deposit'
            }
        ]
    },
    onLoad: function(option) {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || {};
        var userid = userinfo != undefined ? userinfo.id : 0;
        var doctorid = userinfo.mfk_doctor_id;
        var userObj = wx.getStorageSync('userObj') || {}
        var phone = wx.getStorageSync('phone')
        if (userid == 0) {
            wx.redirectTo({
                url: '../login/login',
            })
        } else {
            wx.getSystemInfo({
                success: (res) => {
                    console.log(res)
                    if (res.model.search('iPhone X') != -1) {
                        that.data.isIphoneX = true
                    } 
                    that.setData({
                        windowHeight: res.windowHeight / res.windowWidth * 750 - 150,
                        windowWidth: res.windowWidth,
                        userid: userid,
                        userObj: userObj,
                        doctorid: doctorid,
                        month: that.formatTime(new Date()), //月份
                        isIphoneX: that.data.isIphoneX
                    });
                }
            })
            that.getDocterMsg(phone)
            that.getDoctorStatus()
        }
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    getDoctorStatus() {
        var that = this
        wx.request({
            url: 'https://mfkapi.39yst.com/appInterface/mfkdoctor/getDoctorInfo/',
            data: {
                appid: app.globalData.appid,
                userid: that.data.userid
            },
            header: {
                'content-type': 'application/json'
            },
            method: "POST",
            success: (res) => {
                console.log(res.data.data.count_num)
                that.setData({
                    count_num: res.data.data.count_num
                })
            }
        })

    },
    // 跳转民福康小程序
    gomfk() {
        var that = this;
        console.log(that.data.doctorid)
        wx.navigateToMiniProgram({
            appId: 'wxd8fd4122d8ed38e9',
            path: 'pages/doctorHomePage/doctorHomePage?doctorId=' + that.data.doctorid,
            extraData: {},
            envVersion: 'release',
            success(res) {
                // 打开成功
                console.log('打开了')
            }
        })
    },
    // 获取医生信息
    getDocterMsg(phone) {
        var that = this,
            params = new Object();
            params.appid = app.globalData.appid;
            params.phone = phone;
        app.net.$Api.getDocterMsg(params).then((res) => {
            console.log(res)
            that.setData({
                cooperation: res.data.msg.cooperation,
                nickName: res.data.msg.name,
                userInfoAvatar: res.data.msg.avatar,
                profit: res.data.profit
            })
        })
    },
    // 下拉退出登录
    PullDownRefresh: function() {
        var that = this;
        app.globalData.user = ''
        wx.clearStorage()
        wx.showLoading({
            title: '退出中..',
        })
        setTimeout(function() {
            wx.hideLoading()
            // 清理成功toast
            that.setData({
                isHide: 'block',
            });
            setTimeout(function() {
                that.setData({
                    isHide: 'none',
                },()=>{
                    wx.redirectTo({
                        url: '../login/login',
                    })
                })
            }, 2000);
        }, 2000)
    },
    gomayInformation() {
        wx.navigateTo({
            url: '/pages/mayinformation/mayinformation',
        })
    },
    //拨打客服
    callUp() {
        wx.makePhoneCall({
            phoneNumber: '01059231588' // 仅为示例，并非真实的电话号码
        })
    },
    goHome: function() {
        wx.redirectTo({
            url: '../index/index',
        })
    },
    goMoney: function() {
        wx.navigateTo({
            url: '../money/money',
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
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-个人中心",
            path: '/pages/ask/ask',
        }
    },
})