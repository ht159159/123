export const logout = function(vue){
    let webs = JSON.parse(vue.getCookie("webs"))
    let {loginID,Authorization} = webs

    vue.$axios('logout', {
            jsonString: {
                siteID: vue.$global.siteID,
                loginID: loginID
            },
            token: Authorization
        }, (resp)=>{          
            let json = JSON.parse(resp.data)          
            if(json.message){
              alert(json.message)
            }  
            var webs = {                
                loginID: null,
                balance: null,
                myip: null,
                Authorization: null,
                isMember: null,
                isTrial: null,
                memberID:null
            };
            vue.setCookie("webs", JSON.stringify(webs), 0.5); 
            vue.$store.dispatch("setisLogin",false)
            vue.$router.push({ path: '/login' });
        })
}


//赔率
export const _payRate = function(vue,_gameCode,_mode,_payrate){
    vue.$axios('payRate', { 
        jsonString: {
            siteID: vue.$global.siteID,
            gameCode: _gameCode,
            playMode: _mode
        },
        token: JSON.parse(vue.getCookie("webs")).Authorization   
    }, function (resp) {
        if (resp.status == 200) {
            var json = JSON.parse(resp.data); 
            if(json.error._error){     
                alert(json.error._error)
            }                      
           _payrate.value = json.info
        }
    })
}
//开盘时间
export const _getbettime = function(vue,_gameCode,_time) {
    vue.$axios('bettime', {
        siteID: vue.$global.siteID,
        gameCode: _gameCode
    }, function (resp) {
        if (resp.status == 200) {
            var json = JSON.parse(resp.data);     
            if (new Date(json.info.betTimeE) < new Date()) {
                _getbettime(vue,_gameCode,_time)
            }
            else{
                let panko = vue.$store.state.panko                
                panko.gameCode = _gameCode
                panko.openissueNo =json.info.issueNo; //期数   
                panko.preIssueNo = json.info.preIssueNo                
                
                _getgameresult(vue) 
                issueNoTrace(vue,_gameCode)           
                new timer(json.info).startTimer(vue,_gameCode,_time);  
            }                  
        }
        
    })
}
//会员状态
export const _getstatus = function(vue){    
    let webs = JSON.parse(vue.getCookie("webs"))
    let {loginID,Authorization} = webs
    vue.$axios(
        "getstatus",
        {
          jsonString: {
            siteID:  vue.$global.siteID,
            loginID: loginID
          },
          token:Authorization
        },
        function(resp) {            
            if(resp.status == 200){
                let statusjson = JSON.parse(resp.data);     
                webs.balance = statusjson.info.points;
                //更新vuex 状态
                vue.$store.dispatch("updateBalance",webs.balance)              
                vue.setCookie("webs", JSON.stringify(webs),0.5);   
            }       
        }
      );
}
export const _betting = function (vue){
    vue.$axios(
        "betting",
        {
          jsonString: vue.$store.state.bet,
          token: JSON.parse(vue.getCookie("webs")).Authorization
        },
        function(resp) {
          let json = JSON.parse(resp.data);
          vue.init()
          if (json.message == "投注成功") {            
            vue.alertSuc(json.message);           
            return;
          }
          else{              
              alert (json.error._error)            
          }
         
        }
      );
}
//取得游戏状态
export const gamestatus = function (vue,_gameCode,callback){
    vue.$axios('GameStatus',{siteID:vue.$global.siteID,gameCode:_gameCode},function(resp){
        let json = JSON.parse(resp.data)
        callback(json.info)        
    })
}
//开奖结果  
export const _getgameresult= function(vue) {
    let panko = vue.$store.state.panko       
    let _gameCode = panko.gameCode
    vue.$axios('GameResult',  {
        siteID:  vue.$global.siteID,
        gameCode: _gameCode
    }, function (resp) {
        if (resp.status == 200) {    
            var json = JSON.parse(resp.data);           
            
            var data = json.data;            
            let result=[], result2=[];
            
            result= resultstyle(data[0].gameRsl,_gameCode)
            result2 = resultstyle(data[0].gameZodiac,_gameCode)   

            if (panko.preIssueNo == data[0].issueNo) {
                panko.resultNo = data[0].issueNo;
                panko.result = result
                panko.result2 = result2

                panko.resulthistory=[]
                for (let i = 1; i < 6; i++) {
                    data[i].gameRsl = resultstyle(data[i].gameRsl,_gameCode)
                    data[i].gameZodiac = resultstyle(data[i].gameZodiac,_gameCode)
                    panko.resulthistory.push(data[i])                
                }
            }
            else {
                let nogameRsl = ['正', '在', '开', '奖', '中'];
                panko.resultNo = panko.preIssueNo;
                panko.result = nogameRsl

                panko.resulthistory=[]
                for (let i = 0; i < 5; i++) {
                    data[i].gameRsl = resultstyle(data[i].gameRsl,_gameCode)
                    data[i].gameZodiac = resultstyle(data[i].gameZodiac,_gameCode)
                    panko.resulthistory.push(data[i])                
                }
            }   
           
           
             //更新vuex 状态
             vue.$store.dispatch("updatepanko",panko)
        }
    })

}
//追號期數
function issueNoTrace(t,gameCode){  
  t.$axios('IssueNoTrace', { siteID: t.$global.siteID, gameCode: gameCode }, function(resp) {
    let json = JSON.parse(resp.data)
    t.$store.dispatch('updateIssueNoTrace', json.data)               
    })
}
function resultstyle(rsl,_gameCode){
    if (rsl != '') {
        var arr = rsl.split(',')

        switch (_gameCode) {
            case 'hk6'://六合彩开奖有 + 
                arr.splice(6, 0, '+')
                return arr
            case 'qxc':
                return new Array(arr[0] , arr[1] , arr[2] , arr[3])
            case 'bjkl8':
            arr.splice(1, 0, "+");
            arr.splice(3, 0, "+");
            arr.splice(5, 0, "=");
            return arr
            default:
                return arr
        }
    }
}

