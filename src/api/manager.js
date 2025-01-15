import axios from '../assets/axiosInstance.js'

//第一页数据提交
export function pay(type,appName,data){
    return axios.post("/pay/chinaums/h5pay/"+appName+"/"+type,data)
}


//微信支付
export function wxPay(type,appName,data){
    return axios.post("/pay/wx/h5pay/"+appName+"/"+type,data)
}