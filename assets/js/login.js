$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    });

    let form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        repass: function (value) {
            let val = $('#psd').val()
            if (val !== value) {
                return '密码不一致！'
            }
        }
    })


    // 注册账号
    $('#form_reg').submit(function (e) {
        e.preventDefault();
        let username = $('#uname').val()
        let psd = $('#psd').val()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: username,
                password: psd
            },
            success: function (res) {
                if (res.status !== 0) {
                    // return console.log(res);
                    layer.msg(res.message)
                }
                // console.log(res);
                layer.msg('注册成功，请登录！', { icon: 6 })
                $('#link_login').click()

            }
        });
    });

    // 登录验证
    $('#form_login').submit(function (e) {
        e.preventDefault();
        // let username = $('#loginName').val()
        // let psd = $('#loginPsd').val()
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取当前表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { //status一定记住写！！！！！！！！！！！！！
                    // console.log(res.message);
                    return layer.msg('登陆失败')
                }
                // console.log(res.message);

                layer.msg('登陆成功')

                localStorage.setItem('token', res.token)
                // 跳转到主页
                location.href = './index.html'
            }
        });
    });
})