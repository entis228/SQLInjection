<?php
$version = $_POST['version'];
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$dbver = $db->query(sprintf('SELECT request FROM version WHERE id<="%s"',$version));
$db->execute('DROP TABLE version');
$db->execute('CREATE TABLE version(id INTEGER PRIMARY KEY AUTO_INCREMENT,request TEXT)');
foreach($dbver as $it){
    $db->execute(sprintf('INSERT INTO version (request) VALUES ("%s")',$it['request']));
}
$table=$db->query('SELECT dbname FROM settings');
$dbname = $table[0]['dbname'];
$db->execute(sprintf('DROP DATABASE %s',$dbname));
$dbver = $db->query('SELECT request FROM version');
$db->execute($dbver[0]['request']);
$db->execute(sprintf('USE %s',$dbname));
for($i=1;$i<count($dbver);$i++){
    $db->execute($dbver[$i]['request']);
}