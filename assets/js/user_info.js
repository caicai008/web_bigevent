$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '密码长度不能超过6位！'
            }
        }
    })
    initUserInfo()

    // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('身份信息获取失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        });
    }

    // 设置重置按钮
    $('#reset').click(function (e) {
        e.preventDefault();
        initUserInfo()
    });

    // 更新提交信息
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('提交信息失败！')
                }
                layer.msg('提交信息成功！')
                window.parent.getUserInfo()
            }
        });
    });
})