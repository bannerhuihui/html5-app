import axios from '../assets/axiosInstance.js'

//第一页数据提交
export function pay(type,data){
    return axios.post("/pay/chinaums/h5pay/"+type,data)
}