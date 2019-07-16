const BASE_URL = "http://localhost:42729/SnaporazSpring/";
//errore immagine
function imgError() {
    $("#thumbnail").attr("src", "../img/user_placeholder.png");
    $('input[name="img"]').val('');
}