<?php
$name = basename($_SERVER['SCRIPT_NAME']);
$src  = '//download.swpbox.info/ftp'.$_SERVER['SCRIPT_NAME'];
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
include("../DOCTYPE.shtml");
?>
<title>swpustc | <?php echo $name; ?></title>
<link rel="stylesheet" href="//cdn.swpbox.info/css/jquery.fancybox.min.css" media="screen"/>
<link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen"/>
