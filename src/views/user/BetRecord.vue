<template>
  <div class="content betRecord">
    <div class="record-title">
      <label for="startTime">时间</label>
      <input type="date" id="startTime" required="required" v-model="startTime">
      <label for="endTime">至</label>
      <input type="date" id="endTime" required="required" v-model="endTime">
      <button class="serchRecord" @click="search">查询</button>
    </div>
    <div class="record-title2">
      <div class="record-Field">
        <div class>
          <select class="record-card" v-model="gameCode" @change="search">
            <option value selected>所有类型</option>
            <option
              v-bind:key="g.gameCode"
              v-for="g in gameArray"
              :value="g.gameCode"
            >{{g.gameName}}</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
      <div class="record-Field">
        <div class>
          <select class="record-card" v-model="queryType" @change="search">
            <option value="-1">所有投注</option>
            <option value="1">一般投注</option>
            <option value="2">追单投注</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
      <div class="record-Field1">
        <div class>
          <select class="record-card1" v-model="datetype" @change="quickdate">
            <option value="1">今日</option>
            <option value="-1">昨日</option>
            <option value="7">本周</option>
            <option value="-7">上周</option>
          </select>
        </div>
        <img src="@/assets/img/icon_list_down.png" alt>
      </div>
    </div>

    <div class="record-main">
      <div class="record-content" v-for="(item,index) in betRecordData" :key="item.betNo">
        <div class="content-head">
          <h2 class="content-head-title">{{item.gameName}}</h2>
          <p class="content-head-period">
            第
            <span class="content-head-periodNum">{{item.issueNo}}</span>期
          </p>
        </div>
        <div class="content-body"
        :class="{open:detailSwitch == index}">
          <div class="content-body-simple">
            <p>
              投注 :
              <span>{{item.totalAmt}}元</span>
            </p>
            <p>
              赔率 :
              <span>{{item.payRate}}</span>
            </p>
            <p>
              中奖 :
              <span>{{item.resultAmt}}元</span>
            </p>
            <p>
              状态 :
              <span>{{item.status}}</span>
            </p>
          </div>
          <div
            class="content-body-detail"
            @click="detailSwitch = NaN"
          >
            <p>
              下注时间 :
              <span>{{item.betTime}}</span>
            </p>
            <p>
              注单号 :
              <span>{{item.betNo}}</span>
            </p>
            <p>
              开奖结果 :
              <span>{{item.gameRsl}}</span>
            </p>
            <p>
              投注内容 :
              <span class="orange">{{item.playType}}</span>
            </p>
            <p>
              <span>{{getDetailContent(item)}}</span>
            </p>
            <p>
              中奖是否取消追单 :
              <span>{{item.autoCancel==0?'否':'是'}}</span>
            </p>
          </div>
        </div>
        <div class="content-footer" @click="detail(index)">
          <h3>
            明细
            <img src="@/assets/img/icon_down.png" v-show="detailSwitch != index">
            <img src="@/assets/img/icon_up.png" v-show="detailSwitch == index">
          </h3>
        </div>
      </div>
      <div class="paginateMoney">
        <div class="betAmount">
          <img src="@/assets/img/icon_betAmount1.png" alt>
          <div>
            <p>分页投注金额</p>
            <p>{{betRecordInfo.pageTotalAmt}}</p>
          </div>
        </div>
        <div class="betBouns">
          <img src="@/assets/img/icon_bonus1.png" alt>
          <div>
            <p>分页中奖金额</p>
            <p>{{betRecordInfo.pageResultAmt}}</p>
          </div>
        </div>
      </div>
      <paginate
        :page-count="betRecordInfo.pages!=undefined?betRecordInfo.pages:1"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'pageItem'"
      ></paginate>
      <div class="totalMoney">
        <div class="totalBetAmount">
          <img src="@/assets/img/icon_betAmount_total.png" alt>
          <div>
            <p>总投注金额</p>
            <p>{{betRecordInfo.sumTotalAmt}}</p>
          </div>
        </div>
        <div class="totalBetBouns">
          <img src="@/assets/img/icon_bonus_total.png" alt>
          <div>
            <p>总中奖金额</p>
            <p>{{betRecordInfo.sumResultAmt}}</p>
          </div>
        </div>
        <img
          class="betReport"
          src="@/assets/img/icon_Report.png"
          alt
          @click=" reportMask = 1,report = 1 "
        >
      </div>
    </div>
    <!-- 个人报表 -->
    <div class="report" v-show=" report == 1">
      <div class="report-title">
        <h1>个人报表</h1>
      </div>
      <div class="report-content">
        <div>
          <p>
            总注数 :
            <span>{{betRecordInfo.sumQuantity}}</span>
          </p>
        </div>
        <div>
          <div>
            <p>投注</p>
            <span>{{betRecordInfo.sumTotalAmt}}</span>
          </div>
          <div>
            <p>派彩</p>
            <span>{{betRecordInfo.sumResultAmt}}</span>
          </div>
          <div>
            <p>反水</p>
            <span>{{betRecordInfo.sumRebatAmt}}</span>
          </div>
          <div>
            <p>红利</p>
            <span>0</span>
          </div>
        </div>
        <button @click=" reportMask = 0 ,report = 0">关闭</button>
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
import Paginate from "vuejs-paginate";

