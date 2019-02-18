$(function () {
    if(Cookies.get('token') === "undefined"){
        $("#navbar").load("nav.html");
    }else{
        $("#navbar").load("nav_1.html");
    }
    
});


