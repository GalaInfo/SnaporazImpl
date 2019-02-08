function buildProjectThumbnail(data) {
    var title;
    var genres;
    var min;
    var actual;
    var image;
    if (data.title) {
        title = data.title;
    } else {
        title = "Titolo";
    }
    if (data.genres) {
        genres = data.genres;
    } else {
        genres = "Genere";
    }
    if (data.min !== null) {
        min = data.min;
    } else {
        min = 0;
    }
    if (data.actual !== null) {
        actual = data.actual;
    } else {
        actual = 0;
    }
    if (data.image) {
        image = data.image;
    } else {
        image = "../img/project_placeholder.png";
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
    var title;
    var genres;
    var min;
    var actual;
    var image;
    if (data.title) {
        title = data.title;
    } else {
        title = "Titolo";
    }
    if (data.genres) {
        genres = data.genres;
    } else {
        genres = "Genere";
    }
    if (data.min !== null) {
        min = data.min;
    } else {
        min = 0;
    }
    if (data.actual !== null) {
        actual = data.actual;
    } else {
        actual = 0;
    }
    if (data.image) {
        image = data.image;
    } else {
        image = "../img/project_placeholder.png";
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
    var name;
    var role;
    var character;
    var image;
    if (data.name) {
        name = data.name;
    } else {
        name = "Nome";
    }
    if (data.role) {
        role = data.role;
    } else {
        role = "Ruolo";
    }
    if (data.character) {
        character = data.character;
    } else {
        character = "Personaggio";
    }
    if (data.image) {
        image = data.image;
    } else {
        image = "../img/user_placeholder.png";
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
    var name;
    var surname;
    var roles;
    var mail;
    var birth;
    var age;
    var country;
    var phone;
    var image;
    if (data.name) {
        name = data.name;
    } else {
        name = "Nome";
    }
    if (data.surname) {
        surname = data.surname;
    } else {
        surname = "Cognome";
    }
    if (data.roles) {
        roles = data.roles;
    } else {
        roles = "Ruoli";
    }
    if (data.mail) {
        mail = data.mail;
    } else {
        mail = "Email";
    }
    if (data.birth) {
        birth = data.birth;
    } else {
        birth = "Data di nascita";
    }
    if (data.age) {
        age = data.age;
    } else {
        age = "età";
    }
    if (data.country) {
        country = data.country;
    } else {
        country = "Paese di residenza";
    }
    if (data.phone) {
        phone = data.phone;
    } else {
        phone = "Numero di telefono";
    }
    if (data.image) {
        image = data.image;
    } else {
        image = "Numero di telefono";
    }
    const template = `
                    <img src="https://consequenceofsound.files.wordpress.com/2016/01/martin-scorsese_0.jpg?quality=80&w=807" class="rounded-circle img-fluid d-block mx-auto" alt="avatar">
                    <h4 class="mt-4">Martin</h4>
                    <hr>
                    <h4>Scorsese</h4>
                    <hr>
                    Regista
                    <hr>
                    martin.scorsese@gmail.com
                    <hr>
                    17 novembre 1942
                    <hr>
                    76 anni
                    <hr>
                    California
                    <hr>
                    333 - 333 33 33`;
    return template;
}


