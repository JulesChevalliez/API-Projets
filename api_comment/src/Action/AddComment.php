<?php
namespace App\Action;
use App\Manager\CommentManager;

class AddComment{
    public function __invoke(){
        $name = $_GET['name'];
        $comment = $_GET['comment'];
        $uuid = $_GET['uuid'];

        $manager = new CommentManager();
        $addComment = $manager->addComment($name,$comment,$uuid);
        return $addComment;
    }

}