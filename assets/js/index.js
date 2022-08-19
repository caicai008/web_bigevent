$(function () {

    getUserInfo()

    // 退出登录
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        //弹出提示框
        layer.confirm('确定要退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //清空本地存储
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = './login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                return console.log(res);
            }
            // console.log(res);
            // 调用用户信息
            renderAvatar(res.data)
        },

    });
    // console.log(localStorage.getItem('token'));
}

function renderAvatar(user) {
    let uname = user.nickname || user.username
    $('#wellcome').html('欢迎&nbsp;&nbsp;' + uname)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}