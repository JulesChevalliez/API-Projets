<?php

namespace App\Manager;

include __DIR__ . "/../config/Database.class.php";
require __DIR__."/../config/vars.php";

use Database;



/**
 * Class CommentManager
 * @package App\Manager
 */
class CommentManager
{
    /**
     * @param String $name
     * @param String $comment
     * @param String $uuid
     * @return string
     */
    public function addComment(String $name, String $comment, String $uuid)
    { 
        $db = new Database();
        $db->query('INSERT INTO commentaires (uuid, username, comment) VALUES (:uuid, :username, :comment)');
        $db->bind(':username', $name);
        $db->bind(':comment', $comment);
        $db->bind(':uuid', $uuid);
        $db->execute();
        return json_encode("Commentaire ajoute !");
    
    }

    /**
     * @param String $comment
     * @param int $id
     * @return string
     */
    public function editComment(String $id,String $comment)
    {
        $db = new Database();
        $db->query('UPDATE commentaires SET comment=:comment WHERE id=:id');
        $db->bind(':id', $id);
        $db->bind(':comment', $comment);
        $db->execute();
        return json_encode("Commentaire mis à jour!");
    }

    /**
     * @param int $id
     * @return string
     */
    public function deleteComment(int $id)
    { 
        $db = new Database();
        $db->query('DELETE FROM commentaires WHERE commentaires.id =:id');
        $db->bind(':id', $id);
        $db->execute();
        return json_encode("Commentaire supprimer !");
    }


    /**
     * @param int $uuid
     * @return string
     */
    public function comment(int $uuid)
    {
        $db = new Database();
        $db->query('SELECT * FROM commentaires WHERE uuid=:uuid');
        $db->bind(":uuid", $uuid);
        return json_encode($db->resultset());
    }
}
