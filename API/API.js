const Promise = require('HttpRequest.js')
const Url = require('URl.js')

/**
 * 接口请求
 */
export const api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */


    /**
     * common 校验手机号
     */
    checkExpertPhone: function (paramObj) {
        return Promise.post(Url.default.checkExpertPhoneUrl(), paramObj);
    },
    /**
     * 获取验证码
     */
    sendSmsCode: function (paramObj) {
        return Promise.post(Url.default.sendSmsCodeUrl(), paramObj);
    },
    /**
     * 登录
     */
    expertPhoneSmsLogin: function (paramObj) {
        return Promise.post(Url.default.expertPhoneSmsLoginUrl(), paramObj);
    },
    /**
     * 注册
     */
    saveExpertInfo: function (paramObj) {
        return Promise.post(Url.default.saveExpertInfoUrl(), paramObj);
    },
    /**
     * 校验验证码
     */
    checkSmsCode: function (paramObj) {
        return Promise.post(Url.default.checkSmsCodeUrl(), paramObj);
    },
    /**
     * 获取openid
     */
    getOpenId: function (paramObj) {
        return Promise.post(Url.default.getOpenIdUrl(), paramObj);
    },
    /**
     * 获取openid
     */
    wxLogin: function (paramObj) {
        return Promise.post(Url.default.wxLoginUrl(), paramObj);
    },





    /**
     * 获取问题列表
     */
    getAskList: function (paramObj) {
        return Promise.post(Url.default.getAskList(), paramObj);
    },
    /**
     * 判断登录状态
     */
    getCode: function (paramObj) {
        return Promise.post(Url.default.getCode(), paramObj);
    },
    /**
     * 获取医生信息
     */
    getDocterMsg: function (paramObj) {
        return Promise.post(Url.default.getDocterMsg(), paramObj);
    },
    /**
     * 问答搜索
     */
    getLikeQuestion: function (paramObj) {
        return Promise.post(Url.default.getLikeQuestionUrl(), paramObj);
    },
    /**
     * 保存自问自答
     */
    saveSelfQuestion: function (paramObj) {
        return Promise.post(Url.default.saveSelfQuestionUrl(), paramObj);
    },
    /**
     * 预约拍摄
     */
    saveDoctorAppointment: function (paramObj) {
        return Promise.post(Url.default.saveDoctorAppointmentUrl(), paramObj);
    },
    /**
     * 精选视频
     */
    getHotVideoList: function (paramObj) {
        return Promise.post(Url.default.getHotVideoListUrl(), paramObj);
    },
    /**
     * 文章列表
     */
    getIndexArticleList: function (paramObj) {
        return Promise.post(Url.default.getIndexArticleListUrl(), paramObj);
    },
    /**
     * 文章列表
     */
    checkExpertData: function (paramObj) {
        return Promise.post(Url.default.checkExpertDataUrl(), paramObj);
    },
    /**
     * 精选视频详情
     */
    getVideoInfo: function (paramObj) {
        return Promise.post(Url.default.getVideoInfoUrl(), paramObj);
    },
    /**
     * 搜索页擅长疾病
     */
    getExpertIllness: function (paramObj) {
        return Promise.post(Url.default.getExpertIllnessUrl(), paramObj);
    },
    /**
     * 搜索页擅长疾病
     */
    getIllnessQuestionList: function (paramObj) {
        return Promise.post(Url.default.getIllnessQuestionListUrl(), paramObj);
    },
    /**
     * 录音详情
     */
    getRecordInfo: function (paramObj) {
        return Promise.post(Url.default.getRecordInfoUrl(), paramObj);
    },
    /**
     * 录音详情
     */
    getDoctorRank: function (paramObj) {
        return Promise.post(Url.default.getDoctorRankUrl(), paramObj);
    },
    /**
     * 专家个人视频列表
     */
    getDoctorVideoList: function (paramObj) {
        return Promise.post(Url.default.getDoctorVideoListUrl(), paramObj);
    },
    /**
     * 专家个人文章列表
     */
    getDoctorArticleList: function (paramObj) {
        return Promise.post(Url.default.getDoctorArticleListUrl(), paramObj);
    },
    /**
     * 专家个人文章详情
     */
    getArticleInfo: function (paramObj) {
        return Promise.post(Url.default.getArticleInfoUrl(), paramObj);
    },
    /**
     * 邀请奖励
     */
    getInvitationProfit: function (paramObj) {
        return Promise.post(Url.default.getInvitationProfitUrl(), paramObj);
    },
    /**
     * 答题奖励
     */
    getAnswerProfit: function (paramObj) {
        return Promise.post(Url.default.getAnswerProfitUrl(), paramObj);
    },
    /**
     * 分成奖励
     */
    getDivideProfit: function (paramObj) {
        return Promise.post(Url.default.getDivideProfitUrl(), paramObj);
    },
    /**
     * 提现记录
     */
    cashOutLog: function (paramObj) {
        return Promise.post(Url.default.cashOutLogUrl(), paramObj);
    },
    /**
     * 收益明细
     */
    profitInfo: function (paramObj) {
        return Promise.post(Url.default.profitInfoUrl(), paramObj);
    },
    /**
     * 提现申请
     */
    pushCashOut: function (paramObj) {
        return Promise.post(Url.default.pushCashOutUrl(), paramObj);
    },
}