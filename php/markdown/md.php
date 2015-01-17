<?php
spl_autoload_register(function($class){
  require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});
use \Michelf\Markdown;
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME']);
$html = Markdown::defaultTransform($text);
$name = basename($_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME']);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><?php echo $name; ?></title>
    <link href="/static/prettify/prettify.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="/static/prettify/prettify.js"></script>
    <link href="/static/markdown.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body onload="prettyPrint()">
    <a name="top" id="top"></a>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#end">end</a>&nbsp;&nbsp;&nbsp;&nbsp;<script type="text/javascript">
document.write('Download: <a href="/download'+document.location.pathname+'"><?php echo $name; ?></a>');
    </script></code><hr/><?php echo $html; ?><br/><br/><hr/>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#top">top</a>&nbsp;&nbsp;&nbsp;&nbsp;Markdown:
      <a href="https://github.com/michelf/php-markdown">Source</a>
      <a href="https://github.com/michelf/php-markdown/blob/lib/License.md">License</a>
    </code>
    <a name="end" id="end"></a>
  </body>
</html>
