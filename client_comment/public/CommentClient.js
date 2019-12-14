const Url = "http://localhost/MicroServiceComment/api_comment/public/index.php";
let uuid = 0;

$(document).ready(function () {
    $('#sendForm').on('click', function () {
        arrayForm = $("#formComment").serializeArray();
        const FullUrl = Url + "/api/addComment";
        if (localStorage.getItem("uuid") === null) {
            alert("Désolé une erreur est survenue !")
        } else if (arrayForm[0].value === "") {
            alert("Vous n'avez pas renseigner de nom")
        } else if (arrayForm[1].value === "") {
            alert("Votre message est vide");
        } else {
            uuid = localStorage.getItem("uuid");
            $.ajax({
                url: FullUrl,
                type: "GET",
                data: {uuid: uuid, name: arrayForm[0].value, comment: arrayForm[1].value},
                success: function (result) {
                    comments();
                    $('#name').val("");
                    $('#msg').html("");
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    $(document).on('click', '.comment-edit', function () {
        $('#editForm').show();
        $('#commentForm').hide();
        let element = $(this).attr('data-edit-id');
        let trElement = $(this)[0].parentElement.parentElement.firstChild;
        console.log($(this)[0].parentElement.parentElement.nextSibling.firstChild);
        let nom = trElement.innerHTML;
        let comment = $(this)[0].parentElement.parentElement.nextSibling.firstChild.innerHTML;
        localStorage.setItem("idComment", element);
        $('#name').val(nom);
        $('#msg').html(comment);
        window.location = "#editForm";
    });

    $('#sendEdit').on('click', function () {
        arrayForm = $("#forEdit").serializeArray();
        if (localStorage.getItem("idComment") === null) {
            alert("Une erreur est survenue !")
        } else if (arrayForm[1].value === "") {
            alert("Votre message est vide");

        } else {
            let idToEdit = localStorage.getItem("idComment");
            $('#editForm').hide();
            $('#commentForm').show();
            $('#name').val("");
            $('#msg').html("");
            const FullUrl = Url + "/api/editComment";
            $.ajax({
                url: FullUrl,
                type: "POST",
                data: {id: idToEdit, comment: arrayForm[1].value},
                success: function (result) {
                    comments();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

    });

    $('.btnLireTicket').on('click', function () {
        uuid = $(this).attr('data-id-ticket');
        localStorage.setItem("uuid", uuid);
        console.log(localStorage.getItem("uuid"));
    });

    function comments() {
        const FullUrl = Url + "/api/comment";
        if (localStorage.getItem("uuid") === null) {
            alert("Désolé une erreur est survenue !")
        } else {
            uuid = localStorage.getItem("uuid");
            $.ajax({
                url: FullUrl,
                type: "GET",
                data: {uuid: uuid},
                success: function (result) {
                    console.log(result);
                    let template = '';
                    for (let i = 0; i < result.length; i++) {
                        template += '<div class="card cardComment">' +
                                        '<div class="card-header">' +
                                            '<span>' + result[i]['username']+'</span>'+
                                            '<ul class="nav nav-tabs card-header-tabs float-right">' +
                                                '<button class="btn btn-primary fa fa-edit btnCard comment-edit" data-edit-id="'+result[i]['id']+'"></button>' +
                                                '<button class="btn btn-warning fa fa-trash btnCard comment-delete" data-id="'+result[i]['id']+'"></button>' +
                                            '</ul>' +
                                        '</div>' +
                                        '<div class="card-body">' +
                                            '<p class="card-text">'+result[i]['comment']+'</p>' +
                                            '<p class="card-text float-right"><small class="text-muted">'+result[i]['date']+'</small></p>' +
                                        '</div>' +
                                    '</div>';
                    }
                    $('.blockComment').html(template);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

    }

    comments();


    $(document).on('click', '.comment-delete', function () {
        let element = $(this).attr('data-id');
        const FullUrl = Url + "/api/deleteComment";
        console.log(FullUrl);
        $.ajax({
            url: FullUrl,
            type: "POST",
            data: {id: element},
            success: function (result) {
                comments();
                console.log(result);
            },
            error: function (error) {
                console.log(error);
            }
        });

    });

});

