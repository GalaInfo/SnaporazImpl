$(function () {
    var val = getUrlParameter("val");
    if (val === "owner") {
        $("#title").html("Progetti di " + Cookies.get('name') + " " + Cookies.get('surname'));
        $.get(BASE_URL + "projectsOwner/" + Cookies.get('id'), function (data) {
            $.each(data, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#list").append(template);
            });
        });
    }

    if (val === "collab") {
        $("#title").html("Progetti ai quali " + Cookies.get('name') + " " + Cookies.get('surname') + " ha partecipato");
        $.get(BASE_URL + "projectsCollab/" + Cookies.get('id'), function (data) {
            $.each(data, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#list").append(template);
            });
        });
    }
});


