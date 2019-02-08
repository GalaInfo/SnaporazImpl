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
                        <div class="card h-100" id="2">
                            <a href="#"><img class="card-img-top" src=${image} alt="locandina"></a>
                            <div class="card-body">
                                <h4 class="card-title">
                                <a href="project.html?id=${data.id}">${title}</a>
                                </h4>
                                <p class="card-text">${genres}</p>
                                <div class="progress">
                                <div class="progress-bar red" role="progressbar" style="width:${(actual / min) * 100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                ${actual} € / ${min} €
                            </div>
                        </div>
                    </div>`;
    return template;
}

function buildProject(data) {
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
            <h1 class="mt-4">${title}</h1> 
            <h2><small>${genres}</small></h2>
        
            <div class="row">

                <div class="col-md-8">
                    <img class="rounded project-thumb" src=${image} alt="locandina">
                </div>

                <div class="col-md-4">
                    <h3 class="my-3">Trama</h3>
                    <p>hhhhhh</p>
                    <h3 class="my-3">Ricompense</h3>
                    <ul>
                        <li><strong>10€</strong> - DVD omaggio</li>
                        <li><strong>20€</strong> - Blu-Ray omaggio</li>
                        <li><strong>50€</strong> - Poster autografato</li>
                        <li><strong>500€</strong> - Ringraziamento nei titolo di coda</li>
                    </ul>
                </div>
            </div>
            <div class="row my-3">
                <div class="col-md-8">
                    <div class="progress">
                        <div class="progress-bar red" role="progressbar" style="width:${(actual / min) * 100}%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="p-2"><strong>${actual} € / ${min} €</strong></div>
                        <div class="p-2"><strong>1000 donazioni</strong></div>
                        <div class="p-2"><strong>7 giorni rimanenti</strong></div>
                    </div>
                </div>`;
    return template;
}

function buildCastThumbnail(data) {
    var name = "Nome";
    var role = "Ruolo";
    var character = "Personaggio";
    var image = "../img/user_placeholder.png";

    if (data.name) {
        name = data.name;
    }
    if (data.role) {
        role = data.role;
    }
    if (data.character) {
        character = data.character;
    }
    if (data.image) {
        image = data.image;
    }
    const template = `
                    <div class="col-lg-2 col-sm-6 text-center mb-4">
                        <a href="user.html?id=${data.user}"><img class="rounded-circle img-fluid d-block mx-auto" src=${image} alt="immagine profilo">
                        <h4>${name}</h4>
                        </a>
                        <p><strong>${role}</strong><br>${character}</p>
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
    var phone = "Telefono";
    var image = "../img/user_placeholder.png";
    
    if (data.name) {
        name = data.name;
    }
    if (data.surname) {
        surname = data.surname;
    }
    if (data.roles) {
        roles = data.roles;
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
    if (data.country) {
        country = data.country;
    }
    if (data.phone) {
        phone = data.phone;
    }
    if (data.image) {
        image = data.image;
    }

    const template = `
                    <img src=${image} class="rounded-circle img-fluid d-block mx-auto" alt="avatar">
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
                    ${country}
                    <hr>
                    ${phone}`;
    return template;
}

function buildUserExp(data) {
    var title = "Titolo";
    var genres = "Genere";
    var date = "Data";
    var role = "Ruolo";
    
    if (data.title) {
        title = data.title;
    }
    if (data.genres) {
        genres = data.genres;
    }
    if (data.roles) {
        date = data.date;
    }
    if (data.role) {
        role = data.role;
    }
    const template = `                                    
                    <tr>
                        <td>
                            ${date}
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


