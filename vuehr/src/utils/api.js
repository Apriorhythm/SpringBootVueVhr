import axios from 'axios'
import {Message} from 'element-ui'

/* ########### 拦截器 ########### */
// success: 是服务器响应的数据
// success.status: HTTP响应的状态
// success.data.status: 后台RespBean返回数据中设置的status
axios.interceptors.response.use(success => {
    // 登录异常
    if (success.status && success.status == 200 && success.data.status == 0) {
        Message.error({message:success.data.msg});
        return;
    }
    if (success.data.msg) {
        Message.success({message:success.data.msg})
    }

    // 登录成功
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message:'找不到服务器'});
    } else if (error.response.status == 403) {
        Message.error({message:'权限不足，请联系管理员'});
    } else if (error.response.status == 401) {
        Message.error({message:'尚未登录，请登录'});
    } else {
        if (error.response.data.msg) {
            Message.error({message:error.response.data.msg});
        } else {
            Message.error({message:'未知错误'});
        }
    }
    return;
});
/* ##########* 拦截器 *########## */



/* ########### 封装请求 ########### */
let base = '';


// key-value 形式封装
// 后端默认不支持 json 登录传参数，只能使用 key-value 形式
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}


// json 形式封装
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    });
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    });
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    });
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    });
}



/* ##########* 封装请求 *########## */




