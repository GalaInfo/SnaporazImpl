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

function buildAlert(msg) {
    const template = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <span>${msg}</span>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`;
    return template;
}

function buildProjectThumbnail(data) {
    var title = "Titolo";
    var genres = "Genere";
    var min = 0;
    var actual = 0;
    var image = "../img/project_placeholder.png";

    if (data.title) {
        title = data.title;
    }
    if (data.genres) {
        genres = data.genres;
    }
    if (data.min !== null) {
        min = data.min;
    }
    if (data.actual !== null) {
        actual = data.actual;
    }
    if (data.image) {
        image = data.image;
    }
    const template = `
                    <div class="col-lg-4 col-sm-6 portfolio-item">
                        <a href="project.html?id=${data.id}">
                            <div class="card h-100" id="2">
                                <img class="card-img-top" src=${image} alt="locandina">
                                <div class="card-body">
                                    <h4 class="card-title">${title}</h4>
                                    <p class="card-text">${genres}</p>
                                    <div class="tohide hidden">
                                        <div class="progress">
                                            <div class="progress-bar red" role="progressbar" style="width:${(actual / min) * 100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        ${actual} € / ${min} €                                    
                                    </div>
                                </div>
                            </div>
                        <a href="project.html?id=${data.id}">
                    </div>
                   `;
    return template;
}

function buildProject(data) {
    var title = "Titolo";
    var genres = "Genere";
    var plot = "Trama";
    var prizes = "Nessuna ricompensa prevista";
    var min = 0;
    var actual = 0;
    var donations = 0;
    var deadline = 0;
    var image = "../img/project_placeholder.png";

    if (data.title) {
        title = data.title;
    }
    if (data.genres) {
        genres = data.genres;
    }
    if (data.plot) {
        plot = data.plot;
    }
    if (data.prizes) {
        prizes = data.prizes;
    }
    if (data.min !== null) {
        min = data.min;
    }
    if (data.actual !== null) {
        actual = data.actual;
    }
    if (data.donations) {
        donations = data.donations;
    }
    if (data.days > 0) {
        deadline = data.days;
    }
    if (data.image) {
        image = data.image;
    }
    const template = `
            <h1 class="mt-4">${title}</h1> 
            <h2><small>${genres}</small></h2>
        
            <div class="row">
                <div class="col-md-8">
                    <img class="rounded project-thumb" src=${image} alt="locandina">
                    <div class=" mt-4 hidden tohideCard">
                        <div class="progress">
                            <div class="progress-bar red" role="progressbar" style="width:${(actual / min) * 100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="p-2"><strong>${actual} € / ${min} €</strong></div>
                            <div class="p-2"><strong>${donations} donazioni</strong></div>
                            <div class="p-2"><strong>${deadline} giorni rimanenti</strong></div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <h3 class="mb-3">Trama</h3>
                    <textarea class="md-textarea form-control" readonly rows="5">${plot}</textarea>
                    <div class="hidden tohideCard">
                        <h3 class="my-3">Ricompense</h3>
                        <textarea class="md-textarea form-control" readonly rows="3">${prizes}</textarea>
                        <h3 class="my-3">Finanzia il progetto</h3>
                        <div id="payment">
                            <input class="form-control my-2" type="number" name="donation" placeholder="Cifra da donare" min="1">
                            <div id="paypal"></div>
                        </div>
                    </div>
                </div>
            </div>`;
    return template;
}

function buildAddTroupe() {
    const template = `
            <div class="col-lg-2 col-sm-6 text-center mb-4">
                <img class="rounded-circle img-fluid d-block mx-auto" src="../img/piu.png" alt="user_thumbnail">
                <h4>Aggiungi Parte</h4>
                <select class="selectpicker form-control" data-live-search="true" title="Nessuna scelta" id="troupeselect"></select>
                <button type="button" class="btn red arrows" onclick="troupeButton()"><span>Aggiungi </span></button>
            </div>`;
    return template;
}

function buildAddCast() {
    const template = `
            <div class="col-lg-2 col-sm-6 text-center mb-4">
                <img class="rounded-circle img-fluid d-block mx-auto" src="../img/piu.png" alt="user_thumbnail">
                <h4>Aggiungi Parte</h4>
                <select class="selectpicker form-control" data-live-search="true" title="Nessuna scelta" id="castselect"></select>
                <input type="text" class="form-control" id="character" placeholder="Personaggio">
                <button type="button" class="btn red arrows" id="castbutton" onclick="castButton()"><span>Aggiungi </span></button>
            </div>`;
    return template;
}

function buildCandidacy(data, i) {
    const template = `                        
                <div class="col-lg-2 col-sm-6 text-center mb-4" id="candidacy${i}">
                    <img class="rounded-circle img-fluid d-block mx-auto" src="../img/hiring.png" alt="user_thumbnail">
                    <h4>Posizione Aperta</h4>
                    <p class="mb-1"><strong>${data.role}</strong><br>${data.character}</p>
                    <select class="selectpicker form-control" data-live-search="true" title="Nessuna scelta" id="candselect${i}"></select>
                    <button type="button" class="btn red arrows" onclick="addCandidacy(${data.id}, ${i})"><span>Candidati </span></button>
                    <button type="button" class="btn red arrows hidden tohideCand mt-1" onclick="assign(${i})"><span>Assegna </span></button>
                </div>`;
    return template;
}

function buildUserThumbnail(data) {
    var name = "Nome";
    var surname = "Cognome";
    var role = "Ruolo";
    var image = "../img/user_placeholder.png";

    if (data.name) {
        name = data.name;
    }
    if (data.surname) {
        surname = data.surname;
    }
    if (data.role) {
        role = data.role;
    }
    if (data.image) {
        image = data.image;
    }
    const template = `
                    <div class="col-sm-2 text-center mb-4">
                        <a href="user.html?id=${data.userId}"><img class="rounded-circle img-fluid d-block mx-auto" src=${image} alt="immagine profilo">
                        <h4>${name} ${surname}</h4>
                        </a>
                        <p><strong>${role}</strong><br>${data.character}</p>
                    </div>`;
    return template;
}

function buildUser(data) {
    var name = "Nome";
    var surname = "Cognome";
    var roles = "Ruolo";
    var mail = "Email";
    var birth = "Data di nascita";
    var age = "Età";
    var country = "Nazione";
    var image = "../img/user_placeholder.png";

    if (data.name) {
        name = data.name;
    }
    if (data.surname) {
        surname = data.surname;
    }
    if (data.role) {
        roles = data.role;
    }
    if (data.mail) {
        mail = data.mail;
    }
    if (data.birth) {
        birth = data.birth;
    }
    if (data.age) {
        age = data.age;
    }
    if (data.nation) {
        country = data.nation;
    }
    if (data.phone) {
        phone = data.phone;
    }
    if (data.image) {
        image = data.image;
    }

    const template = `
                    <img src=${image} class="rounded-circle img-fluid d-block mx-auto" alt="avatar" id="thumbnail" onerror="imgError()">
                    <h4 class="mt-4">${name}</h4>
                    <hr>
                    <h4>${surname}</h4>
                    <hr>
                    ${roles}
                    <hr>
                    ${mail}
                    <hr>
                    ${birth}
                    <hr>
                    ${age}
                    <hr>
                    ${country}`;
    return template;
}

function buildUserExp(data) {
    var title = "Titolo";
    var genres = "Genere";
    var start = "Data";
    var end = "Data";
    var role = "Ruolo";

    if (data.title) {
        title = data.title;
    }
    if (data.genres) {
        genres = data.genres;
    }
    if (data.start) {
        start = data.date;
    }
    if (data.end) {
        end = data.date;
    }
    if (data.role) {
        role = data.role;
    }
    const template = `                                    
                    <tr>
                        <td>
                            ${start}
                        </td>
                        <td>
                            ${end}
                        </td>
                        <td>
                            ${role}
                        </td>
                        <td>
                            ${title}
                        </td>
                        <td>
                            ${genres}
                        </td>
                    </tr>`;
    return template;
}

function buildSelect(data, defaultValue) {
    var init = "";
    if (defaultValue) {
        init = `<option>${defaultValue}</option>`;
    }
    $.each(data, function (i, v) {
        if (v.hasOwnProperty("name")) {
            var opt = `<option value="${v.id}">${v.name} ${v.surname}</option>`;
        } else {
            var opt = `<option>${v}</option>`;
        }
        init += opt;
    });
    return init;
}


