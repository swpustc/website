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
<html>
  <head>
    <meta charset="utf-8" />
    <title><?php echo $name; ?></title>
    <link href="//static.swpbox.info/css/markdown.min.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="//static.swpbox.info/css/prettify/prettify.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="//static.swpbox.info/js/prettify/prettify.js"></script>
  </head>
  <body onload="prettyPrint()">
    <a name="top" id="top"></a><?php echo $html; ?><br/><br/><hr/>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#top">top</a>&nbsp;&nbsp;&nbsp;&nbsp;Markdown:
      <a href="https://github.com/michelf/php-markdown">Source</a>
      <a href="https://github.com/michelf/php-markdown/blob/lib/License.md">License</a>
    </code>
    <a name="end" id="end"></a>
  </body>
</html>
