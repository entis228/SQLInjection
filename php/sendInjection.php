<?php
function str_replace_once($search, $replace, $text){ 
    $pos = strpos($text, $search); 
    return $pos!==false ? substr_replace($text, $replace, $pos, strlen($search)) : $text; 
}
$params = array();
for($i=0;;$i++){
    if(isset($_POST['par'.$i])){
        array_push($params,$_POST['par'.$i]);
    }else{
        break;
    }
}
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$dbres = $db->query('SELECT * FROM settings');
$dbname = $dbres[0]['dbname'];
$queryformat = $dbres[0]['sqlquery'];
$query = $queryformat;
for($i=0;$i<count($params);$i++){
    $query=str_replace_once('%s',$params[$i],$query);
}
$db->execute('USE '.$dbname);
$res="";
try{
    $res=$db->query($query);
    $db->execute('USE sqlinjectionres');
    $db->execute(sprintf('INSERT INTO version (request) VALUES("%s")',$query));
    echo "Успешно <br>";
    $keys=array();
    foreach($res as $it){
        foreach($it as $key => $value){
            if(!array_key_exists($key,$keys)){
                $keys[$key]=array();
            }
        }
    }
    foreach($res as $it){
        foreach($it as $key => $value){
            array_push($keys[$key],$value);
        }
    }
    echo "<table>";
    foreach($keys as $key=>$value){
        echo "<tr><td>".$key.":</td>";
        foreach($value as $i){
            echo "<td>".$i."</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}catch(Exception $e){
    $res= "Ошибка при вводе запроса <br>";
    echo $e->getMessage();
}
//echo $res;