var timeout
export const cleartimer = function(){    
    clearInterval(timeout)
    console.log('clearTimer!')    
}

//倒时器
function timer(_gameinfo) {
    var timenow = new Date();
    var bettimeE = Date.parse(_gameinfo.betTimeE.replace(/-/g, '/').replace('T', ' '))
    var intDiff = parseInt((bettimeE - timenow) / 1000); //倒计时总秒数量
    var hour = 0, minute = 0, second = 0;//时间默认值     
    this.startTimer = function (vue,_gameCode,_time) {
        console.log('starTimer!')
        timeout = setInterval(function () {
            if (intDiff > 0) {
                hour = Math.floor(intDiff / 3600);
                minute = Math.floor(intDiff / 60) - (hour * 60);
                second = Math.floor(intDiff) - (hour * 60 * 60) - (minute * 60);
                if (hour <= 9) hour = "0" + hour; //格式设置
                if (minute <= 9) minute = "0" + minute;
                if (second <= 9) second = "0" + second;
                _time.value=hour + ":" + minute + ":" + second; //时间
                                      
            }
            if (intDiff == 0) {
                vue.$refs.bf.closemsg=true
                _getbettime(vue,_gameCode,_time);                             
                clearInterval(timeout);

            }
            

            intDiff--;

        }, 1000);        
    }
}


//-------------------一堆公式-------------------------
// C幾取N公式             n       c
export const combination=function(num_len, min_qty) {
    if (num_len < min_qty) {
        return 0;
    }
    var a = 1, b = 1, i = 0;
    for (i = 0; i < min_qty; i++) {
        a = a * (num_len - i);
        b = b * (min_qty - i);
    }
    return parseInt(a / b);
}
export const uniquearr = function(arr1, arr2) {	//去除重複(膽號)
    var arr = [];
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) < 0) {
            arr.push(arr2[i]);
        }
    }
    return arr;
}

export const computeAllHeZhuCount = function (count) {	//直選合值的注數(幾顆)
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    if (count == 2) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                key = (n1 + n2) + '';
                if (numQty.hasOwnProperty(key)) {
                    numQty[key] = numQty[key] + 1;
                } else {
                    numQty[key] = 1;
                }
            }
        }
    } else if (count == 3) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                for (n3 = 0; n3 < 10; n3++) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}
