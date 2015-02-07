<?php
spl_autoload_register(function($class){
  require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});
use \Michelf\Markdown;
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$encode=mb_detect_encoding($text, array('ASCII','UTF-8','GBK','BIG5'));
$html = Markdown::defaultTransform(iconv($encode, "UTF-8//IGNORE", $text));
$name = basename($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
?>
<!DOCTYPE html>
<!--[if lte IE 8]>              <html class="ie8 no-js" lang="en">     <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="not-ie no-js" lang="en">  <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>swpustc | Resume - <?php echo $name; ?></title>
  <link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen" />
  <script src="//cdn.swpbox.info/js/modernizr.custom.js"></script>
</head>
