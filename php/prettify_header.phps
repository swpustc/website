<?php
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$encode=mb_detect_encoding($text, array('ASCII','UTF-8','GBK','BIG5'));
if ($encode != '') {
  $html = htmlspecialchars(iconv($encode, "UTF-8//TRANSLIT", $text));
} else {
  $html = htmlspecialchars(mb_convert_encoding($text, "UTF-8"));
}
$name = basename($_SERVER['SCRIPT_NAME']);
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
include("../DOCTYPE.shtml");
?>
<title>swpustc | <?php echo $name; ?></title>
<link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen"/>
