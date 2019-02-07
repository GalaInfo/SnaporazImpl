//ritorna il valore del parametro sParam nell'URL se esiste, undefined altrimenti
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}
;
$(function () {
    $.getScript("../js/templateBuilder.js");
    $.get("http://localhost:42729/SnaporazSpring/project/" + getUrlParameter("id"), function (data) {
        const template = buildProject(data);
        $("#projectCard").append(template);
        $.each(data.related, function (i, v) {
            const template1 = buildProjectThumbnail(v);
            $("#related").append(template1);
        });
    });
});


