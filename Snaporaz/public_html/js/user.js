function newExp() {
    var to = $('input[name="to"]').val();
    var from = $('input[name="from"]').val();
    var role = $('select[name="role"]').val();
    var title = $('input[name="title"]').val();
    var genres = $('select[name="genres"]').val().join();

    if (to && from && role && title && genres) {
        $.post("http://localhost:42729/SnaporazSpring/experience", {idTokenString: Cookies.get('token'), title: title, genres: genres, start: to, end: from, role: role}
        ).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Inserisci <strong>tutti</strong> i dati");
        $("#navbar").append(alert);
    }
}

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
    //aggiungi esperienza
    if (getUrlParameter("id") === Cookies.get('id')) {
        $(".tohide").show();
        $.get("http://localhost:42729/SnaporazSpring/roles", function (data) {
            const template = buildSelect(data);
            $('select[name="role"]').append(template);
            $('select[name="role"]').selectpicker("refresh");
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
        $.get("http://localhost:42729/SnaporazSpring/genres", function (data) {
            const template = buildSelect(data);
            $('select[name="genres"]').append(template);
            $('select[name="genres"]').selectpicker("refresh");
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    }
});


