<template src='./login.html'>
    
</template>

<script>
import { _getstatus } from '@/assets/src/forgame.js'
export default {
    data() {
        return {
            siteID: this.$global.siteID,
            input:{
                loginID: "",
                loginPw: "",
                loginCode: ""
            },
            vcode: "",            
        };
    },
    methods: {
        VerifySessionStatus: function(token) {           
            this.$axios(
                "VerifySessionStatus", { token },
                (resp)=> {
                    let json = JSON.parse(resp.data);
                    if (
                        json.message == "验证Session通过!" ||
                        json.message == "驗證Session通過!"
                    )
                        this.$router.push({ path: "index" });
                    else alert(_loginjson.error._error);
                }
            );
        },

        login: function() {
            let {loginID,loginPw,loginCode} = this.input

            if (loginID == "" || loginPw == "") {
                alert("请填入帐号或密码");
            } else if (loginCode == "")
                alert("请输入验证码!");
            else if (this.vcode != loginCode) {
                alert("验证码输入错误!");
                this.createCode()
            } else {  
                //登入
                this.$axios(
                    "login", {
                        siteID: this.siteID,
                        loginID: loginID,
                        loginPw: loginPw
                    },
                    (resp)=> {
                        let loginjson = JSON.parse(resp.data);
                        let {token,isMember,isTrial,memberID} = loginjson.info

                        if (loginjson.message == "登入成功") {
                            let _web = JSON.parse(this.getCookie("webs"));
                            _web.Authorization = token;
                            _web.loginID = loginID;
                            _web.isMember = isMember;
                            _web.isTrial = isTrial;
                            _web.memberID = memberID
                            this.setCookie("webs", JSON.stringify(_web));
                            this.$socket.emit('join', { siteID: this.$siteID ,memberID,token})

                            //更新vuex 状态
                            this.$store.dispatch("updateloginID", loginID)
                            this.$store.dispatch("setisLogin", true)
                            //验证session
                            this.VerifySessionStatus(token);
                            _getstatus(this);

                        } else {
                            alert(loginjson.error._error)

                        }
                    }
                );
            }
        },
        createCode: function() {
            let code = "";
            var codeLength = 4; //验证码的长度
            var checkCode = document.getElementById("code");
            var random = new Array(
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z"
            ); //随机数
            for (var i = 0; i < codeLength; i++) {
                //循环操作
                var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
                code += random[index]; //根据索引取得随机数加到code上
            }
            this.vcode = code; //把code值赋给验证码
        }
    },
    watch: {
        'input.loginCode': function() {
            this.input.loginCode = this.input.loginCode.toUpperCase();
        }
    },
    mounted() {
        this.createCode();
    }
};
</script>

<style src='./login.css'>

</style>
