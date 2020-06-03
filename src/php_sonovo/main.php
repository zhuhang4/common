<?php
       $code = $_GET['code'];
       $weixin =  file_get_contents('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx62c9ebf3b75cd361&secret=8b5d2a768c9d214e88529adddcc63c55&code='.$code.'&grant_type=authorization_code');
       $jsondecode = json_decode($weixin,true);
       $getuser = 'https://api.weixin.qq.com/sns/userinfo?access_token='.$jsondecode['access_token'].'&openid='.$jsondecode['openid'].'&lang=zh_CN';
       $info = file_get_contents($getuser);
       echo $info;
?>