export const computeZxHeZhuCount = function (count) {	//組選和值的注數 几颗
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    if (count == 2) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = n1; n2 < 10; n2++) {
                if (n1 != n2) {
                    key = (n1 + n2) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }

            }
        }
    }
    else if (count == 3) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = n1; n2 < 10; n2++) {
                for (n3 = n2; n3 < 10; n3++) {
                    if (n1 != n2 || n2 != n3 || n1 != n3) {
                        key = (n1 + n2 + n3) + '';
                        if (numQty.hasOwnProperty(key)) {
                            numQty[key] = numQty[key] + 1;
                        } else {
                            numQty[key] = 1;
                        }
                    }
                }
            }
        }
    }
    return numQty;
}
export const computeZxHeZhu3Count = function () {	//組三和值的注數
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    for (n1 = 0; n1 < 10; n1++) {
        for (n2 = n1; n2 < 10; n2++) {
            for (n3 = n2; n3 < 10; n3++) {
                if ((n1 == n2 && n2 != n3 && n1 != n3) ||
			(n1 != n2 && n2 == n3 && n1 != n3) ||
			(n1 != n2 && n2 != n3 && n1 == n3)) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}
export const computeZxHeZhu6Count = function () {	//組六和值的注數
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    for (n1 = 0; n1 < 10; n1++) {
        for (n2 = n1; n2 < 10; n2++) {
            for (n3 = n2; n3 < 10; n3++) {
                if (n1 != n2 && n2 != n3 && n1 != n3) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}
export const computeAllKdZhuCount = function (count) {	//直選跨度的注數(幾顆)
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '', n_arr = [], n_max = 0, n_min = 0;
    if (count == 2) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                key = (Math.abs(n1 - n2)) + '';
                if (numQty.hasOwnProperty(key)) {
                    numQty[key] = numQty[key] + 1;
                } else {
                    numQty[key] = 1;
                }
            }
        }
    } else if (count == 3) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                for (n3 = 0; n3 < 10; n3++) {
                    n_arr = [n1, n2, n3];
                    n_max = Math.max.apply(null, n_arr);
                    n_min = Math.min.apply(null, n_arr);
                    key = (n_max - n_min) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}

// 結果賠率計算
export const calPayRate=function(payRate,rebatRate) {    
    const digital = 10000;
    if (!payRate) return;

    if (payRate.multiple) {
        const multiple = calMultiple(payRate, rebatRate)
        const multipleRate = multiple / payRate.multipleBase
        return Math.floor(payRate.payRateMax * digital * multipleRate) / digital            
    }

    if (rebatRate === 0) return payRate.payRateMax;
    return Math.floor((payRate.payRateMax - (rebatRate * (payRate.payRateMax - payRate.payRateMin)) / payRate.rebatRate) * digital) / digital

}
export const calPayRate2=function(payRate, rebatRate) {
    const digital = 10000;
    if (!payRate) return;

    if (payRate.multiple) {
        const multiple = calMultiple(payRate, rebatRate)
        const multipleRate = multiple / payRate.multipleBase
        return Math.floor(payRate.payRate2Max * digital *  multipleRate) / digital
    }

    if (rebatRate === 0) return payRate.payRate2Max;
    return Math.floor((payRate.payRate2Max - (rebatRate * (payRate.payRate2Max - payRate.payRate2Min)) / payRate.rebatRate) * digital) / digital

}
function calMultiple(payRate, rebatRate) {
    if (!payRate) return;
    if (!payRate.multiple) return;
    if (rebatRate === 0) return payRate.multipleMax

    return payRate.multipleMax - Math.round(payRate.multipleBase * rebatRate / 100);
}

//产生随机数
export const randomRangeId=function(num){
    var returnStr = "",       
        charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    for(var i=0; i<num; i++){
        var index = Math.round(Math.random() * (charStr.length-1));
        returnStr += charStr.substring(index,index+1);
    }
    return returnStr;
}
