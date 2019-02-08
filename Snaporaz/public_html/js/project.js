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
                const template = buildCastThumbnail(v);
                $("#castrow").append(template);
            });
        });
    });
});


