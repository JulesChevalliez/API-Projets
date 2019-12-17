
// template = '<div class="card cardComment">' +
//     '<div class="card-header">' +
//     '<span id="user_!id!">!username!</span>' +
//     '<p class="card-text float-right"><small class="text-muted">!date!</small></p>' +
//     '</div>' +
//     '<div class="card-body">' +
//     '<p class="card-text" id="comment_!id!">!comment!</p>' +
//     '<ul class="nav nav-tabs card-header-tabs float-right">' +
//     '<button class="btn btn-primary comment-edit" data-edit-id="!id!">Edit</button>' +
//     '<button class="btn btn-warning comment-delete" data-id="!id!">Delete</button>' +
//     '</ul>' +
//     '</div>' +
//     '</div>';

$(document).on('click', '.btnLireTicket', function () {
    uuid = $(this).attr('data-id-ticket');
    localStorage.setItem("uuid", uuid);
});

$(document).ready(function () {
    uuid = localStorage.getItem("uuid");
    comments(uuid);
});

$(document).on('click', '#sendForm', function () {
    arrayForm = $("#formComment").serializeArray();
    addCom(uuid, arrayForm[0].value, arrayForm[1].value);
    $('#nom').val("");
    $('#message').val("");
});

$(document).on('click', '.comment-edit', function () {
    $('#editForm').show();
    $('#commentForm').hide();
    let idComment = $(this).attr('data-edit-id');
    let nom = $("#user_" + idComment)[0].innerHTML;
    let comment = $("#comment_" + idComment)[0].innerHTML;
    localStorage.setItem("idComment", idComment);
    $('#name').val(nom);
    $('#msg').html(comment);
    window.location = "#editForm";
});

$(document).on('click', '#sendEdit', function () {
    arrayForm = $("#forEdit").serializeArray();
    idCom = localStorage.getItem("idComment");
    uuidEdit = localStorage.getItem("uuid");
    editCom(idCom, arrayForm[1].value, uuidEdit);
    $('#editForm').hide();
    $('#commentForm').show();
    $('#name').val("");
    $('#msg').html("");
});

$(document).on('click', '.comment-delete', function () {
    let id = $(this).attr('data-id');
    uuidDel = localStorage.getItem("uuid");
    deleteCom(id,uuidDel);
});