export default {
  name: "betRecored",
  components: {
    paginate: Paginate
  },
  data() {
    return {
      startTime: dateNow(),
      endTime: dateNow(),
      detailSwitch: NaN,
      gameArray: [],
      betRecordInfo: {},
      betRecordData: [],
      gameCode: "",
      queryType: -1,
      pageSize: 10,
      pageIndex: 1,
      report: 0,
      reportMask: 0,
      datetype: 1,
      mask:false
    };
  },
  mounted: function() {
    let _this = this;
    this.$axios("AllGameStatus", { siteID: this.$global.siteID }, function(
      resp
    ) {
      let json = JSON.parse(resp.data);
      _this.gameArray = json.data.filter(function(e){
        return e.gameStatus != 0
      });   

    });
    this.search();
    
  },
  methods: {
    detail:function(index){
      if(index == this.detailSwitch){return this.detailSwitch = undefined;}
      this.detailSwitch = index;
    },
    clickCallback: function(pageNum) {
      this.pageIndex = pageNum;
      this.search();
      window.scrollTo(0,0);
    },
    search() {
      this.mask = true;
      let _this = this;
      let _webs = JSON.parse(this.getCookie("webs"));
      this.$axios(
        "BetRecordRange",
        {
          jsonString: {
            siteID:this.$global.siteID,
            loginID: _webs.loginID,
            gameCode: this.gameCode,
            authType: true, // - 驗證回應方式;預設FALSE(驗證失敗回應200)，TRUE(驗證失敗回應401),
            status: -1, //- -1-所有狀態;1:待開獎;2:結算;3:追單取消;4:停開;5:取消,
            queryType: this.queryType, //- -1-所有投注;1-一般投注;2-追單投注,
            sDate: this.startTime,
            eDate: this.endTime,
            pageSize: this.pageSize, //- 每頁筆數,
            pageIndex: this.pageIndex //- 查詢頁碼,
          },
          token: _webs.Authorization
        },
        function(resp) {
          if (resp.status == 200) {
            let json = JSON.parse(resp.data);
            _this.betRecordData = json.data;
            _this.betRecordInfo = json.info;
            _this.mask = false;
            if(json.error._error){
                alert(json.error._error)
                _this.$router.push({ path: '/login' });
            } 
          }
        }
      );
    },
    quickdate() {
      switch (this.datetype) {
        case "1":
          this.startTime = dateNow();
          this.endTime = dateNow();
          break;
        case "-1":
          this.startTime = yesterdate();
          this.endTime = yesterdate();
          break;
        case "7":
          this.startTime = getWeekStartDate();
          this.endTime = getWeekEndDate();
          break;
        case "-7":
          this.startTime = getLastWeekStartDate();
          this.endTime = getLastWeekEndDate();
          break;
      }
      this.search();
    },
    getDetailContent(v) {
      let betcontent = "";
      if (v.pos0 != "") betcontent += v.pos0Prefix + ":" + v.pos0;
      if (v.pos1 != "") betcontent += v.pos1Prefix + ":" + v.pos1;
      if (v.pos2 != "") betcontent += v.pos2Prefix + ":" + v.pos2;
      if (v.pos3 != "") betcontent += v.pos3Prefix + ":" + v.pos3;
      if (v.pos4 != "") betcontent += v.pos4Prefix + ":" + v.pos4;
      if (v.pos5 != "") betcontent += v.pos5Prefix + ":" + v.pos5;
      if (v.pos6 != "") betcontent += v.pos6Prefix + ":" + v.pos6;
      if (v.pos7 != "") betcontent += v.pos7Prefix + ":" + v.pos7;
      if (v.pos8 != "") betcontent += v.pos8Prefix + ":" + v.pos8;
      if (v.pos9 != "") betcontent += v.pos9Prefix + ":" + v.pos9;
      return betcontent;
    }
  },
  destroyed(){
    window.scrollTo(0,0);
  }
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [
    this.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd
  ].join("-");
};

