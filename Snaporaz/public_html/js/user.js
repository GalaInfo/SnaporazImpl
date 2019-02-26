function newExp() {
    var to = $('input[name="to"]').val();
    var from = $('input[name="from"]').val();
    var role = $('select[name="role"]').val();
    var title = $('input[name="title"]').val();
    var genres = $('select[name="genres"]').val().join();

    if (to && from && role && title && genres) {
        $.post(BASE_URL + "experience", {idTokenString: Cookies.get('token'), title: title, genres: genres, start: to, end: from, role: role}, function (data) {
            $("#experiences").empty();
            $.each(data.experiences, function (i, v) {
                const template = buildUserExp(v);
                $("#experiences").append(template);
            });
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Inserisci <strong>tutti</strong> i dati");
        $("#navbar").append(alert);
    }
}

$(function () {
    //campi form
    var name = $('input[name="name"]').val()
    var surname = $('input[name="surname"]').val();
    var email = $('input[name="email"]').val();
    var roles = "";
    var img = "";
    var date;
    var nation = "";

    $.get(BASE_URL + "user/" + getUrlParameter("id"), function (data) {
        const template = buildUser(data);
        $("#usercol").append(template);
        name = data.name;
        surname = data.surname;
        email = data.mail;
        date = data.birth;
        nation = data.nation;
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
        $.get(BASE_URL + "roles", function (data) {
            const template = buildSelect(data);
            $('select[name="roles"]').append(template);
            $('select[name="roles"]').selectpicker("refresh");
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
        $.get(BASE_URL + "genres", function (data) {
            const template = buildSelect(data);
            $('select[name="genres"]').append(template);
            $('select[name="genres"]').selectpicker("refresh");
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    }
    //modifica profilo
    $("#modify").submit(function (e) {
        e.preventDefault();
        if ($('select[name="roles"]').val().join()) {
            roles = $('select[name="roles"]').val().join();
        }
        if ($('input[name="img"]').val()) {
            img = $('input[name="img"]').val();
        }
        if ($('input[name="date"]').val()) {
            date = $('input[name="date"]').val();
        }
        if ($('input[name="nation"]').val()) {
            nation = $('input[name="nation"]').val();
        }
        if (name && surname && email) {
            $.post(BASE_URL + "update", {IdTokenString: Cookies.get('token'), name: name, surname: surname, roles: roles, mail: email, birth: date, nation: nation, image: img}, function(data){
                console.log("Operazione non supportata");
            });
        }
    });
});


