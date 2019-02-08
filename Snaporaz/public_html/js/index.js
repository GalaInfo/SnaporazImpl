$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        $.get("http://localhost:42729/SnaporazSpring", function (data) {
            //most funded
            $.each(data.mostFundedProjects, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#funded").append(template);
            });
            //most closest
            $.each(data.closestProjects, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#close").append(template);
            });
            //most recent
            $.each(data.mostRecentProjects, function (i, v) {
                const template = buildProjectThumbnail(v);
                $("#recent").append(template);
            });
        });
    });
});
