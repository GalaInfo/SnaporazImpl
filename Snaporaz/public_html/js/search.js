$(function () {
    $.getScript("../js/templateBuilder.js", function () {
        $("#projectsearch").submit(function (e) {
            e.preventDefault();

            var title = $('input[name="projecttitle"]').val();
            var owner = $('input[name="projectowner"]').val();
            var genre = $('select[name="projectgenre"]').val();
            var collab = $('input[name="projectcollab"]').val();
            ;
            var order = $('select[name="projectorder"]').val();
            ;
            var asc = true;

            if ($('select[name="projectasc"]').val() === "Decrescente") {
                asc = false;
            }
            console.log(title);
            console.log(owner);
            console.log(genre);
            console.log(collab);
            console.log(order);
            console.log(asc);

            $.get("http://localhost:42729/SnaporazSpring/projects", {title: title, owner: owner, genre: genre, collab: collab, order: order, asc: asc}, function (data) {
                $.each(data, function (i, v) {
                    const template = buildProjectThumbnail(v);
                    $("#projectsrow").empty();
                    $("#projectsrow").append(template);
                });
            });

        });
    });
});


