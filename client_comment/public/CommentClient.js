const Url = "http://localhost/MicroServiceComment/api_comment/public/index.php";
let uuid = 0;

if (window.template){
    if (template){
        tplt = template;
    }else{
        tplt = "";
    }
}else {
    tplt = "";
}


function addCom(uuid, username, comment) {
    const FullUrl = Url + "/api/addComment";
    if (uuid === null) {
        alert("Désolé une erreur est survenue !")
    } else if (username === "") {
        alert("Vous n'avez pas renseigner de nom")
    } else if (comment === "") {
        alert("Votre message est vide");
    } else {
        $.ajax({
            url: FullUrl,
            type: "GET",
            data: {uuid: uuid, name: username, comment: comment},
            success: function (result) {
                comments(uuid);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}

function editCom(id, comment, uuid) {
    const FullUrl = Url + "/api/editComment";

    if (localStorage.getItem("idComment") === null) {
        alert("Une erreur est survenue !")
    } else if (comment === "") {
        alert("Votre message est vide");
    } else if (id === null) {
        alert("Une erreur est survenue !")
    } else {
        $.ajax({
            url: FullUrl,
            type: "POST",
            data: {id: id, comment: comment},
            success: function (result) {
                comments(uuid);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}

function deleteCom(id, uuid) {
    const FullUrl = Url + "/api/deleteComment";
    $.ajax({
        url: FullUrl,
        type: "POST",
        data: {id: id},
        success: function (result) {
            comments(uuid);
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function comments(uuid) {
    const FullUrl = Url + "/api/comment";


    if (uuid === 0) {
        alert("Désolé une erreur est survenue !")
    } else {
        $.ajax({
            url: FullUrl,
            type: "GET",
            data: {uuid: uuid},
            success: function (result) {
                console.log(result);
                let template = '';
                if (!tplt) {
                    for (let i = 0; i < result.length; i++) {
                        template += '<div class="card cardComment">' +
                            '<div class="card-header">' +
                            '<span id="user_' + result[i]['id'] + '">' + result[i]['username'] + '</span>' +
                            '<ul class="nav nav-tabs card-header-tabs float-right">' +
                            '<button class="btn btn-primary fa fa-edit btnCard comment-edit" data-edit-id="' + result[i]['id'] + '"></button>' +
                            '<button class="btn btn-warning fa fa-trash btnCard comment-delete" data-id="' + result[i]['id'] + '"></button>' +
                            '</ul>' +
                            '</div>' +
                            '<div class="card-body">' +
                            '<p class="card-text" id="comment_' + result[i]['id'] + '">' + result[i]['comment'] + '</p>' +
                            '<p class="card-text float-right"><small class="text-muted">' + result[i]['date'] + '</small></p>' +
                            '</div>' +
                            '</div>';
                    }
                } else {

                    for (let i = 0; i < result.length; i++) {
                        temp = tplt;
                        temp = temp.replace("!username!", result[i]['username']);
                        temp = temp.replace(/!id!/g, result[i]['id']);
                        temp = temp.replace("!comment!", result[i]['comment']);
                        temp = temp.replace("!date!", result[i]['date']);
                        template += temp;
                    }
                }
                $('.blockComment').html(template);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

}
