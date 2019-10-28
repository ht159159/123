<template>
  <div class="content changePassword">
    <div class="changePassowrd-main">
      <div class="changePassword-content">
        <div class="bankCard-Field">
          <h2>选择银行</h2>
          <div class>
            <select class="bankCard-card" @change="cbank($event)">
              <option v-for="(item,index) in bank" :key="index" :data-bankid="item.id">{{item.name}}</option>
            </select>
          </div>
          <img src="@/assets/img/icon_list_down.png" alt>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>开户人姓名</h2>
            <span v-show="accNameneedFill"></span>
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入开户人姓名"
              v-model="accName"
              @keydown="accNameneedFill = false"
            >
            <span v-show="accNameneedFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>银行卡号</h2>
            <span v-show="accIDneedFill"></span>
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入银行卡号"
              v-model="accID"
              @keydown="accIDneedFill = false"
            >
            <span v-show="accIDneedFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>开户省</h2>
            <span v-show="accProvinceneedFill"></span>
          </div>
          <div>
            <select class="bankCard-card" @change="cprovince($event)">
              <option v-if="probool" >请选择省份</option>
              <option v-else v-for="(item,index) in Province" :key="index" >{{item}}</option>
            </select>
            <img src="@/assets/img/icon_list_down.png" alt>
            <span v-show="accProvinceneedFill">请选择省份</span>
          </div>
        </div>
        <div class="bankCard-Field" @change="ccity($event)">
          <div>
            <h2>开户市</h2>
            <span v-show="accCityneedFill"></span>
          </div>
          <div>
            <select class="bankCard-card">
              <option v-if="citybool">请先选择省份</option>
              <option v-else v-for="(item,index) in City" :key="index">{{item}}</option>
            </select>
            <img src="@/assets/img/icon_list_down.png" alt>
            <span v-show="accCityneedFill">请选择县市</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>支行名称</h2>
            <span v-show="accBankneedFill"></span>
          </div>
          <div>
            <input
              type="text"
              placeholder="请输入支行名称"
              v-model="accBank"
              @keydown="accBankneedFill = false"
            >
            <span v-show="accBankneedFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>提款密码</h2>
            <span v-show="accPasswordneedFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请输入提款密码"
              v-model="accPassword"
              @keydown="accPasswordneedFill = false"
            >
            <span v-show="accPasswordneedFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>确认提款密码</h2>
            <span v-show="confirmAccneedFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请再次输入提款密码"
              v-model="confirmAccPassword"
              @keydown="confirmAccneedFill = false"
            >
            <span v-show="confirmAccneedFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-notice">
          <p>注意事项:</p>
          <p>
            帐号不定期更换！请每次存款前依照所显示的银
            行帐号入款，如入款至已过期帐号，无法查收， 本公司恕不负责！
          </p>
        </div>
        <button class="changePassword-submit" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bindingBankCard",
  data() {
    return {
      bank: [],
      Province: [],
      citylist:[],
      City: [],
      probool:true,
      citybool:true,
      bankID:"",
      accName:"",
      accID:"",
      accBank:"",
      accProvince:"",
      accCity:"",
      accPassword:"",
      confirmAccPassword:"",
      accNameneedFill: "",
      accIDneedFill: "",
      accBankneedFill: "",
      accProvinceneedFill: "",
      accCityneedFill: "",
      accPasswordneedFill: "",
      confirmAccneedFill: "",
      needFill:""
    };
  },
  methods: {
    cbank:function(e){
      let _this = this;
      var selectbank= _this.bank[e.target.options.selectedIndex];
      _this.bankID = selectbank.id
    },
    cprovince:function(e){
      let _this = this;
      _this.City = []
      var selectcity = e.target.options.selectedIndex;
      _this.accProvince = _this.Province[selectcity]
      var count = _this.citylist[selectcity].split('|').length;
      for(var i = 0; i < count;i++){
        _this.City.push(_this.citylist[selectcity].split('|')[i])
      }
      _this.citybool = false
    },
    ccity:function(e){
      let _this = this;
      var selectcity= _this.City[e.target.options.selectedIndex];
      _this.accCity = selectcity
    },
    submit: function() {
      if (this.accName == "") {
        this.accNameneedFill = true;
      }
      if (this.accID == "") {
        this.accIDneedFill = true;
      }
      if (this.accBank == "") {
        this.accBankneedFill = true;
      }
      if (this.accPassword == "") {
        this.accPasswordneedFill = true;
      }
      if (this.confirmAccPassword == "") {
        this.confirmAccneedFill = true;
      }
      if(this.accName != ""&&this.accID != ""&& this.accBank != "" && this.accPassword != "" && this.confirmAccPassword != ""){
        this.accNameneedFill = false;
        this.accIDneedFill = false;
        this.accBankneedFill = false;
        this.accPasswordneedFill = false;
        this.confirmAccneedFill = false;
        let _this = this;
        let _web = JSON.parse(this.getCookie("webs"));
        this.$axios(
          "UpdateUserBankInfo",
          {
            siteID:this.$global.siteID,
            loginID: _web.loginID,
            bankID: _this.bankID,
            accName: _this.accName,
            accID: _this.accID,
            accBank: _this.accBank,
            accProvince: _this.accProvince,
            accCity: _this.accCity,
            accPassword: _this.accPassword,
            confirmAccPassword: _this.confirmAccPassword,
            token: _web.Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            if(res.error._error){
              alert(res.error._error);
            }else{
              alert(res.message);             
            }
          }
        );
      }
    }
  },
  mounted(){
    let _this = this;
    let _web = JSON.parse(this.getCookie("webs"));
    this.$axios(
      "GetUserBankInfo",
      {
        siteID: this.$global.siteID,
        loginID: _web.loginID,
        token: _web.Authorization
      },
      function(resp) {
        var res = JSON.parse(resp.data);
        var list = res.data;
        if(list != null){
        list.bankDt.forEach(function(v) {
          _this.bank.push({
            name: v.bankName,
            id: v.bankID
          });
        });
        _this.bankID = _this.bank[0].id
        list.citys.forEach(function(v) {
          _this.Province.push(v.province);
          _this.citylist.push(v.county);
        });
        _this.accProvince = _this.Province[0]
        var count = _this.citylist[0].split('|').length;
      for(var i = 0; i < count;i++){
        _this.City.push(_this.citylist[0].split('|')[i])
      }
        _this.accCity = _this.City[0]
        _this.probool = false
        _this.citybool = false
      }else{
        alert(resp.error._error)
      }
      }
    );
  }
};
</script>

<style scoped>
.changePassowrd-main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: 3vmax 0;
}
.changePassword-content {
  width: 91.73vmin;
  min-height: 95.05vmax;
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
}
.bankCard-Field > div {
  align-self: center;
  position: relative;
}

.bankCard-Field input {
  align-self: center;
  border: none;
  outline: none;
  font-size: 4vmin;
  color: #666666;
  height: 3.15vmax;
  appearance: none;
  padding:0;
  margin:0;
}
.bankCard-Field span {
  display: block;
  height: 3.15vmax;
  text-align: left;
  padding-bottom: 8px;
  color: #ff0000;
  font-size: 4.27vmin;
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
  margin-top: 4.5vmax;
  outline: none;
}
.bankCard-notice {
  padding: 0 6.67vmin;
  font-size: 3.73vmin;
  text-align: left;
  min-height: 20px;
  color: #feb433;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  /* line-height: 18px; */
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
