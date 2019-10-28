<template>
  <div class="content changePassword">
    <div class="changePassowrd-main">
      <div class="changePassword-content">
        <div class="bankCard-Field">
          <h2>已绑定银行卡</h2>
          <div class="bankCard-card">
            <select class="bankCard-card" @change="test($event)">
              <option
                v-for="(item,index) in banklist"
                :key="index"
                :data-bankid="item.id"
              >{{item.name}}</option>
            </select>
          </div>
          <img src="@/assets/img/icon_list_down.png" alt>
        </div>
        <!-- <div class="bankCard-Field">
          <h2>取款银行</h2>
          <div class="bankCard-card">
            <select class="bankCard-card">
              <option>中国银行</option>
              <option>中国银行</option>
              <option>中国银行</option>
            </select>
          </div>
          <img src="@/assets/img/icon_list_down.png" alt>
        </div>-->
        <div class="bankCard-Field">
          <h2>分行名</h2>
          <input disabled="disabled" type="text" @keydown="needFill = false" :value="accBank">
          <span v-show="needFill">这是必填的字段</span>
        </div>
        <div class="bankCard-Field">
          <h2>银行卡号</h2>
          <input disabled="disabled" type="text" @keydown="needFill = false" :value="accID">
          <span v-show="needFill">这是必填的字段</span>
        </div>
        <div class="bankCard-Field">
          <h2>用户名</h2>
          <input disabled="disabled" type="text" @keydown="needFill = false" :value="accName">
          <span v-show="needFill">这是必填的字段</span>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>联系电话</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input type="text" placeholder="请输入联系电话" v-model="tel" @keydown="needFill = false">
            <span v-show="tel==''">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <h2>账户馀额</h2>
          <input
            disabled="disabled"
            class="accountBalance"
            type="text"
            v-model="accountBalance"
            @keydown="needFill = false"
          >
          <span v-show="needFill">这是必填的字段</span>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>提款金额</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input
              type="number"
              pattern="\d*"
              placeholder="请输入提款金额"
              v-model="amount"
              @keydown="needFill = false"
            >
            <span v-show="amount==''">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>提款密码</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请输入提款密码"
              v-model="accPassword"
              @keydown="needFill = false"
            >
            <span v-show="accPassword==''">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-notice">
          <p>注意事项:</p>
          <p>
            银行卡只能添加同一个开户人姓名的银行卡
            银行卡绑定后将无法申请删除该张银行卡！
          </p>
        </div>
        <button class="changePassword-submit" @click="submit">提交</button>
      </div>
      <!-- 警告视窗 -->
      <div class="warning" v-show="warning == true">
        <img
          class="notice-close"
          src="@/assets/img/icon_close.png"
          alt
          @click="warning = false; mask = false"
        >
        <h2>警告！</h2>
        <p>
          请先绑定银行卡才能进行提款、修改提
          现密码等功能，谢谢！
        </p>
      </div>
      <div class="mask" v-show="mask == true" @click="mask = false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindingBankCard",
  data() {
    return {
      mask: false,
      warning: false,
      siteID: this.$global.siteID,
      needFill: "",           
      accountBalance: "",
      accPassword: "",
      amount: "",
      tel: "",
      banklist: [],
      bankID: "",
      accName: "",
      accID: "",
      accBank: ""
    };
  },
  methods: {
    test: function(e) {
      let _this = this;
      var selectbank = _this.banklist[e.target.options.selectedIndex];
      var ds = e.target.options[e.target.options.selectedIndex].dataset;
      _this.bankID = ds.bankid;
      _this.accID = selectbank.accID;
      _this.accName = selectbank.accName;
      _this.accBank = selectbank.accBank;
    },
    submit: function() {
      if (this.tel == "" || this.amount=='' || this.accPassword=='') {        
        return;
      } else {
        let _this = this;
        let {loginID,Authorization} = JSON.parse(this.getCookie("webs"));
        this.$axios(
          "MemberWithdrawApply",
          {
            siteID:this.$global.siteID,
            loginID: loginID,
            accPassword: _this.accPassword,
            amount: _this.amount,
            tel: this.tel,
            bankID: _this.bankID,
            accName: _this.accName,
            accID: _this.accID,
            accBank: _this.accBank,
            bindBank: true,
            token: Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            alert(res.message);
          }
        );
      }
    }
  },
  mounted() {
    let _this = this;
    let {loginID,Authorization,balance} = JSON.parse(this.getCookie("webs"));
    this.$axios(
      "GetUserBankInfo",
      {
        siteID: this.$global.siteID,
        loginID: loginID,
        token: Authorization
      },
      function(resp) {
        var res = JSON.parse(resp.data);
        var list = res.data;
        list.memberBK.forEach(function(v) {
          _this.banklist.push({
            name: v.bankName,
            id: v.bankID,
            accBank: v.accBank,
            accID: v.accID,
            accName: v.accName
          });
        });
        _this.bankID = _this.banklist[0].id;
        _this.accID = _this.banklist[0].accID;
        _this.accName = _this.banklist[0].accName;
        _this.accBank = _this.banklist[0].accBank;
        _this.amount = "";
        _this.tel = "";
      }
    );
    _this.accountBalance = balance;
  }
};
</script>

<style scoped>
.changePassowrd-main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 20px 0;
}
.changePassword-content {
  width: 91.73vmin;
  height: 94vmax;
  border-radius: 5px;
  background-color: #ffffff;
  align-self: center;
  display: flex;
  flex-direction: column;
}
.bankCard-Field {
  width: 80vmin;
  height: 5.4vmax;
  margin-bottom: 3vmax;
  display: flex;
  align-self: center;
  border-bottom: 1px solid #c2c2c2;
  position: relative;
  font-family:"Microsoft JhengHei","Heiti TC",sans-serif;
}
.bankCard-Field input {
  align-self: center;
  border: none;
  outline: none;
  font-size: 4.27vmin;
  color: #666666;
  appearance: none;
  padding: 0;
  margin: 0;
}

.bankCard-Field:nth-of-type(1) {
  margin-top: 4.5vmax;
}
.changePassword-submit {
  color: #fff;
  border: none;
  width: 32vmin;
  height: 4.5vmax;
  border-radius: 15px;
  box-shadow: 0 0.3vmax 2px 0 rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to bottom, #f1929c, #e35e74);
  align-self: center;
  margin-top: 30px;
  outline: none;
}
.bankCard-notice {
  padding: 0 25px;
  font-size: 3.73vmin;
  text-align: left;
  min-height: 20px;
  color: #feb433;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.bankCard-Field .accountBalance {
  color: red;
}
.warning {
  width: 280px;
  height: 160px;
  border-radius: 5px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.warning h2 {
  font-weight: bold;
  color: #f57e2f;
  align-self: center;
  margin-top: 34px;
  margin-bottom: 24px;
}
.warning p {
  align-self: center;
  font-size: 14px;
  margin: 0 21px;
  text-align: left;
}

/*webkit*/
.bankCard-Field input::-webkit-input-placeholder {
  color: #999999;
  font-size: 3.73vmin;
  font-weight: normal;
}
/*Firefox */
.bankCard-Field input::-moz-placeholder {
  color: #999999;
  font-size: 3.73vmin;
  font-weight: normal;
}
/*Firefox */
.bankCard-Field input::-moz-placeholder {
  color: #999999;
  font-size: 3.73vmin;
  font-weight: normal;
}
/*IE10*/
.bankCard-Field input:-ms-input-placeholder {
  color: #999999;
  font-size: 3.73vmin;
  font-weight: normal;
}
</style>
