$(function () {
    $.get(BASE_URL, function (data) {
        //most funded
        $.each(data.mostFundedProjects, function (i, v) {
            const template = buildProjectThumbnail(v);
            $("#funded").append(template);
            if (v.min > 0) {
                $(".tohide").show();
            }
        });
        //closest
        $.each(data.closestProjects, function (i, v) {
            const template = buildProjectThumbnail(v);
            $("#close").append(template);
            if (v.min > 0) {
                $(".tohide").show();
            }
        });
        //most recent
        $.each(data.mostRecentProjects, function (i, v) {
            const template = buildProjectThumbnail(v);
            $("#recent").append(template);
            if (v.min > 0) {
                $(".tohide").show();
            }
        });
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });
});
