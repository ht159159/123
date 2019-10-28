<template>
  <!-- 转账页面 -->
  <div class="rechargeBankCard">
    <h1>{{tppName}}</h1>
    <div class="bankCard-content">
      <div class="bankCard-Field" @click="bankCardSwitch()">
        <h2>支付银行</h2>
        <div class="bankCard-card">
          <select class="bankCard-card" v-model="bankCardInd">
            <option v-for="(item,index) in bankCard" :key="index" :value="index">{{item.bankName}}</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
      <div class="bankCard-Field">
        <div>
          <h2>充值金额</h2>
          <span v-show="needFill"></span>
        </div>
        <div>
          <input
            type="number"
            pattern="\d*"
            placeholder="请输入充值金额"
            v-model="amount"
            @keydown="needFill = false"
          >
          <span v-show="needFill">这是必填的字段</span>
        </div>
      </div>
      <div class="bankCard-Field">
        <h2>金额限制</h2>
        <p>最低:{{minTransAmt}} 最高:{{maxTransAmt}}</p>
      </div>
      <div class="bankCard-notice">
        <p>注意事项:</p>
        <p>
          帐号不定期更换！请每次存款前依照所显示的银
          行帐号入款，如入款至已过期帐号，无法查收， 本公司恕不负责！
        </p>
      </div>
      <button class="bankCard-submit" @click="submit()">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "transfer",

  data() {
    return {
      siteID: this.$global.siteID,
      tppName: null,
      tppType: null,
      bankCard: [],
      bankCardInd: 0,
      amount: "",
      bankCardSelect: "我是预设",
      bankCardOpenClose: false,
      needFill: false
    };
  },
  mounted() {
    this.tppName = this.$route.query.tppName;
    this.tppType = this.$route.query.tppType;
    this.bankCard = JSON.parse(this.$route.query.banklist);
  },
  methods: {
    bankCardSwitch: function() {
      if (this.bankCardOpenClose == false) {
        this.bankCardOpenClose = true;
      } else {
        this.bankCardOpenClose = false;
      }
    },

    submit: function() {
      if (this.amount == "") {
        this.needFill = true;
        return;
      }
      let t =this
      let _web = JSON.parse(this.getCookie("webs"));
      let sel = this.bankCard[this.bankCardInd];
      if (this.tppType == -1) {
         this.$axios(
          "MemberDepositApply",
          {
            siteID: this.$global.siteID,
            loginID: _web.loginID,
            bankID: sel.bankID,
            amount: this.amount,
            token: _web.Authorization
          },
          function(resp) {
            var json = JSON.parse(resp.data);
            if (json.error._error) {
              alert(json.error._error);
              return;
            }
            alert(json.message);
            t.$router.push({path:'/user'})
          }
        );
      } else {
        let _this = this;

        this.$axios(
          "MemberPaymentApply",
          {
            siteID: this.$global.siteID,
            loginID: _web.loginID,
            bankID: sel.bankID,
            tppDtID: sel.tppDtID,
            tppType: this.tppType,
            amount: this.amount,
            token: _web.Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            if (res.error._error) {
              alert(res.error._error);
            } else {
              alert(res.message);
              location.href = res.info.url;
            }
          }
        );
      }
    }
  },
  computed: {
    minTransAmt() {
      if (this.bankCard.length > 0)
        return this.bankCard[this.bankCardInd].minTransAmt;
    },
    maxTransAmt() {
      if (this.bankCard.length > 0)
        return this.bankCard[this.bankCardInd].maxTransAmt;
    }
  }
};
</script>

<style scoped>
.bankCard-card {
  width: 49.6vmin;
  height: 5.4vmax;
  color: #666666;
  font-size: 3.73vmin;
  border: none;
  outline: none;
  appearance: none;
  align-self: center;
  padding-bottom: 0.3vmax;
  font-family: "Microsoft JhengHei", "Heiti TC", sans-serif;
}
</style>