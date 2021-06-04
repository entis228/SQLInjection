<?php
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$res=$db->query("SELECT dbname, sqlquery FROM settings");
$dbname="sqlinjection";
$query="SELECT * FROM";
if(array_key_exists('dbname',$res[0])){
    $dbname=$res[0]['dbname'];
}
if(array_key_exists('sqlquery',$res[0])){
    $query=$res[0]['sqlquery'];
}
echo sprintf("if(localStorage.getItem('dbname')==null){localStorage.setItem('dbname','%s');localStorage.setItem('query','%s');}",$dbname,$query);