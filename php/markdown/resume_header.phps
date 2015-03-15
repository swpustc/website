<?php
spl_autoload_register(function($class){
  require preg_replace('{\\\\|_(?!.*\\\\)}', DIRECTORY_SEPARATOR, ltrim($class, '\\')).'.php';
});
use \Michelf\MarkdownExtra;
$file = $_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME'];
$name = basename($_SERVER['SCRIPT_NAME']);
$file_enus = $_SERVER['DOCUMENT_ROOT'].'/en_US'.$_SERVER['SCRIPT_NAME'];
$file_zhcn = $_SERVER['DOCUMENT_ROOT'].'/zh_CN'.$_SERVER['SCRIPT_NAME'];
$file_zhtw = $_SERVER['DOCUMENT_ROOT'].'/zh_TW'.$_SERVER['SCRIPT_NAME'];
$file_enus_exist = file_exists($file_enus);
$file_zhcn_exist = file_exists($file_zhcn);
$file_zhtw_exist = file_exists($file_zhtw);
if (!$file_enus_exist && !$file_zhcn_exist && ! $file_zhtw_exist) {
  header('HTTP/1.1 404 Not Found');
  header('status: 404 Not Found');
  exit;
}
$resume_lang = $_GET['lang'];
$resume_lang_write = $_GET['write'];
if (!$resume_lang || $resume_lang == '');
elseif (preg_match('/^en[-_]?(us)?$/i', $resume_lang)) {
  if ($resume_lang_write)
    setcookie("resume-lang", 'lang-en_us', 2147483647, '/', 'swpbox.info');
  else
    setcookie("resume-lang_tmp", 'lang-en_us');
}
elseif (preg_match('/^zh[-_]?(cn)?$/i', $resume_lang)) {
  if ($resume_lang_write)
    setcookie("resume-lang", 'lang-zh_cn', 2147483647, '/', 'swpbox.info');
  else
    setcookie("resume-lang_tmp", 'lang-zh_cn');
}
elseif (preg_match('/^zh[-_]?tw$/i', $resume_lang)) {
  if ($resume_lang_write)
    setcookie("resume-lang", 'lang-zh_tw', 2147483647, '/', 'swpbox.info');
  else
    setcookie("resume-lang_tmp", 'lang-zh_tw');
}
$file_enus_down = '//ftp.swpbox.info/html/resume/en_US'.$_SERVER['SCRIPT_NAME'].'?src=1';
$file_zhcn_down = '//ftp.swpbox.info/html/resume/zh_CN'.$_SERVER['SCRIPT_NAME'].'?src=1';
$file_zhtw_down = '//ftp.swpbox.info/html/resume/zh_TW'.$_SERVER['SCRIPT_NAME'].'?src=1';
$file_enus_down_title = 'View Source: '.$name.' (en_US)';
$file_zhcn_down_title = 'View Source: '.$name.' (zh_CN)';
$file_zhtw_down_title = 'View Source: '.$name.' (zh_TW)';
$file_title = 'swpustc | Resume - '.$name;
$file_enus_title = 'swpustc | Resume - '.$name.' (en_US)';
$file_zhcn_title = 'swpustc | Resume - '.$name.' (zh_CN)';
$file_zhtw_title = 'swpustc | Resume - '.$name.' (zh_TW)';
$file_text = file_get_contents($file);
$file_enus_text = $file_enus_exist ? file_get_contents($file_enus) : '';
$file_zhcn_text = $file_zhcn_exist ? file_get_contents($file_zhcn) : '';
$file_zhtw_text = $file_zhtw_exist ? file_get_contents($file_zhtw) : '';
$error_enus = '<div class="error404"><h1>404</h1><div class="title-error">Page Not Found!</div><div class="description-error">Sorry, the specified language version does not exist.</div></div>'."\n";
$error_zhcn = '<div class="error404"><h1>404</h1><div class="title-error">页面未找到</div><div class="description-error">抱歉，指定的语言版本不存在。</div></div>'."\n";
$error_zhtw = '<div class="error404"><h1>404</h1><div class="title-error">頁面未找到</div><div class="description-error">抱歉，指定的語言版本不存在。</div></div>'."\n";
$file_html = MarkdownExtra::defaultTransform(iconv(mb_detect_encoding($file_text, array('ASCII', 'UTF-8', 'GBK', 'BIG5')), "UTF-8//IGNORE", $file_text));
$file_enus_html = $file_enus_exist ?
  MarkdownExtra::defaultTransform(iconv(mb_detect_encoding($file_enus_text, array('ASCII', 'UTF-8', 'GBK', 'BIG5')), "UTF-8//IGNORE", $file_enus_text)) :
    $error_enus;
$file_zhcn_html = $file_zhcn_exist ?
  MarkdownExtra::defaultTransform(iconv(mb_detect_encoding($file_zhcn_text, array('ASCII', 'UTF-8', 'GBK', 'BIG5')), "UTF-8//IGNORE", $file_zhcn_text)) :
    $error_zhcn;
$file_zhtw_html = $file_zhtw_exist ?
  MarkdownExtra::defaultTransform(iconv(mb_detect_encoding($file_zhtw_text, array('ASCII', 'UTF-8', 'GBK', 'BIG5')), "UTF-8//IGNORE", $file_zhtw_text)) :
    $error_zhtw;
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
include("../../DOCTYPE.shtml");
?>
<title id="resume-title"
  lang-en_us="<?php echo $file_enus_title; ?>"
  lang-zh_cn="<?php echo $file_zhcn_title; ?>"
  lang-zh_tw="<?php echo $file_zhtw_title; ?>"
  ><?php echo $file_title; ?></title>
<link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen"/>
