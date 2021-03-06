$(function () {
    var sgenres = $('select[name="genres"]');

    //costruzione select ruoli
    $.get(BASE_URL + "genres", function (data) {
        const template = buildSelect(data);
        sgenres.append(template);
        sgenres.selectpicker("refresh");
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });

    //slider donazioni
    $("#check").click(function () {
        if ($(this).is(':checked')) {
            $("#money").slideDown(500);
        } else {
            $("#money").slideUp(500);
        }
    });

    //immagine
    $("#load-img").click(function () {
        $("#thumbnail").attr("src", $("#url-img").val());
    });

    //errore immagine
    $("#thumbnail").on("error", function () {
        $(this).attr("src", "../img/project_placeholder.png");
    });

    //nuovo progetto
    $("#newproject").submit(function (e) {
        e.preventDefault();
        var title = $('input[name="title"]').val();
        var genres = sgenres.val().join();
        var plot = $('textarea[name="plot"]').val();
        var img = $('input[name="img"]').val();
        var objective = 0;
        var rewards = "";

        if ($('input[name="objective"]').val()) {
            objective = $('input[name="objective"]').val();
        }

        if ($('textarea[name="rewards"]').val()) {
            rewards = $('textarea[name="rewards"]').val();
        }

        $.post(BASE_URL + "newProject", {idTokenString: Cookies.get('token'), title: title, genres: genres, plot: plot, img: img, min: objective, prizes: rewards, owner: 0}, function (data) {
            if (data.response) {
                const alert = buildAlert(data.response);
                $("#navbar").append(alert);
            } else {
                window.location = 'project.html?id=' + data.id;
            }
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    });
});
