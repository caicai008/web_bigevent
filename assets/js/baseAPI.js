$.ajaxPrefilter(function (options) {
    // 拼接接口
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);

    // 自动请求权限
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空本地存储
            localStorage.removeItem('token')
            // 强制回到登录页面
            location.href = './login.html'

        }
    }
})