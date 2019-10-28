<template>
  <div class="content changePassword">
    <div class="record-title">
      <label for="startTime">时间</label>
      <input type="date" id="startTime" required="required" v-model="startTime">
      <label for="endTime">至</label>
      <input type="date" id="endTime" required="required" v-model="endTime">
      <button class="serchRecord" @click="submit">查询</button>
    </div>
    <div class="record-title2">
      <div class="record-Field">
        <div class>
          <select class="record-card" @change="cDW($event)">
            <option v-for="(item,index) in dwlogTypelist" :key="index" >{{item}}</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
      <div class="record-Field">
        <div class>
          <select class="record-card" @change="cdwtype($event)">
            <option v-for="(item,index) in logType" :key="index" >{{item.name}}</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
    </div>

    <div class="record-main">
      <div class="record-content" v-for="item in message" :key="item.logTime">
        <div class="content-head">
          <span class="content-head-date">{{item.logTime}}</span>
        </div>
        <div class="content-body">
          <h3 class="status">{{dwlogType}}状态</h3>
          <p class="status-content" >{{item.appAmt}}元 {{item.status}}</p>
        </div>
      </div>
    </div>
    <div class="lds-spinner" v-show="mask">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="mask" v-show="mask"></div>
  </div>
  
</template>

<script>
export default {
  name: "record",
  components: {},
  data() {
    return {     
      dwlogTypelist:["充值","提款"],
      dwlogType:"充值",
      logType:[
        {name:"全部",type:-1},
        {name:"申请中",type:0},
        {name:"核准",type:1},
        {name:"拒绝",type:2}],
      DlogType: [
        {name:"全部",type:-1},
        {name:"申请中",type:0},
        {name:"核准",type:1},
        {name:"拒绝",type:2}
      ],
      WlogType:[
        {name:"全部",type:-1},
        {name:"申请中",type:0},
        {name:"核准",type:1},
        {name:"拒绝",type:2},
        {name:"已出款",type:3}
      ],
      dwtype:"-1",
      dw:"0",    //0充值1提款
      message:[],
      status: "申请中",
      appAmt:"0",
      needFill: "",
      startTime: dateNow(),
      endTime: dateNow(),
      mask:false
    };
  },
  mounted: function() {},
  methods: {
    cDW:function(e){
      let _this = this;
      let dw = e.target.options.selectedIndex
      _this.dw = dw
      switch(dw){
        case 0:
        _this.logType = _this.DlogType
        break;
        case 1:
        _this.logType = _this.WlogType
      }
    },
    cdwtype: function(e){
      let _this = this
      let dwtype = _this.logType[e.target.options.selectedIndex].type
      _this.dwtype = dwtype
    },
    submit: function() {
        let _this = this;
        let {loginID,Authorization} = JSON.parse(this.getCookie("webs"));
        this.mask=true
        if(_this.dw == "0"){
          this.$axios(
          "QueryMemberDepositLog",
          {
            siteID: this.$global.siteID,
            loginID: loginID,
            sDate: _this.startTime,
            eDate: _this.endTime,
            logType: _this.dwtype,
            token: Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            var list = res.data
            var statusname = ""
            _this.dwlogType = _this.dwlogTypelist[0]
            _this.message = []
            list.forEach(function(v){
              switch (v.status) {
                    case -1:
                        statusname = "全部";
                        break;
                    case 0:
                        statusname = "申请中";
                        break;
                    case 1:
                        statusname = "核准";
                        break;
                    case 2:
                        statusname = "拒绝";
                        break;
                    default:
                        statusname = "其他";
                        break;
                }
              _this.message.push({
                status: statusname,
                appAmt: v.appAmt,
                logTime:v.logTime
              })
            });
            
           _this.mask=false
          }
        );
        }
        if(_this.dw == "1"){
           this.$axios(
          "QueryMemberWithdrawLog",
          {
            siteID:this.$global.siteID,
            loginID: loginID,
            sDate: _this.startTime,
            eDate: _this.endTime,
            logType: _this.dwtype,
            token: Authorization
          },
          function(resp) {
            var res = JSON.parse(resp.data);
            var list = res.data
            var statusname = ""
            _this.dwlogType = _this.dwlogTypelist[1]
            _this.message = []
            list.forEach(function(v){
              switch (v.status) {
                    case -1:
                        statusname = "全部";
                        break;
                    case 0:
                        statusname = "申请中";
                        break;
                    case 1:
                        statusname = "核准";
                        break;
                    case 2:
                        statusname = "拒绝";
                        break;
                    case 3:
                        statusname = "已出款";
                        break;
                    default:
                        statusname = "其他";
                        break;
                }
              _this.message.push({
                status: statusname,
                appAmt: v.appAmt,
                logTime:v.logTime
              })
            });
             _this.mask=false
          }
        );
        }
        
    }
  }
};
function dateNow() {
  return new Date().yyyymmdd();
}
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};
</script>

<style scoped>
.record-main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-top: 20px;
}
.record-content {
  border-radius: 5px;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5vmax;
}
.content-head {
  width: 91.73vmin;
  height: 4.5vmax;
  background-color: #c2c2c2;
  position: relative;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.content-head-date {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 3.2vmin;
  padding: 0.75vmax 1.33vmin;
}
.content-body {
  width: 91.73vmin;
  min-height: 10.49vmax;
  background-color: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.status {
  font-size: 3.73vmin;
  color: #999999;
  text-align: left;
  padding-bottom: 1.5vmax;
  padding-left: 2.67vmin;
}
.status-content {
  font-size: 3.73vmin;
  color: #f57e2f;
  text-align: left;
  padding-left: 2.67vmin;
}

.serchRecord{
    width: 18.67vmin;
    height: 4.5vmax;
    border-radius: 15px;
    box-shadow: 0 0.53vmin 0.53vmin 0 rgba(0, 0, 0, 0.2);
    background-image: linear-gradient(to bottom, #f1929c, #e35e74);
    border: none;
    color: #fff;
    margin-left: 1.33vmin;
    align-self: center;
}
.record-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.1vmax 0;
}
.record-title label {
  font-size: 3.73vmin;
  align-self: center;
  margin: 0 1.33vmin;
  padding-top: 0.5vmax;
}
.record-title label:nth-of-type(1) {
    font-size: 3.73vmin;
    -ms-flex-item-align: center;
    align-self: center;
    margin-right: 1.33vmin;
    margin-left: 0;
    padding-top: 0.5vmax;
}
.record-title2 {
  display: flex;
  justify-content: center;
}
.record-Field {
  width: 44.53vmin;
  height: 5.4vmax;
  margin-bottom: 3vmax;
  display: flex;
  align-self: center;
  position: relative;
  margin: 0 1.33vmin;
}
.record-Field div{
  border-bottom: 1px solid #c2c2c2;
  height: 5.4vmax;
}
.record-card {
  width: 44.53vmin;
  height: 5.4vmax;
  color: #666666;
  font-size: 3.2vmin;
  border: none;
  outline: none;
  appearance: none;
  align-self: center;
  padding-bottom: 0.3vmax;
  font-family:"Microsoft JhengHei","Heiti TC",sans-serif;
  background-color: #f2f2f2;
}
.record-Field img {
  width: 4.27vmin;
  height: 2.4vmax;
  position: absolute;
  top: 1.5vmax;
  right: 2.67vmin;
}
#startTime,
#endTime {
  width: 28.67vmin;
  border-radius: 18px;
  background-color: #ffffff;
  border: none;
  color: #999999;
  align-self: center;
  font-size: 3.2vmin;
  -webkit-appearance: none;
  display: block;
  text-align: right;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
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
