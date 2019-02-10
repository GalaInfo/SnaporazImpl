$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        var title = getUrlParameter("title") 
        if (title) {
            $("#projectslist").empty();
            $(".spinner-border").show();
            $('input[name="projecttitle"]').val(title);
            $.post("http://localhost:42729/SnaporazSpring/projects", {title: title, owner: "", genre: "", collab: "", order: "Titolo", asc: true}, function (data) {
                $(".spinner-border").hide();
                if (data.length === 0) {
                    $("#projectslist").empty();
                    $("#projectslist").html("Nessun risultato corrisponde ai criteri di ricerca");
                } else {
                    $("#projectslist").empty();
                    $.each(data, function (i, v) {
                        const template = buildProjectThumbnail(v);
                        $("#projectslist").append(template);
                    });
                }
            }).fail(function () {
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });
        }
        $("#projectsearch").submit(function (e) {
            e.preventDefault();
            $("#projectslist").empty();
            $(".spinner-border").show();
            var title = $('input[name="projecttitle"]').val();
            var owner = $('input[name="projectowner"]').val();
            var genre = $('select[name="projectgenre"]').val();
            var collab = $('input[name="projectcollab"]').val();
            var order = $('select[name="projectorder"]').val();
            var asc = true;

            if ($('select[name="projectasc"]').val() === "Decrescente") {
                asc = false;
            }

            $.post("http://localhost:42729/SnaporazSpring/projects", {title: title, owner: owner, genre: genre, collab: collab, order: order, asc: asc}, function (data) {
                $(".spinner-border").hide();
                if (data.length === 0) {
                    $("#projectslist").empty();
                    $("#projectslist").html("Nessun risultato corrisponde ai criteri di ricerca");
                } else {
                    $("#projectslist").empty();
                    $.each(data, function (i, v) {
                        const template = buildProjectThumbnail(v);
                        $("#projectslist").append(template);
                    });
                }
            }).fail(function () {
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });

        });
        $("#usersearch").submit(function (e) {
            e.preventDefault();
            $("#userslist").empty();
            $(".spinner-border").show();
            var name = $('input[name="username"]').val();
            var surname = $('input[name="usersurame"]').val();
            var role = $('select[name="userrole"]').val();
            var minage = 0;
            var maxage = 150;
            var title = $('input[name="userproject"]').val();
            var genre = $('select[name="usergenre"]').val();
            var order = $('select[name="userorder"]').val();
            var asc = true;

            if ($('select[name="minage"]').val()) {
                minage = $('select[name="minage"]').val();
            }
            if ($('select[name="maxage"]').val()) {
                maxage = $('select[name="maxage"]').val();
            }
            if ($('select[name="userasc"]').val() === "Decrescente") {
                asc = false;
            }

            $.post("http://localhost:42729/SnaporazSpring/users", {name: name, surname: surname, roles: role, minAge: minage, maxAge: maxage, project: title, genres: genre, order: order, asc: asc}, function (data) {
                $(".spinner-border").hide();
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
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });
        });
    });
});


