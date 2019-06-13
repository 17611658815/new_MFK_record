export default class Url {
    static PATH = "https://mfkapi.39yst.com/appInterface/mfkdoctor"
    static COMMONPATH = "https://mfkapi.39yst.com/appInterface/common"
    static USERPATH = "https://mfkapi.39yst.com/appInterface/user"

    //登录校验手机号
    static checkExpertPhoneUrl() {
        return Url.COMMONPATH + '/checkExpertPhone';
    };
    //获取验证码
    static sendSmsCodeUrl() {
        return Url.USERPATH + '/sendSmsCode';
    };
    //登录
    static expertPhoneSmsLoginUrl() {
        return Url.USERPATH + '/expertPhoneSmsLogin';
    };
    //校验验证码
    static checkSmsCodeUrl() {
        return Url.USERPATH + '/checkSmsCode';
    };
    //获取openid
    static getOpenIdUrl() {
        return Url.USERPATH + '/getOpenId';
    };
    //wxLogin
    static wxLoginUrl() {
        return Url.USERPATH + '/wxLogin';
    };
    //注册
    static saveExpertInfoUrl() {
        return Url.PATH + '/saveExpertInfo';
    };
   



    //问题列表
    static getAskList() {
        return Url.PATH + '/getDoctorQuestionList';
    };
    //判断登录状态
    static getCode() {
        return Url.PATH + '/checkExpertStatus';
    };
    //获取医生信息
    static getDocterMsg() {
        return Url.PATH + '/getExpertInfo';
    };
    //问答搜索
    static getLikeQuestionUrl() {
        return Url.PATH + '/getLikeQuestion';
    };
    //保存自问自答
    static saveSelfQuestionUrl() {
        return Url.PATH + '/saveSelfQuestion';
    };
    //预约拍摄
    static saveDoctorAppointmentUrl() {
        getHotVideoList
        return Url.PATH + '/saveDoctorAppointment';
    };
    //精选视频
    static getHotVideoListUrl() {
        return Url.PATH + '/getHotVideoList';
    };
    //文章列表
    static getIndexArticleListUrl() {
        return Url.PATH + '/getIndexArticleList';
    };
    //资质审核状态
    static checkExpertDataUrl() {
        return Url.PATH + '/checkExpertData';
    };
    //精选视频详情
    static getVideoInfoUrl() {
        return Url.PATH + '/getVideoInfo';
    };
    //搜索页擅长疾病
    static getExpertIllnessUrl() {
        return Url.PATH + '/getExpertIllness';
    };
    //搜索结果
    static getIllnessQuestionListUrl() {
        return Url.PATH + '/getIllnessQuestionList';
    };
    //录音详情
    static getRecordInfoUrl() {
        return Url.PATH + '/getRecordInfo';
    };
    //科室信息
    static getDoctorRankUrl() {
        return Url.PATH + '/getDoctorRank';
    };
    //个人视频列表
    static getDoctorVideoListUrl() {
        return Url.PATH + '/getDoctorVideoList';
    };
    //个人文章列表
    static getDoctorArticleListUrl() {
        return Url.PATH + '/getDoctorArticleList';
    };
    //个人文章详情
    static getArticleInfoUrl() {
        return Url.PATH + '/getArticleInfo';
    };
    //邀请奖励
    static getInvitationProfitUrl() {
        return Url.PATH + '/getInvitationProfit';
    };
    //答题奖励
    static getAnswerProfitUrl() {
        return Url.PATH + '/getAnswerProfit';
    };
    //分成奖励
    static getDivideProfitUrl() {
        return Url.PATH + '/getDivideProfit';
    };
    //提现明细
    static cashOutLogUrl() {
        return Url.PATH + '/cashOutLog';
    };
    //收益明细
    static profitInfoUrl() {
        return Url.PATH + '/profitInfo';
    };
    //提现申请
    static pushCashOutUrl() {
        return Url.PATH + '/pushCashOut';
    };




}