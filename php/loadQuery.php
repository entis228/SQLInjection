<?php
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$res=$db->query("SELECT dbname, sqlquery FROM settings");
$query = $res[0]['sqlquery'];
$raw=str_replace('%s','<input type="text" id="">',$query);
function str_replace_once($search, $replace, $text){ 
    $pos = strpos($text, $search); 
    return $pos!==false ? substr_replace($text, $replace, $pos, strlen($search)) : $text; 
 }
$count=substr_count($query,"%s");
for($i=0;$i<$count;$i++){
    $raw = str_replace_once('id=""','id="par'.(string)$i.'"',$raw);
}
echo $raw;