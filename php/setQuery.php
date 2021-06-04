<?php
$input=json_decode(array_key_first($_POST));
$query=str_replace('_',' ',$input->query);
$query=str_replace('/','=',$query);
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$format = "UPDATE settings SET sqlquery = '%s' WHERE id = 1";
$db->execute(sprintf($format,$query));
//var_dump($_POST);
