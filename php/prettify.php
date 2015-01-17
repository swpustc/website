<?php
$text = file_get_contents($_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME']);
$html = htmlspecialchars($text);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><?php echo basename($_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME']); ?></title>
    <link href="/static/prettify/prettify.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="/static/prettify/prettify.js"></script>
    <link href="/static/prettify-body.css" type="text/css" rel="stylesheet" />
  </head>
  <body onload="prettyPrint()">
    <a name="top" id="top"></a>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#end">end</a>&nbsp;&nbsp;&nbsp;&nbsp;<script type="text/javascript">
document.write('Download: <a href="/download'+document.location.pathname+'" type="application/octet-stream"><?php echo basename($_SERVER['DOCUMENT_ROOT'] . $_SERVER['SCRIPT_NAME']); ?></a>');
    </script></code>
    <pre class="prettyprint linenums"><?php echo $html; ?></pre>
    <code><a href="javascript:history.go(-1);">back</a>
      <a href="#top">top</a>&nbsp;&nbsp;&nbsp;&nbsp;Prettify:
      <a href="https://code.google.com/p/google-code-prettify/">Source</a>
      <a href="http://www.apache.org/licenses/LICENSE-2.0">License</a>
    </code>
    <a name="end" id="end"></a>
  </body>
</html>
