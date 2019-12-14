<?php
namespace App\Action;
use App\Manager\CommentManager;

class DeleteComment{
    public function __invoke(){
        $id = $_POST['id'];
        $manager = new CommentManager();
        $deleteComment = $manager->deleteComment($id);
        return $deleteComment;
    }

}