<?php
spl_autoload_register(function($class){
  require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});
use \Michelf\MarkdownExtra;
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$encode=mb_detect_encoding($text, array('ASCII','UTF-8','GBK','BIG5'));
$html = MarkdownExtra::defaultTransform(iconv($encode, "UTF-8//IGNORE", $text));
$name = basename($_SERVER['SCRIPT_NAME']);
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
include("../../DOCTYPE.shtml");
?>
<title>swpustc | <?php echo $name; ?></title>
<link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen"/>
