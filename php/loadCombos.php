<?php
include 'DataBase.php';
$db = new Database('sqlinjectionres');
$res=$db->query('SELECT id FROM version WHERE id!="1"');
for($i=0;$i<2;$i++){
echo sprintf('<select id="combo%s" onchange="changeCombo(%s)">',(string)$i,(string)$i);
foreach ($res as $it){
    echo (sprintf('<option value="%s">%s</option>',$it['id'],$it['id']));
}
echo '</select>';
}