$(function () {
    $.post(BASE_URL + "project", {idTokenString: Cookies.get('token'), id: getUrlParameter("id")}, function (data) {
//scheda progetto
        const template = buildProject(data);
        $("#projectCard").append(template);
        if (data.min > 0) {
            $(".tohideCard").show();
        }
//bottone paypal
        paypal.Buttons({
            createOrder: function (data, actions) {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                            amount: {
                                value: $('input[name="donation"]').val(),
                            },
                            payee: {
                                email_address: 'impar-seller@atm-mi.ga'
                            },
                        }]
                });
            },
            onApprove: function (data, actions) {
                // Capture the funds from the transaction
                return actions.order.capture().then(function (details) {
                    //Richiesta al server
                    //$.post(BASE_URL + "donate", {idTokenString: Cookies.get('token'), project: getUrlParameter("id"), transactionId: details.id, sum: details.purchase_units[0].amount.value}, function (data) {
                    $.post(SOAP_URL, $.parseXML(), function (data) {
                        const template = buildProjectDonation(data);
                        $("#donationDiv").empty();
                        $("#donationDiv").append(template);
                    }).fail(function () {
                        const alert = buildAlert("Impossibile completare l'operazione di pagamento");
                        $("#navbar").append(alert);
                    })
                });
            }
        }).render('#paypal');
//correlati
        $.each(data.related, function (i, v) {
            const template = buildProjectThumbnail(v);
            $("#related").append(template);
            if (v.min > 0) {
                $(".tohide").show();
            }
        });
//cast/troupe
        $.each(data.parts, function (i, v) {
            var template;
            if (v.name) {
                template = buildUserThumbnail(v);
            } else {
                template = buildCandidacy(v, i);
            }
            if (v.character) {
                $("#castrow").append(template);
            } else {
                $("#trouperow").append(template);
            }
            if (data.owner) {
                $(".tohideCand").show();
                var names = buildSelect(v.candidacies);
                $("#candselect" + i).append(names);
                $("#candselect" + i).selectpicker("refresh");
            }
        });
        if (data.owner) {
//aggiungi parte
            const addTroupe = buildAddTroupe("troupeselect");
            $("#trouperow").append(addTroupe);
            $.get(BASE_URL + "troupe", function (data) {
                const template = buildSelect(data);
                $("#troupeselect").append(template);
                $("#troupeselect").selectpicker("refresh");
            }).fail(function () {
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });
            const addCast = buildAddCast("castselect");
            $("#castrow").append(addCast);
            $.get(BASE_URL + "cast", function (data) {
                const template = buildSelect(data);
                $("#castselect").append(template);
                $("#castselect").selectpicker("refresh");
            }).fail(function () {
                const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
                $("#navbar").append(alert);
            });
        }
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });
});

function troupeButton() {
    var val = $("#troupeselect").val();
    if (val) {
        $.post(BASE_URL + "part", {idTokenString: Cookies.get('token'), project: getUrlParameter("id"), role: val, character: ""}, function (data) {
            const template = buildCandidacy(data);
            $("#trouperow").append(template);
            $(".tohideCand").show();
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Devi selezionare un <strong>ruolo</strong>");
        $("#navbar").append(alert);
    }
}

function castButton() {
    var val = $("#castselect").val();
    var char = $("#character").val();
    if (val && char) {
        $.post(BASE_URL + "part", {idTokenString: Cookies.get('token'), project: getUrlParameter("id"), role: val, character: char}, function (data) {
            const template = buildCandidacy(data);
            $("#castrow").append(template);
            $(".tohideCand").show();
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Devi selezionare un <strong>ruolo</strong> ed un <strong>personaggio</strong>");
        $("#navbar").append(alert);
    }
}

function addCandidacy(id, i) {
    $.post(BASE_URL + "candidacy", {part: id, idTokenString: Cookies.get('token')}, function (data) {
        if (data.success === false) {
            const alert = buildAlert("Non puoi candidarti per questa parte");
            $("#navbar").append(alert);
        } else {
            const alert = buildAlert("Candidatura effettuata con <strong>successo</strong>");
            $("#navbar").append(alert);
            if (data.candidacies.length !== 0) {
                const names = buildSelect(data.candidacies);
                $("#candselect" + i).append(names);
                $("#candselect" + i).selectpicker("refresh");
            }
        }
    }).fail(function () {
        const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
        $("#navbar").append(alert);
    });

}

function assign(i) {
    var candId = $("#candselect" + i).val();
    if (candId) {
        $.post(BASE_URL + "assign", {candidacy: candId, idTokenString: Cookies.get('token')}, function (data) {
            if (data.success === false) {
                const alert = buildAlert("Non puoi assegnare questo ruolo");
                $("#navbar").append(alert);
            } else {
                const alert = buildAlert("Assegnamento avvenuto con <strong>successo</strong>");
                $("#navbar").append(alert);
                $("#candidacy" + i).hide();
                const template = buildUserThumbnail(data);
                if (data.character) {
                    $("#castrow").append(template);
                } else {
                    $("#trouperow").append(template);
                }
            }
        }).fail(function () {
            const alert = buildAlert("Impossibile connettersi al server, <strong>ricarica</strong> la pagina o <strong>riprova</strong> più tardi");
            $("#navbar").append(alert);
        });
    } else {
        const alert = buildAlert("Devi selezionare un <strong>candidato</strong>");
        $("#navbar").append(alert);
    }
}

