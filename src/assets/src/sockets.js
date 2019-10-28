import { _getgameresult, _getstatus,logout } from '@/assets/src/forgame.js'


export const socketMessage = function (vue, msg) {
    //console.log(msg)
    switch (msg.model) {
        case 'ltgame':
            {
                if (msg.data) {
                    if (msg.verb == 'update') { //開獎通知
                        if (msg.data.indexOf(vue.$store.state.panko.gameCode) >= 0) {
                            _getgameresult(vue)
                        }
                    }
                }
                break;
            }   
        case 'ltsgame': {//自開彩開獎 = 結算
            if (msg.data) {
                if (msg.data.indexOf(vue.$store.state.panko.gameCode) >= 0) {
                    _getgameresult(vue)
                }
            } 
            break;
        }           
        case 'points': {
            _getstatus(vue)
            break;
        }
        case 'member':{
            if (msg.verb == 'join') {
                let _web = JSON.parse(vue.getCookie("webs"))
                let au = _web.Authorization
                if (au != '') {
                    if (au != msg.data.token) {
                        logout(vue)
                    }
                }
            }
            break;
        }
    }
}

