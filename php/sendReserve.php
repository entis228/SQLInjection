<?php
$input=json_decode(array_key_first($_POST));
$query=str_replace('_',' ',$input->query);
$dbname=$input->dbname;
include 'DataBase.php';
$db = new Database($dbname);
try{
$db->execute($query);
$db->execute('INSERT INTO sqlinjectionres.version (request) VALUES ("'.$query.'")');
echo "успешно";
}
catch(Exception $e){
    echo "Ошибка при вводе запроса <br>";
    echo $e->getMessage();
}