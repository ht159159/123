import Vue from "vue";
import Vuex from "vuex";
import _global from "../../global";
import axios from 'axios'
// import Cookie from 'vue-cookies'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    bet: {
      //投注內容
      siteID: null,
      loginID: null,
      gameCode: null,
      preOrder: false,
      autoCancel: 0,
      //"aclSign": (int) - 輸贏(0:輸;1:贏;特殊追單使用),
      //"acLimit": (decimal) - 自動取消金額(特殊追單使用),
      issueNoCount: 1,
      summaryAmt: 0,
      betMainInfo: [],
      betSubInfo: []
    },
    panko: {
      //彩種狀況
      gameCode: "",
      openissueNo: "",
      preIssueNo: "",
      resultNo: "",
      result: [],
      result2: [],
      resulthistory: []
    },
    issueNoTrace: [], //追號內容
    balance: 0,
    dontTouch: false,
    isLogin: false,
    searchStatus: false,
    datalist: [],
  },
  getters: {
    // 7. 取得 state
    getDataList: state => {return state.datalist}
  },
  mutations: {
    _setbetMainInfo(state, arr) {
      state.bet.betMainInfo = arr;
    },
    _setbetSubInfo(state, arr) {
      state.bet.betSubInfo = arr;
    },
    _updateBalance(state, v) {
      state.balance = v;
    },
    _updatesummaryAmt(state, v) {
      state.bet.summaryAmt = v;
    },
    _updateloginID(state, v) {
      state.bet.loginID = v;
    },
    _updatepanko(state, v) {
      state.panko = v;
    },
    _updatebetGameCode(state, v) {
      state.bet.gameCode = v;
    },
    _updateSiteID(state, v) {
      state.bet.siteID = v;
    },
    _updateIssueNoTrace(state, v) {
      state.issueNoTrace = v;
    },
    _updateBet(state, v) {
      state.bet = v;
    },
    _backGroundDontTouch(state, v) {
      state.dontTouch = v;
    },
    _setisLogin(state, v) {
      state.isLogin = v
    },
    _setsearchStatus(state, v) {
      state.searchStatus = v
    },
    _API_SUCCESS(state, data) {
      // 4. 收到資料改變 state
      state.datalist = data;
    },
  },
  actions: {
    setbetMainInfo({ commit }, arr) {
      commit("_setbetMainInfo", arr);
    },
    setbetSubInfo({ commit }, arr) {
      commit("_setbetSubInfo", arr);
    },
    updateBalance({ commit }, v) {
      commit("_updateBalance", v);
    },
    updatesummaryAmt({ commit }, v) {
      commit("_updatesummaryAmt", v);
    },
    updateloginID({ commit }, v) {
      commit("_updateloginID", v);
    },
    updatepanko({ commit }, v) {
      commit("_updatepanko", v);
    },
    updatebetGameCode({ commit }, v) {
      commit("_updatebetGameCode", v);
    },
    updateSiteID({ commit }, v) {
      commit("_updateSiteID", v);
    },
    updateIssueNoTrace({ commit }, v) {
      commit("_updateIssueNoTrace", v);
    },
    updateBet({ commit }, v) {
      commit("_updateBet", v);
    },
    backGroundDontTouch({ commit }, v) {
      commit("_backGroundDontTouch", v);
    },
    setisLogin({ commit }, v) {
      commit('_setisLogin', v)
    },
    setsearchStatus({ commit }, v) {
      commit('_setsearchStatus', v)
    },
    actionAJAXexample({ commit }) {
      // let _web = Cookie.get('webs');
      // let loginID = _web.loginID;
      // let Authorization = _web.Authorization;
      axios.post(
        _global.api_url+"SitePlatformList",
        {
          parm: {
              siteID: _global.siteID,
          }
        },
      ).then(function (response) {
        let res = JSON.parse(response.data);
        // this.datalist = res.data;
        commit('_API_SUCCESS', res.data);
      });
    },
  },
});

export default store;
