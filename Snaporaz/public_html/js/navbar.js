$(function () {
    $.getScript("../js/templateBuilder.js");
});

function search() {
    var title = $("#title").val();
    if (title) {
        window.location = 'search.html?title=' + title;
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        const alert = buildAlert("<strong>Logout</strong> effettuato con <strong>successo</strong>");
        $("#navbar").append(alert);
        document.cookie = "idTokenString=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log(document.cookie);
    });
}

function onSignIn(googleUser) {
    console.log("Mattarello");
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log(googleUser.getAuthResponse().id_token);
    $.post("http://localhost:42729/SnaporazSpring/login", {idTokenString: googleUser.getAuthResponse().id_token}, function (data) {
        document.cookie = "idTokenString=" + googleUser.getAuthResponse().id_token;
        console.log(document.cookie);
        $("#navbar").load("nav.html");
    });
}

function a() {
    $.get("http://localhost:42729/SnaporazSpring/info", function (data) {
        console.log(data);
    });
}