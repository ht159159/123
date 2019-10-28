<template>
  <div class="content changePassword">
    <div class="changePassowrd-main">
      <div class="changePassword-content">
        <div class="bankCard-Field">
          <div>
            <h2>旧密码</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请输入旧密码"
              v-model="oldPassword"
              @keydown="needFill = false;remind = false"
            >
            <span v-show="needFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>新密码</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请输入新密码"
              v-model="newPassword"
              @keydown="needFill = false;remind = false"
            >
            <span v-show="needFill">这是必填的字段</span>
          </div>
        </div>
        <div class="bankCard-Field">
          <div>
            <h2>确认新密码</h2>
            <span v-show="needFill"></span>
          </div>
          <div>
            <input
              type="password"
              placeholder="请再次输入新密码"
              v-model="confirmPassword"
              @keydown="needFill = false;remind = false"
            >
            <span v-show="needFill">这是必填的字段</span>
            <span v-show="remind" class="remind">提款密码由4位数字组成</span>
          </div>
        </div>
        <button class="changePassword-submit" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeWithdrawPassword",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      needFill: "",
      remind: true,
      fourNumber: true
    };
  },
  methods: {
    submit: function() {
      this.remind = false;
      let _this = this;
      let _web = JSON.parse(this.getCookie("webs"));
      if (
        this.oldPassword == "" ||
        this.newPassword == "" ||
        this.confirmPassword == ""
      ) {
        this.needFill = true;
        console.log(this.$route.path);
      } else {
        this.$axios(
          "ChangeAccPassword",
          {
            siteID: this.$global.siteID,
            loginID: _web.loginID,
            oldPassword: _this.oldPassword,
            newPassword: _this.newPassword,
            confirmPassword: _this.confirmPassword,
            token: _web.Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            if(res.error._error){
               alert(res.error._error)
            }
            else            
              alert(res.message);
           
            _this.oldPassword=''
            _this.newPassword=''
            _this.confirmPassword=''

          }
        );
      }
    }
  }
};
</script>

<style scoped>
.changePassowrd-main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-top: 20px;
}
.changePassword-content {
  width: 91.73vmin;
  height: 40.18vmax;
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
.bankCard-Field h2 {
  align-self: center;
  width: 22.4vmin;
  text-align: left;
  margin-right: 8vmin;
}
.bankCard-Field input {
  align-self: center;
  border: none;
  outline: none;
  font-size: 4vmin;
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
  margin-top: 10px;
  outline: none;
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
