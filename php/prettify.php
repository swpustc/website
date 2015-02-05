<?php
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$encode=mb_detect_encoding($text, array('ASCII','UTF-8','GBK','BIG5'));
$html = htmlspecialchars(iconv($encode, "UTF-8//IGNORE", $text));
$name = basename($_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME']);
$css  = $_COOKIE['css-prettify'];
if($css<0 or $css>9) $css = 0;
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><?php echo $name; ?></title>
    <link href="//cdn.swpbox.info/css/prettify/prettify.css" type="text/css" rel="stylesheet" title="Default" ID="CSS0" <?php if($css!=0) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/body.min.css" type="text/css" rel="stylesheet" />
    <link href="//cdn.swpbox.info/css/prettify/vibrant-ink.css" type="text/css" rel="stylesheet" title="Vibrant Ink" ID="CSS1" <?php if($css!=1) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/github.css" type="text/css" rel="stylesheet" title="GitHub" ID="CSS2" <?php if($css!=2) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/tomorrow-night.css" type="text/css" rel="stylesheet" title="Tomorrow Night" ID="CSS3" <?php if($css!=3) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/tomorrow.css" type="text/css" rel="stylesheet" title="Tomorrow" ID="CSS4" <?php if($css!=4) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/tomorrow-night-eighties.css" type="text/css" rel="stylesheet" title="Tomorrow Night Eighties" ID="CSS5" <?php if($css!=5) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/tomorrow-night-blue.css" type="text/css" rel="stylesheet" title="Tomorrow Night Blue" ID="CSS6" <?php if($css!=6) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/tomorrow-night-bright.css" type="text/css" rel="stylesheet" title="Tomorrow Night Bright" ID="CSS7" <?php if($css!=7) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/hemisu-dark.css" type="text/css" rel="stylesheet" title="Hemisu Dark" ID="CSS8" <?php if($css!=8) echo "disabled"; ?>/>
    <link href="//cdn.swpbox.info/css/prettify/hemisu-light.css" type="text/css" rel="stylesheet" title="Hemisu Light" ID="CSS9" <?php if($css!=9) echo "disabled"; ?>/>
    <script type="text/javascript" src="//cdn.swpbox.info/js/prettify/prettify.js"></script>
    <script type="text/javascript" src="//cdn.swpbox.info/js/prettify/body.min.js"></script>
  </head>
  <body onload="prettyPrint()">
    <a name="top" id="top"></a>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#end">end</a>&nbsp;&nbsp;<script type="text/javascript">
document.write('<a href="//download.swpbox.info/ftp'+document.location.pathname+'">download</a>');
    </script>&nbsp;&nbsp;&nbsp;&nbsp;<select id="select-css" onchange="selectCss('css-prettify')">
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
document.getElementById("select-css").selectedIndex=getCss("css-prettify");
    </script></code>
    <pre class="prettyprint linenums"><?php echo $html; ?></pre>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#top">top</a>&nbsp;&nbsp;<script type="text/javascript">
document.write('<a href="//download.swpbox.info/ftp'+document.location.pathname+'">download</a>');
    </script>&nbsp;&nbsp;&nbsp;&nbsp;Prettify:
      <a href="https://code.google.com/p/google-code-prettify/">Source</a>
      <a href="http://www.apache.org/licenses/LICENSE-2.0">License</a>
    </code>
    <a name="end" id="end"></a>
  </body>
</html>