var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getFullYear(); //当前年

function dateNow() {
  return new Date().yyyymmdd();
}
function yesterdate() {
  return new Date(nowYear, nowMonth, nowDay - 1).yyyymmdd();
}
//获得本周的开始日期
function getWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek).yyyymmdd();
}
//获得本周的结束日期
function getWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek)).yyyymmdd();
}
//获得上周的开始日期
function getLastWeekStartDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7).yyyymmdd();
}
//获得上周的结束日期
function getLastWeekEndDate() {
  return new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1).yyyymmdd();
}
</script>
<style>
.pagination {
  display: flex;
  justify-content: space-around;
}
.pagination li {
  width: 30px;
  height: 30px;

  border-radius: 20px;
  display: flex;
  justify-content: center;
}
.pagination li a {
  align-self: center;
  outline: none;
}
.pagination .pageItem.active {
  background-color: #feb433;
  color: #fff;
}
.paginateMoney {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
</style>

<style scoped>
.record-main {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 15px;
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
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  display: flex;
  justify-content: flex-start;
}
.content-head-title {
  color: #ffffff;
  font-weight: bold;
  padding: 0 2.67vmin;
  align-self: center;
}
.content-head-period {
  color: #ffffff;
  font-weight: bold;
  padding: 0 2.67vmin;
  align-self: center;
  font-size: 2.67vmin;
  padding-top: 0.6vmax;
}
.content-body {
  width: 91.73vmin;
  height: 10.49vmax;
  background-color: #ffffff;
  overflow: hidden;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
}
.content-body.open{
  /* min-height:31.48vmax; */
  height:31.48vmax;
  animation-name:open;
  animation-duration :0.5s;
  animation-fill-mode:both;
  padding-bottom: 5.25vmax;
}
@keyframes open {
    0%{
        height:10.49vmax
    }
    100% {
        /* height:31.48vmax; */
        height:31.48vmax;
    }
}
.content-body-simple {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 10.49vmax;
}
.content-body-simple p {
  width: 40vmin;
  margin: 0.75vmax 0;
  color: #999999;
  align-self: center;
}
.content-body-simple p:nth-of-type(odd) {
  text-align: left;
}
.content-body-simple p:nth-of-type(even) {
  text-align: right;
}
.content-body-simple p span {
  color: #f57e2f;
}
.content-body-detail {
  border-top: 1px solid #999999;
  text-align: left;
  padding: 1.33vmin 0 1.33vmin 2.67vmin;
}
.content-body-detail p {
  padding: 1.33vmin 0 1.33vmin 0;
  color: #999999;
  font-size: 14px;
}
.content-body-detail p span {
  color: #666666;
}
.content-body-detail .orange {
  background-color: #f57e2f;
  padding: 1px 3px;
  color: #ffffff;
  border-radius: 5px;
}

.content-footer {
  width: 91.73vmin;
  height: 4.5vmax;
  background-image: linear-gradient(to bottom, #eec069, #ff944d);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  position: relative;
}
.content-footer h3 {
  color: #fff;
  align-self: center;
  font-size: 3.73vmin;
}
.content-footer img {
  position: absolute;
  top: 1.5vmax;
  right: 42%;
  width: 2.67vmin;
  height: 1.5vmax;
}
.status {
  font-size: 3.73vmin;
  color: #999999;
  text-align: left;
  padding-bottom: 10px;
  padding-left: 10px;
}
.status-content {
  font-size: 3.73vmin;
  color: #f57e2f;
  text-align: left;
  padding-left: 10px;
}

.serchRecord {
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
  width: 33.87vmin;
  height: 5.4vmax;
  margin-bottom: 3vmax;
  display: flex;
  align-self: center;
  position: relative;
  margin: 0 1.07vmin;
}
.record-Field div,
.record-Field1 div {
  border-bottom: 1px solid #c2c2c2;
  height: 5.4vmax;
}
.record-Field1 {
  width: 18.67vmin;
  height: 5.4vmax;
  margin-bottom: 3vmax;
  display: flex;
  align-self: center;
  position: relative;
  margin: 0 1.07vmin;
}
.record-card {
  width: 32.54vmin;
  height: 5.4vmax;
  color: #666666;
  font-size: 3.2vmin;
  border: none;
  outline: none;
  appearance: none;
  align-self: center;
  padding-left: 1.33vmin;
  padding-bottom: 0.3vmax;
  font-family:"Microsoft JhengHei","Heiti TC",sans-serif;
  background-color: #f2f2f2;
}
.record-card1 {
  width: 17.34vmin;
  height: 5.4vmax;
  color: #666666;
  font-size: 3.2vmin;
  border: none;
  outline: none;
  appearance: none;
  align-self: center;
  padding-left: 1.33vmin;
  padding-bottom: 0.3vmax;
  font-family:"Microsoft JhengHei","Heiti TC",sans-serif;
  background-color: #f2f2f2;
}

.record-Field img,
.record-Field1 img {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.betAmount,
.betBouns {
  width: 42.67vmin;
  height: 9vmax;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  margin: 0 12px;
}
.betAmount img,
.betBouns img,
.totalBetAmount img,
.totalBetBouns img {
  width: 10.13vmin;
  align-self: center;
}
.betAmount > div,
.betBouns > div,
.totalBetAmount > div,
.totalBetBouns > div {
  align-self: center;
  text-align: left;
  margin-left: 14px;
  font-size: 14px;
}
.betAmount p:nth-of-type(2),
.betBouns p:nth-of-type(2),
.totalBetAmount p:nth-of-type(2),
.totalBetBouns p:nth-of-type(2) {
  margin-top: 2px;
  color: #f57e2f;
}
.totalMoney {
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  position: fixed;
  bottom: 7.8vmax;
  display: flex;
  justify-content: space-around;
}
.totalBetAmount,
.totalBetBouns {
  width: 42.67vmin;
  display: flex;
  justify-content: center;
}
.betReport {
  width: 5.33vmin;
  height: 3vmax;
  margin-right: 2.67vmin;
  align-self: center;
}
.report {
  width: 74.67vmin;
  height: 40.48vmax;
  border-radius: 5px;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.report-title {
  width: 74.67vmin;
  height: 6vmax;
  background-image: linear-gradient(to bottom, #ffb933, #f57e2f);
  display: flex;
  justify-content: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
.report-title h1 {
  align-self: center;
  color: #ffffff;
}

.report-content > div > p:nth-of-type(1) {
  margin: 28px 0 20px 20px;
}
.report-content > div p:nth-of-type(1) span {
  color: #80c269;
  font-weight: bold;
}
.report-content > div:nth-of-type(2) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.report-content > div:nth-of-type(2) div {
  width: 100px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.report-content > div:nth-of-type(2) div span {
  color: #feb433;
  font-weight: bold;
}
.report-content button {
  width: 120px;
  height: 30px;
  border-radius: 15px;
  box-shadow: 0 0.3vmax 2px 0 rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to bottom, #cecece, #6d6d6d);
  color: #ffffff;
  border: none;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  outline: none;
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
