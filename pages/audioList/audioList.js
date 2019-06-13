//index.js  
//获取应用实例  
var app = getApp()
Page({
    data: {
        userid: '',
        illnessList: [], //常见疾病
        adeptList: [], //擅长
        menuType: [],
        page: 1,
        windowHeight: "",
        windowWidth: "",
        hasnext: true,
        loading: false,
        arr: ['擅长问题', '全部问题'],
        switchTab: 0,
        code: true,
        code2: true,
        err: '',
        cooperation: '11',
        illnesslengthNum: '1',
        adeplengthNum: '1',
        off: false,
        num:'0',
        answer_price:"0",
        profit:"0"
    },
    onShow() {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        that.getDocterMsg(phone)
        wx.getSystemInfo({
            success: (res) => {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth,
                    off: false
                });
            }
        })
        if (userinfo != null && userinfo.mfk_doctor_id != undefined) {
            that.adeptList();
            that.loadList();
            console.log('刷新列表')
            that.setData({
                userid: userid
            })
        }
    },
    //判断userId是否过期抓取信息
    onLoad: function() {
        var that = this;
        var userinfo = wx.getStorageSync('userinfo') || null;
        var phone = wx.getStorageSync('phone')
        var userid = (userinfo != undefined) ? userinfo.id : 0;
        console.log(that.data.adeptList)
        if (userinfo == null) {
            wx.redirectTo({
                url: '../login/login',
            })
        } else if (userinfo != undefined && userinfo.mfk_doctor_id == undefined) { //信息审核中
            that.getCode(phone)
        } else {
            that.setData({
                userid: userid
            })
        }
    },
    //判断登录状态
    getCode(phone) {
        let that = this,
            params = new Object();
        params.appid = app.globalData.appid;
        params.phone = phone;
        app.net.$Api.getCode(params).then((res) => {
            console.log(res.data.code)
            if (res.data.code == 301) {
                that.setData({
                    code: false,
                })
                //  var obj = { "id": "1092", "wx_avatar": "", "wx_nick": "徐立峰", "sex": "1", "wx_openid": "", "province": "", "country": "", "city": "", "app_id": "5", "source": "0", "share_source": "0", "created": "1542783391", "mfk_doctor_id": "301", "is_pay": "1" }
                //   app.globalData.user = obj;
                //   console.log(app.globalData.user)
                //   wx.setStorageSync("userinfo", obj);
                //   that.onLoad()
                console.log('审核中')
            } else if (res.data.code == 200) {
                console.log("成功")
                app.globalData.user = res.data.msg;
                console.log(app.globalData.user)
                wx.setStorageSync("userinfo", app.globalData.user);
                that.onLoad()
            } else if (res.data.code == 302) {
                console.log('审核失败')
                that.setData({
                    code2: false,
                    err: res.data.msg
                })
            } else if (res.data.code == 500) {
                app.globalData.user = ''
                wx.removeStorageSync('userinfo')
                wx.reLaunch({
                    url: '/pages/login/login',
                })
            }
        })
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
                cooperation: res.data.msg.cooperation || ''
            })
        })
    },
    // 下拉刷新
    pullUpLoad: function() {
        var that = this;
        if (that.data.illnessList.length == 0 || that.data.adeptList.length == 0) {
            that.setData({
                off: false
            })
        }
        if (that.data.switchTab == 0) {
            that.data.loading = true;
            that.data.page++;
            that.adeptList();
        } else {
            that.data.loading = true;
            that.data.page++;
            that.loadList();
        }
    },

    // 全部问题
    loadList: function() {
        var that = this;
        var page = that.data.page;
        var illnessList = page == 1 ? [] : that.data.illnessList;
        var params = new Object();
            params.appid = app.globalData.appid;
            params.userid = that.data.userid;
            params.listtype = 2;
            params.page = page;
        if (that.data.off) {
            return
        }
        app.loading();
        app.net.$Api.getAskList(params).then((res) => {
            wx.hideToast();
            var list = res.data.list;
            // var list = [];
            if (list.length <= 0) {
                that.data.hasnext = false;
                that.setData({
                    off: true
                })
            } else {
                for (var i = 0; i < list.length; i++) {
                    illnessList.push(list[i]);
                };
                that.setData({
                    illnessList: illnessList,
                    num: res.data.answer_num || that.data.num,
                    answer_price: res.data.answer_price || that.data.answer_price,
                    profit: res.data.profit || that.data.profit,
                });
                console.log(res.data.profit)
            }
            that.setData({
                illnesslengthNum: illnessList.length,
            })
        })
    },
    // 擅长
    adeptList: function() {
        var that = this;
        var page = that.data.page;
        var adeptList = page == 1 ? [] : that.data.adeptList;
        var params = new Object();
        params.appid = app.globalData.appid;
        params.userid = that.data.userid;
        params.listtype = 1;
        params.page = page;
        if (that.data.off) {
            return
        }
        app.loading();
        app.net.$Api.getAskList(params).then((res) => {
            wx.hideToast();
            console.log(res)
            var list = res.data.list;
            // var list =[];
            if (list.length <= 0) {
                that.data.hasnext = false;
                that.setData({
                    off: true
                })
            } else {
                for (var i = 0; i < list.length; i++) {
                    adeptList.push(list[i]);
                };
                that.setData({
                    adeptList: adeptList,
                    num: res.data.answer_num || that.data.num,
                    answer_price: res.data.answer_price || that.data.answer_price,
                    profit: res.data.profit || that.data.profit,
                });
            }
            that.setData({
                adeplengthNum: adeptList.length
            })
            if (list.length <= 0 && that.data.adeptList == 0) {
                that.setData({
                    switchTab: 1
                })
            }
        })
        
    },
    switchTab(e) {
        var that = this
        var index = e.currentTarget.dataset.index
        that.setData({
            switchTab: index,
            page: 1,
            off: false
        })
        if (that.data.switchTab == 0) {
            that.adeptList()
        } else {
            that.loadList()
        }
    },
    goCertification() {
        wx.navigateTo({
            url: '../certification/certification',
        })
    },
    // 重新上传三证
    goUploadagain: function() {
        wx.navigateTo({
            url: '../Uploadagain/Uploadagain',
        })
    },
    gotoRecord: function(e) {
        var that = this;
        var question = e.currentTarget.dataset.questionid;
        var title = e.currentTarget.dataset.title;
        var age = e.currentTarget.dataset.age != undefined ? e.currentTarget.dataset.age : 0;
        wx.navigateTo({
            url: '../record/record?questionId=' + question + '&title=' + title + '&age=' + age,
        })
    },
    goAsk: function() {
        wx.navigateTo({
            url: '../ask/ask',
        })
    },
    goSearch: function() {
        var that = this;
        wx.navigateTo({
            url: '../search/search',
            success: function() {
                that.setData({
                    keyWords: '',
                })
            }
        });
    },
    //分享页面 
    onShareAppMessage: function() {
        var that = this;
        return {
            title: "民福康医生-有声问答",
            path: '/pages/audioList/audioList',
        }
    },
})