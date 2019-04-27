function search() {
    var title = $("#title").val();
    if (title) {
        window.location = 'search.html?title=' + title;
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        Cookies.set('token', "");
        Cookies.set('id', "");
        Cookies.set('name', "");
        Cookies.set('surname', "");
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var token = googleUser.getAuthResponse().id_token;
    $.post(BASE_URL + "login", {idTokenString: token}, function (data) {
        Cookies.set('token', token);
        Cookies.set('id', data.UserId);   
        Cookies.set('name', data.UserName);   
        Cookies.set('surname', data.UserSurname);   
        $("#navbar").load("nav.html");
    });
}

function profile(){
    window.location = 'user.html?id=' + Cookies.get('id');
}

function projects(){
    window.location = 'search.html?name=' + Cookies.get('name') + "&surname=" + Cookies.get('surname');
}

function collabs(){
    window.location = 'search.html?collab=' + Cookies.get('surname');
}

$(function () {
    $("#username").html(Cookies.get('name'));
});