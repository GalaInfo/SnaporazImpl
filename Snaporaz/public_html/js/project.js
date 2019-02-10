$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        $.get("http://localhost:42729/SnaporazSpring/project/" + getUrlParameter("id"), function (data) {
            const template = buildProject(data);
            $("#projectCard").append(template);
            $.each(data.related, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#related").append(template);
            });
            $.each(data.parts, function (i, v) {
                if (v.character) {
                    const template = buildCastThumbnail(v);
                    $("#castrow").append(template);
                } else {
                    const template = buildUserThumbnail(v);
                    $("#trouperow").append(template);
                }
            });
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    });
});


