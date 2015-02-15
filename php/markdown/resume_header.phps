<?php
spl_autoload_register(function($class){
 require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});
use \Michelf\MarkdownExtra;
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$encode=mb_detect_encoding($text, array('ASCII','UTF-8','GBK','BIG5'));
$html = MarkdownExtra::defaultTransform(iconv($encode, "UTF-8//IGNORE", $text));
$name = basename($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
function isChildDocument($thispath) {
 if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
  echo " class=\"current\"";
}
?>
<!DOCTYPE html>
<!--[if lte IE 8]>              <html class="ie8 no-js" lang="zh-CN">    <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="not-ie no-js" lang="zh-CN"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<title>swpustc | Resume - <?php echo $name; ?></title>
</head>
