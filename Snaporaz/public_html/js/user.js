$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        $.get("http://localhost:42729/SnaporazSpring/user/" + getUrlParameter("id"), function (data) {
            const template = buildUser(data);
            $("#usercol").append(template);
            $.each(data.experiences, function (i, v) {
                const template = buildUserExp(v);
                $("#experiences").append(template);
            });
        });
    });
});


