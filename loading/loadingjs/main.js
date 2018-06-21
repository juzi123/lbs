$("#sign_in_btn").click(function(){
    $(".roll_panel").removeClass('showUp')
    $(".sign_up_text").removeClass('showUp')
    $(".sign_in_text").removeClass('showUp')
    $(".sign_up_btn").removeClass('showUp')
    $(".sign_in_btn").removeClass('showUp')
    $(".sign_up").removeClass('showUp')
    $(".sign_in").removeClass('showUp')
});
$("#sign_up_btn").click(function(){
    $(".roll_panel").addClass('showUp')
    $(".sign_up_text").addClass('showUp')
    $(".sign_in_text").addClass('showUp')
    $(".sign_up_btn").addClass('showUp')
    $(".sign_in_btn").addClass('showUp')
    $(".sign_up").addClass('showUp')
    $(".sign_in").addClass('showUp')
});
$("#signUpSubmit").click(function(){
    $.post("http://120.79.251.134/space/public/api/v1/user/register", {username: signUpName.value, password: signUpPassword.value, phone: signUpTelephone.value}, 
    function(data) {
        if(data.errorCode === 4003){
            console.log('用户名已被注册')
        }else if(data.errorCode === 0) {
            console.log('注册成功')
        }
    }, "json");
})
$("#signInSubmit").click(function(){
    $.post("http://120.79.251.134/space/public/api/v1/user/login", {username: signInName.value, password: signInPassword.value}, 
    function(data) {
        if(data.errorCode === 4004){
            console.log('查找不到该用户')
        } else if (data.errorCode === 4005) {
            console.log('密码错误')
        } else {
            sessionStorage.setItem('userId', data.id);
            window.location = '../mainpage/index.html';
        }
    }, "json");
})
