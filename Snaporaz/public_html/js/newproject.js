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
    $("#thumbnail").on("error", function () {
        $(this).attr("src", "../img/project_placeholder.png");
    });
    $("#newproject").submit(function (e) {
        e.preventDefault();
        var title = $('input[name="title"]').val();
        var genres = $('select[name="genres"]').val().join();
        var plot = $('textarea[name="plot"]').val();
        var img = $('input[name="img"]').val();
        var objective = $('input[name="objective"]').val();
        var rewards = $('textarea[name="rewards"]').val();

        $.post("http://localhost:42729/SnaporazSpring/project", {title: title, genres: genres, plot: plot, img: img, min: objective, prizes: rewards, owner: 0});
    });
});
