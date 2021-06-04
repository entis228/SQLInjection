<?php
$input=json_decode(array_key_first($_POST));
$dbname=$input->dbname;
$olddbname=$input->old;
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$format = "UPDATE settings SET dbname = '%s' WHERE id = 1";
$db->execute("TRUNCATE TABLE version");
$db->execute(sprintf($format,(string)$dbname));
$db->execute("DROP DATABASE IF EXISTS $olddbname");
$db->execute("CREATE DATABASE $dbname");
$db->execute("INSERT INTO version (request) VALUES ('CREATE DATABASE $dbname')");