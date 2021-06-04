<?php//
$idtable = $_POST['idtable'];
$comboVal=$_POST['comboVal'];
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$queries = $db->query(sprintf('SELECT request FROM version WHERE id!="1" && id<="%s"',$comboVal));
$db->execute('CREATE DATABASE ttest');
$db->execute('USE ttest');
foreach ($queries as $it){
    $db->execute($it['request']);
}
$tablesName=$db->query('SHOW TABLES');
$table = $tablesName[0]['Tables_in_ttest'];
$res = $db->query(sprintf('SELECT * FROM %s',$table));
$db->execute('DROP DATABASE ttest');
if(count($res)>0){
$title=array_keys($res[0]);
echo "<table><thead><tr>";
foreach($title as $it){
    echo "<td>".$it."</td>";
}
echo "</tr></thead><tbody>";
foreach($res as $it){
    $val = array_values($it);
    echo "<tr>";
    foreach($val as $i){
        echo "<td>".$i."</td>";
    }
    echo "</tr>";
}
echo "</tbody></table>";}
else echo "Таблица пустая";