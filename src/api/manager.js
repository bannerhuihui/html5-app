import axios from '../assets/axiosInstance.js'

//用户登录操作
export function checkUrl (appName,appType,arg){
    return axios.get("/page/goto/"+appName+"/"+appType+"?arg="+arg)
}

//第一页数据提交
export function firstPageCommit(data){
    return axios.post("/ai/info/yuanmeng/next",data)
}

//获取上一页数据 
export function getQuestionBefor(data){
    return axios.post("/ai/info/yuanmeng/before",data);
}

//获取最后一题数据 
export function getQuestionEnd(data){
    return axios.post("/ai/info/yuanmeng/end",data);
}

//获取下一题数据
export function getQuestionNext(data){
    return axios.post("/ai/info/yuanmeng/next",data);
}

//最后添加的一个页面，判断用户的最后选择
export function getLastType(data){
    return axios.post("/ai/info/yuanmeng/last/type",data);
}

//TemplateVue第一个页面，加载数据
export function getTemplateById(data){
    return axios.post("/page/question/context/id",data);
}
