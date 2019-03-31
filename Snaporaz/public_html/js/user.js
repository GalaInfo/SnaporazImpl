function newExp() {
    var to = $('input[name="to"]').val();
    var from = $('input[name="from"]').val();
    var role = $('select[name="role"]').val();
    var title = $('input[name="title"]').val();
    var genres = $('select[name="genres"]').val().join();

    if (to && from && role && title && genres) {
        $.post(BASE_URL + "experience", {idTokenString: Cookies.get('token'), title: title, genres: genres, start: to, end: from, role: role}, function (data) {
            const template = buildUserExp(data);
            $("#experiences").append(template);
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Inserisci <strong>tutti</strong> i dati");
        $("#navbar").append(alert);
    }
}

//errore immagine
function imgError() {
    $("#thumbnail").attr("src", "../img/user_placeholder.png");
    $('input[name="img"]').val('');
}

function stringToDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[0], parts[1], parts[2])
}

$(function () {
    //campi form
    var name = $('input[name="name"]');
    var surname = $('input[name="surname"]');
    var email = $('input[name="email"]');
    var roles = $('select[name="roles"]');
    var img = $('input[name="img"]');
    var date = $('input[name="date"]');
    var nation = $('input[name="nation"]');

    $.get(BASE_URL + "user/" + getUrlParameter("id"), function (data) {
        const template = buildUser(data);
        $("#usercol").append(template);
        name.val(data.name);
        surname.val(data.surname);
        email.val(data.mail);
        date.val(data.birth);
        nation.val(data.nation);
        img.val(data.image);
        roles.val(data.role);
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
            $('select[name="role"]').append(template);
            $('select[name="role"]').selectpicker("refresh");
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

    //lista ruoli in form
    $.get(BASE_URL + "roles", function (data) {
        const template = buildSelect(data);
        roles.append(template);
        roles.selectpicker("refresh");
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });

    //modifica profilo
    $("#modify").submit(function (e) {
        e.preventDefault();
        if (name.val() && surname.val() && email.val()) {
            var dateParam;
            if (date.val() === "") {
                dateParam = 0;
            } else {
                dateParam = new Date(date.val()).getTime();
            }
            $.post(BASE_URL + "update", {idTokenString: Cookies.get('token'), name: name.val(), surname: surname.val(), roles: roles.val().join(), mail: email.val(), birth: dateParam, nation: nation.val(), image: img.val()}, function (data) {
                const template = buildUser(data);
                $("#usercol").empty();
                $("#usercol").append(template);
                name.val(data.name);
                surname.val(data.surname);
                email.val(data.mail);
                date.val(data.birth);
                nation.val(data.nation);
                img.val(data.image);
                roles.val(data.role);
            }).fail(function () {
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });
        } else {
            const alert = buildAlert("Devi inserire almeno <strong>Nome</strong>, <strong>Cognome</strong> ed <strong>Email</strong>");
            $("#navbar").append(alert);
        }
    });
    //immagine
    $("#load-img").click(function () {
        $("#thumbnail").attr("src", $("#url-img").val());
    });

});

