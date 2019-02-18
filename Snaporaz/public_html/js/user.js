$(function () {
    $.get("http://localhost:42729/SnaporazSpring/user/" + getUrlParameter("id"), function (data) {
        const template = buildUser(data);
        $("#usercol").append(template);
        $.each(data.experiences, function (i, v) {
            const template = buildUserExp(v);
            $("#experiences").append(template);
        });
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });
});


