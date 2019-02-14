$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        $.post("http://localhost:42729/SnaporazSpring/project", {idTokenString: "", id: getUrlParameter("id")}, function (data) {

            //scheda progetto
            const template = buildProject(data);
            $("#projectCard").append(template);

            //correlati
            $.each(data.related, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#related").append(template);
            });

            //cast/troupe
            $.each(data.parts, function (i, v) {
                var template;
                if (v.name) {
                    template = buildUserThumbnail(v);
                } else {
                    template = buildCandidacy(v);
                }
                if (v.character) {
                    $("#castrow").append(template);
                } else {
                    $("#trouperow").append(template);
                }
            });

            //aggiungi parte
            const addTroupe = buildAddTroupe("troupeselect");
            $("#trouperow").append(addTroupe);
            $.get("http://localhost:42729/SnaporazSpring/troupe", function (data) {
                const template = buildSelect(data);
                $("#troupeselect").append(template);
                $("#troupeselect").selectpicker("refresh");
            });

            const addCast = buildAddCast("castselect");
            $("#castrow").append(addCast);
            $.get("http://localhost:42729/SnaporazSpring/cast", function (data) {
                const template = buildSelect(data);
                $("#castselect").append(template);
                $("#castselect").selectpicker("refresh");
            });

        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    });
});

function troupeButton() {
    var val = $("#troupeselect").val();
    if (val) {
        $.post("http://localhost:42729/SnaporazSpring/part", {project: getUrlParameter("id"), role: val, character: ""}, function (data) {
            const template = buildCandidacy(data);
            $("#trouperow").append(template);
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Devi selezionare un <strong>ruolo</strong>");
        $("#navbar").append(alert);
    }
}

function castButton() {
    var val = $("#castselect").val();
    var char = $("#character").val();
    if (val && char) {
        $.post("http://localhost:42729/SnaporazSpring/part", {project: getUrlParameter("id"), role: val, character: char}, function (data) {
            const template = buildCandidacy(data);
            $("#castrow").append(template);
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Devi selezionare un <strong>ruolo</strong> ed un <strong>personaggio</strong>");
        $("#navbar").append(alert);
    }
}


