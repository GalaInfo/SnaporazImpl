$(function () {
    $.get("http://localhost:42729/SnaporazSpring", function (data) {
        //most funded
        $.each(data.mostFoundedProjects, function (i, v) {
            var title;
            var genres;
            var min;
            var actual;
            var image;
            if (v.title) {
                title = v.title;
            } else {
                title = "Titolo";
            }
            if (v.genres) {
                genres = v.genres;
            } else {
                genres = "Genere";
            }
            if (v.min !== null) {
                min = v.min;
            } else {
                min = 0;
            }
            if (v.actual !== null) {
                actual = v.actual;
            } else {
                actual = 0;
            }
            if (v.image) {
                image = v.image;
            } else {
                image = "../img/project_placeholder.png";
            }
            const template = `
                        <div class="col-lg-4 col-sm-6 portfolio-item">
                            <div class="card h-100" id="2">
                                <a href="#"><img class="card-img-top" src=${image} alt="locandina"></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    <a href="project.html">${title}</a>
                                    </h4>
                                    <p class="card-text">${genres}</p>
                                    <div class="progress">
                                    <div class="progress-bar red" role="progressbar" style="width:${(actual/min)*100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    ${actual} € / ${min} €
                                </div>
                            </div>
                        </div>`;
            $("#funded").append(template);
        });
        //most recent
        $.each(data.closestProjects, function (i, v) {
            var title;
            var genres;
            var min;
            var actual;
            var image;
            if (v.title) {
                title = v.title;
            } else {
                title = "Titolo";
            }
            if (v.genres) {
                genres = v.genres;
            } else {
                genres = "Genere";
            }
            if (v.min !== null) {
                min = v.min;
            } else {
                min = 0;
            }
            if (v.actual !== null) {
                actual = v.actual;
            } else {
                actual = 0;
            }
            if (v.image) {
                image = v.image;
            } else {
                image = "../img/project_placeholder.png";
            }
            const template = `
                        <div class="col-lg-4 col-sm-6 portfolio-item">
                            <div class="card h-100" id="2">
                                <a href="#"><img class="card-img-top" src=${image} alt="locandina"></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    <a href="project.html">${title}</a>
                                    </h4>
                                    <p class="card-text">${genres}</p>
                                    <div class="progress">
                                    <div class="progress-bar red" role="progressbar" style="width:${(actual/min)*100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    ${actual} € / ${min} €
                                </div>
                            </div>
                        </div>`;
            $("#close").append(template);
        });
        //closest
        $.each(data.mostRecentProjects, function (i, v) {
            var title;
            var genres;
            var min;
            var actual;
            var image;
            if (v.title) {
                title = v.title;
            } else {
                title = "Titolo";
            }
            if (v.genres) {
                genres = v.genres;
            } else {
                genres = "Genere";
            }
            if (v.min !== null) {
                min = v.min;
            } else {
                min = 0;
            }
            if (v.actual !== null) {
                actual = v.actual;
            } else {
                actual = 0;
            }
            if (v.image) {
                image = v.image;
            } else {
                image = "../img/project_placeholder.png";
            }
            const template = `
                        <div class="col-lg-4 col-sm-6 portfolio-item">
                            <div class="card h-100" id="2">
                                <a href="#"><img class="card-img-top" src=${image} alt="locandina"></a>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    <a href="project.html">${title}</a>
                                    </h4>
                                    <p class="card-text">${genres}</p>
                                    <div class="progress">
                                    <div class="progress-bar red" role="progressbar" style="width:${(actual/min)*100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    ${actual} € / ${min} €
                                </div>
                            </div>
                        </div>`;
            $("#recent").append(template);
        });
    });
});
