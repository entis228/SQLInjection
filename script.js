if(localStorage.getItem('dbname')==null){//почему-то localstarage был пуст после перезагрузки компьютера, поэтому переподгружаю значения из бд
    if(document.getElementById('dbname')!=null){
        //localStorage.setItem('dbname','sqlinjection');
        var ajax1 = new XMLHttpRequest();
        ajax1.open('POST','php/setSettings.php');
        ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax1.onreadystatechange=function(){
        if(ajax1.readyState == 4){
            if(ajax1.status == 200){
                console.log(ajax1);               
                var res1=document.getElementById('set');
                res1.innerHTML=ajax1.response;
            }
        }
    }
    ajax1.send();
    }
}
if(document.getElementById('dbname')!=null){//заполнение настроек
    document.getElementById('dbname').value=localStorage.getItem('dbname');
}
if(localStorage.getItem('query')==null){
    localStorage.setItem('query','SELECT * FROM');
}
if(document.getElementById('quer')!=null){
    document.getElementById('quer').value=localStorage.getItem('query');
}

function setDBName(){//изменить название БД
    var dbname=document.getElementById('dbname').value;
    var old=localStorage.getItem('dbname');
    localStorage.setItem('dbname',dbname);
    var ajax1 = new XMLHttpRequest();
        ajax1.open('POST','php/sendDBName.php');
        ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax1.onreadystatechange=function(){
        if(ajax1.readyState == 4){
            if(ajax1.status == 200){
                console.log(ajax1);               
                // var res1=document.getElementById('result');
                // res1.innerHTML=ajax1.response;
            }
        }
    }
    ajax1.send(JSON.stringify({"dbname":dbname,"old":old}));
}
function sendReserve(){//SQL консоль в настройках
    var query=document.getElementById('exec').value;
    var dbname = localStorage.getItem('dbname');
    var ajax1 = new XMLHttpRequest();
        ajax1.open('POST','php/sendReserve.php');
        ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax1.onreadystatechange=function(){
        if(ajax1.readyState == 4){
            if(ajax1.status == 200){
                console.log(ajax1);               
                document.getElementById('exec').value="";
                var res1=document.getElementById('result');
                res1.innerHTML=ajax1.response;
            }
        }
    }
    ajax1.send(JSON.stringify({"query":query,"dbname":dbname}));
}
function setQuery(){//запрос с пользовательскими параметрами
    var query=document.getElementById('quer').value;
    var ajax1 = new XMLHttpRequest();
        ajax1.open('POST','php/setQuery.php');
        ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax1.onreadystatechange=function(){
        if(ajax1.readyState == 4){
            if(ajax1.status == 200){
                console.log(ajax1);               
                localStorage.setItem('query',query);
                // var res1=document.getElementById('result');
                // res1.innerHTML=ajax1.response;
            }
        }
    }
    ajax1.send(JSON.stringify({"query":query}));
}
function loadInfo(){//загрузка данных основной страницы
    var ajax1 = new XMLHttpRequest();
        ajax1.open('POST','php/loadQuery.php');
        ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax1.onreadystatechange=function(){
        if(ajax1.readyState == 4){
            if(ajax1.status == 200){
                console.log(ajax1);               
                var res1=document.getElementById('injection');
                res1.innerHTML=ajax1.response;
            }
        }
    }
    ajax1.send();
    var ajax3 = new XMLHttpRequest();
        ajax3.open('POST','php/loadCombos.php');
        ajax3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax3.onreadystatechange=function(){
        if(ajax3.readyState == 4){
            if(ajax3.status == 200){
                console.log(ajax3);               
                var res1=document.getElementById('combos');
                res1.innerHTML=ajax3.response;
            }
        }
    }
    ajax3.send();
}
function changeCombo(id){//загрузка таблиц при изменении выпадающего списка
    var comboVal=document.getElementById('combo'+id).value;
    var ajax1 = new XMLHttpRequest();
    ajax1.open('POST','php/changeCombo.php');
    ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax1.onreadystatechange=function(){
    if(ajax1.readyState == 4){
        if(ajax1.status == 200){
            console.log(ajax1);               
            var res1=document.getElementById('table'+id);
            res1.innerHTML=ajax1.response;
        }
    }
}
ajax1.send('idtable='+id+"&comboVal="+comboVal);
}
function Return(){//откат версии БД
    var num = document.getElementById('combo0').value;
    var ajax3 = new XMLHttpRequest();
        ajax3.open('POST','php/Return.php');
        ajax3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax3.onreadystatechange=function(){
        if(ajax3.readyState == 4){
            if(ajax3.status == 200){
                console.log(ajax3);               
                // var res1=document.getElementById('combos');
                // res1.innerHTML=ajax3.response;
                loadInfo();
            }
        }
    }
    ajax3.send('version='+num);
}
function sendInjection(){//отправка пользовательского запроса
    var params = new Array();
    for(var i=0;;i++){
        if(document.getElementById('par'+i)!=null){
            params.push(document.getElementById('par'+i).value);
        }else{
            break;
        }
    }
    var ajax1 = new XMLHttpRequest();
    ajax1.open('POST','php/sendInjection.php');
    ajax1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax1.onreadystatechange=function(){
    if(ajax1.readyState == 4){
        if(ajax1.status == 200){
            console.log(ajax1);
            loadInfo();               
            var res1=document.getElementById('result');
            res1.innerHTML=ajax1.response;
        }
    }
}
var str="";
for(let i=0;i<params.length;i++){
    if(i==0){
        str+="par0="+params[i];
    }else{
        str+="&par"+i+"="+params[i];
    }
}
ajax1.send(str);
}
function fillParams(){//заполнение пользовательских параметров
    var val = document.getElementById('stInj').value;
    
    var par0="";
    if(val=='1'){
        par0="' OR 1=1'";
    }else {
        if(val=='2'){
            par0="'1' UNION SELECT 1";
        }else{
            if(val=='3'){
                par0="' or '1'='1'/*' DROP TABLE city";
            }
        }
    }
    for(var i=0;;i++){
        if(document.getElementById('par'+i)!=null){
            document.getElementById('par'+i).value=par0;
        }else{
            break;
        }
    }
}
