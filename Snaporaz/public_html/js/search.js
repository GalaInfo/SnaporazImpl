$(function () {
    var pselect = $('select[name="projectgenre"]');
    var uselect = $('select[name="usergenre"]');
    var urole = $('select[name="userrole"]');
    //ricerca veloce
    var title = getUrlParameter("title");
    if (title) {
        $("#projectslist").empty();
        $("#projectspinner").show();
        $('input[name="projecttitle"]').val(title);
        $.post(BASE_URL + "projects", {title: title, owner: "", genre: "", collab: "", order: "Titolo", asc: true}, function (data) {
            $("#projectspinner").hide();
            if (data.length === 0) {
                $("#projectslist").empty();
                $("#projectslist").html("Nessun risultato corrisponde ai criteri di ricerca");
            } else {
                $("#projectslist").empty();
                $.each(data, function (i, v) {
                    const template = buildProjectThumbnail(v);
                    $("#projectslist").append(template);
                    if (v.min > 0) {
                        $(".tohide").show();
                    }
                });
            }
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    }

    //proprietario
    var ownerName = getUrlParameter("name");
    var ownerSurname = getUrlParameter("surname");
    if (ownerName && ownerSurname) {
        $("#projectslist").empty();
        $("#projectspinner").show();
        $('input[name="projecttitle"]').val(title);
        $.post(BASE_URL + "projects", {title: "", owner: "ownerName", genre: "", collab: "", order: "Titolo", asc: true}, function (data) {
            $("#projectspinner").hide();
            if (data.length === 0) {
                $("#projectslist").empty();
                $("#projectslist").html("Nessun risultato corrisponde ai criteri di ricerca");
            } else {
                $("#projectslist").empty();
                $.each(data, function (i, v) {
                    const template = buildProjectThumbnail(v);
                    $("#projectslist").append(template);
                    if (v.min > 0) {
                        $(".tohide").show();
                    }
                });
            }
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    }

    //costruzione select generi
    $.get(BASE_URL + "genres", function (data) {
        const template = buildSelect(data, "Qualunque");
        pselect.append(template);
        pselect.selectpicker("refresh");
        uselect.append(template);
        uselect.selectpicker("refresh");

    });

    //costruzione select ruoli
    $.get(BASE_URL + "roles", function (data) {
        const template = buildSelect(data, "Qualunque");
        urole.append(template);
        urole.selectpicker("refresh");
    });

    //ricerca progetti
    $("#projectsearch").submit(function (e) {
        e.preventDefault();
        $("#projectslist").empty();
        $("#projectspinner").show();
        var title = $('input[name="projecttitle"]').val();
        var owner = $('input[name="projectowner"]').val();
        var genre = "";
        var collab = $('input[name="projectcollab"]').val();
        var order = $('select[name="projectorder"]').val();
        var asc = true;

        if (pselect.val() !== "Qualunque") {
            genre = pselect.val();
        }

        if ($('select[name="projectasc"]').val() === "Decrescente") {
            asc = false;
        }

        $.post(BASE_URL + "projects", {title: title, owner: owner, genre: genre, collab: collab, order: order, asc: asc}, function (data) {
            $("#projectspinner").hide();
            //nessun risultato
            if (data.length === 0) {
                $("#projectslist").empty();
                $("#projectslist").html("Nessun risultato corrisponde ai criteri di ricerca");
            } else {
                $("#projectslist").empty();
                $.each(data, function (i, v) {
                    const template = buildProjectThumbnail(v);
                    $("#projectslist").append(template);
                    if (v.min > 0) {
                        $(".tohide").show();
                    }
                });
            }
        }).fail(function () {
            $("#projectspinner").hide();
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });

    });
    //ricerca utenti
    $("#usersearch").submit(function (e) {
        e.preventDefault();
        $("#userslist").empty();
        $("#userspinnerr").show();
        var name = $('input[name="username"]').val();
        var surname = $('input[name="usersurame"]').val();
        var role = "";
        var minage = 0;
        var maxage = 150;
        var title = $('input[name="userproject"]').val();
        var genre = uselect;
        var order = $('select[name="userorder"]').val();
        var asc = true;

        if (uselect.val() !== "Qualunque") {
            genre = uselect.val();
        }

        if (urole.val() !== "Qualunque") {
            role = urole.val();
        }

        if ($('select[name="minage"]').val()) {
            minage = $('select[name="minage"]').val();
        }
        if ($('select[name="maxage"]').val()) {
            maxage = $('select[name="maxage"]').val();
        }
        if ($('select[name="userasc"]').val() === "Decrescente") {
            asc = false;
        }

        $.post(BASE_URL + "users", {name: name, surname: surname, roles: role, minAge: minage, maxAge: maxage, project: title, genres: genre, order: order, asc: asc}, function (data) {
            $("#userspinner").hide();
            if (data.length === 0) {
                $("#userslist").empty();
                $("#userslist").html("Nessun risultato corrisponde ai criteri di ricerca");
            } else {
                $("#userslist").empty();
                $.each(data, function (i, v) {
                    const template = buildUserThumbnail(v);
                    $("#userslist").append(template);
                });
            }
        }).fail(function () {
            $("#userspinner").hide();
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    });
});


