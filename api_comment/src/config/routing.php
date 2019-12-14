<?php 
use App\Action\AddComment;
use App\Action\DeleteComment;
use App\Action\EditComment;
use App\Action\Comment;

return[
    [
        'path'=> '/api/addComment[/{uuid}[/{name}[/{comment}]]]',
        'method'=> 'GET',
        'action'=> AddComment::class
    ],
    [
        'path'=> '/api/deleteComment[/{id}]',
        'method'=> 'POST',
        'action'=> DeleteComment::class
    ],
    [
        'path'=> '/api/editComment[/{id}[/{comment}]]',
        'method'=> 'POST',
        'action'=> EditComment::class
    ],
    [
        'path'=> '/api/comment[/{uuid}]',
        'method'=> 'GET',
        'action'=> Comment::class
    ],

];
