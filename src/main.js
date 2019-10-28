import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import _global from "./global";
import Datetime from "vue-datetime";
import _store from '@/assets/src/store'
import Paginate from 'vuejs-paginate'
import VueSocketIO from 'vue-socket.io'
import {socketMessage} from '@/assets/src/sockets';
import VueTouch from "vue-touch";

Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false;
const isDebug_mode = process.env.NODE_ENV !== 'production';

Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;

Vue.use(VueAxios, axios);
Vue.prototype.$global = _global;
Vue.prototype.$store = _store

//全域注册axios
Vue.prototype.$axios = function(url, objparm, callback) { 
  this.axios
    .post(this.$global.api_url + url, {
      parm: objparm,
      ip: JSON.parse(this.getCookie("webs")).myip
    })
    .then(resp => {
      let json = JSON.parse(resp.data)
      if (json.error._error) {
        if (json.error._error.indexOf('逾时') > -1) {
          let webs = {
            loginID: "",
            balance: 0,
            myip: "",
            Authorization: null,
            isMember: "",
            isTrial: ""
          };
          this.setCookie("webs", JSON.stringify(webs), 0.5);
          this.$store.dispatch("setisLogin", false)
          this.$router.push({ path: '/login' });
          return;
        }
      }
      callback(resp);
    });
};

// 时间选择器
Vue.use(Datetime);

// 分页
Vue.component('paginate', Paginate)
Vue.use(new VueSocketIO({
  connection:_global.socketurl
}))


//cookie
Vue.prototype.setCookie=function(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

Vue.prototype.getCookie=function(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
//刪除
// Vue.prototype.eraseCookie=function(name) {
//   this.setCookie(name, "", -1);
// }

new Vue({
  sockets:{
    connect:()=>{
      console.log('socket connect!')      
    },
    message:function(msg){
      socketMessage(this,msg)
    }
  },
  router,
  render: h => h(App)
}).$mount("#app");

////////////Vuetouch////////////////////
// VueTouch.config.swipe = {

//   threshold: 100 //手指左右滑動距離
  
//   }