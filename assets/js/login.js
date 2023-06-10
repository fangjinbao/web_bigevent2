$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer
    //自定义表单校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        rePwd: function (value) {
            if ($('.reg-box [name=password]').val() !== value) {
                return '两次密码不一致'
            }
        },
    })

    //注册用户
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/regUser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功', { time: 1000 }, function () {
                $('#link_login').click()
            })
        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功', { time: 1000 }, function () {
                    localStorage.setItem('token', res.token)
                    // location.href = '/index.html'
                })
            },
        })
    })
})
