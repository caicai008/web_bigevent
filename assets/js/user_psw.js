$(function () {

    let form = layui.form
    let layer = layui.layer

    // 密码校验啊规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 重置密码
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    // return layer.msg('更新密码失败！')
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        });
    });
})