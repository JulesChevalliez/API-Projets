<?php
namespace App\Action;
use App\Manager\CommentManager;

class EditComment{
    public function __invoke(){
       
        $commentaire = $_POST['comment'];
        $idcomment = $_POST['id'];

        $manager = new CommentManager();
        $editComment = $manager->editComment($idcomment,$commentaire);
        return $editComment;
    }

}