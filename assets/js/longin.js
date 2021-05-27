$(function(){
    $("#link_reg").on('click',function(){
        $(".reg-box").show();
        $('.login-box').hide();
    })
    $("#link_login").on('click',function(){
        $(".reg-box").hide();
        $('.login-box').show();
    })
    // 表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(){
            // 判断两次密码框里面的值是否一致
            if($("#repwd").val() !== $("#pwd").val()){
                return "两次密码不一致";
            }
        }
    });

    $('#form_reg').on('submit',function(e){
        // 阻止默认提交行为
        e.preventDefault();
        // 获取数据
        var data = { 
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
            }
            
        
        // 发起POST请求
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！');
            $("#link_login").click();
        })
    });

    $("#form_login").on('submit', function(e){
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败！');
                };
                layer.msg('登录成功！');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token',res.token);
                // 跳转到主页
                location.href = 'index.html';
            }
        })
       
    })
    
})