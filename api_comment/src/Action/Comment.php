<?php
namespace App\Action;
use App\Manager\CommentManager;

class Comment{
    public function __invoke(){
        $uuid = $_GET['uuid'];
        $manager = new CommentManager();
        $comment = $manager->comment($uuid);
        return $comment;
    }

}