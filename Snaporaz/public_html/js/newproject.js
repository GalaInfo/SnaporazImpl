$(function () {
    $("#check").click(function () {
        if ($(this).is(':checked')) {
            $("#money").slideDown(500);
        } else {
            $("#money").slideUp(500);
        }
    });
    $("#load-img").click(function () {
        $("#thumbnail").attr("src", $("#url-img").val());
    });
    $("#thumbnail").error(function () {
        $(this).attr("src", "img/placeholder.png");
    });
});
