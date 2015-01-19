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
    <link href="/static/markdown.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="/static/prettify/prettify.css" type="text/css" rel="stylesheet" title="Default" ID="CSS0" />
    <link href="/static/prettify/body.css" type="text/css" rel="stylesheet" />
    <link href="/static/prettify/vibrant-ink.css" type="text/css" rel="stylesheet" title="Vibrant Ink" ID="CSS1" DISABLED />
    <link href="/static/prettify/github.css" type="text/css" rel="stylesheet" title="GitHub" ID="CSS2" DISABLED />
    <link href="/static/prettify/tomorrow-night.css" type="text/css" rel="stylesheet" title="Tomorrow Night" ID="CSS3" DISABLED />
    <link href="/static/prettify/tomorrow.css" type="text/css" rel="stylesheet" title="Tomorrow" ID="CSS4" DISABLED />
    <link href="/static/prettify/tomorrow-night-eighties.css" type="text/css" rel="stylesheet" title="Tomorrow Night Eighties" ID="CSS5" DISABLED />
    <link href="/static/prettify/tomorrow-night-blue.css" type="text/css" rel="stylesheet" title="Tomorrow Night Blue" ID="CSS6" DISABLED />
    <link href="/static/prettify/tomorrow-night-bright.css" type="text/css" rel="stylesheet" title="Tomorrow Night Bright" ID="CSS7" DISABLED />
    <link href="/static/prettify/hemisu-dark.css" type="text/css" rel="stylesheet" title="Hemisu Dark" ID="CSS8" DISABLED />
    <link href="/static/prettify/hemisu-light.css" type="text/css" rel="stylesheet" title="Hemisu Light" ID="CSS9" DISABLED />
    <script type="text/javascript" src="/static/prettify/prettify.js"></script>
    <script type="text/javascript" src="/static/prettify/body.js"></script>
    <script type="text/javascript">changeCss("css-markdown",getCss("css-markdown"))</script>
  </head>
  <body onload="prettyPrint()">
    <a name="top" id="top"></a>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#end">end</a>&nbsp;&nbsp;<script type="text/javascript">
document.write('<a href="/download'+document.location.pathname+'">download</a>');
    </script>&nbsp;&nbsp;&nbsp;&nbsp;<select id="select-css" onchange="selectCss('css-markdown')">
      <option value="0">Default Style</option>
      <option value="1">Vibrant Ink</option>
      <option value="2">GitHub</option>
      <option value="3">Tomorrow Night</option>
      <option value="4">Tomorrow</option>
      <option value="5">Tomorrow Night Eighties</option>
      <option value="6">Tomorrow Night Blue</option>
      <option value="7">Tomorrow Night Bright</option>
      <option value="8">Hemisu Dark</option>
      <option value="9">Hemisu Light</option>
    </select><script type="text/javascript">
document.getElementById("select-css").selectedIndex=getCss("css-markdown");
    </script></code>
    <hr/><?php echo $html; ?><br/><br/><hr/>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#top">top</a>&nbsp;&nbsp;<script type="text/javascript">
document.write('<a href="/download'+document.location.pathname+'">download</a>');
      </script>&nbsp;&nbsp;&nbsp;&nbsp;Markdown:
      <a href="https://github.com/michelf/php-markdown">Source</a>
      <a href="https://github.com/michelf/php-markdown/blob/lib/License.md">License</a>
    </code>
    <a name="end" id="end"></a>
  </body>
</html>
