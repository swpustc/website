<?php
$name = basename($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$src  = '//download.swpbox.info/ftp'.$_SERVER['SCRIPT_NAME'];
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
?>
<!DOCTYPE html>
<!--[if lte IE 8]>              <html class="ie8    no-js" lang="zh-CN"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="not-ie no-js" lang="zh-CN"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>swpustc | <?php echo $name; ?></title>
  <link rel="stylesheet" href="//cdn.swpbox.info/css/jquery.fancybox.min.css" media="screen"/>
