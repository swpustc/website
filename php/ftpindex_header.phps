<?php
$pwd = $_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME'];
$bgn = strlen($_SERVER['DOCUMENT_ROOT']);
$cur = substr($pwd, $bgn);
$it  = new FilesystemIterator($pwd);
$size_1m   = ' size-1M';
$size_10m  = ' size-10M';
$size_100m = ' size-100M';
$size_1g   = ' size-1G';
$size_g1g  = ' size-g1G';
$folder_class = 'type-folder';
$file_class   = 'type-file';
foreach ($it as $file){
  $date = date('Y-m-d H:i:s', $file->getMTime());
  if ($file->isDir()) {
    $fileSize = '_';
    $fileName = $file->getFilename().'/';
    $pathName = $file->getPathname().'/';
    $dirhtml[$fileName] = '<article class="'.$folder_class.'"><div class="one-half"><a href="'.substr($pathName, $bgn).'" title="'.$fileName.'">'.$fileName.'</a></div><div class="one-fourth autohide">'.$date.'</div><div class="one-fourth last autohide">_</div></article><hr class="clear"/>';
  } elseif ($file->isFile()) {
    $fileSize = $file->getSize();
    if ($fileSize < 0)
      $fileSize += 4294967296;
    $file_class_current = $file_class;
    if ($fileSize < 1024 * 1024)
      $file_class_current .= $size_1m;
    elseif ($fileSize < 10 * 1024 * 1024)
      $file_class_current .= $size_10m;
    elseif ($fileSize < 100 * 1024 * 1024)
      $file_class_current .= $size_100m;
    elseif ($fileSize < 1024 * 1024 * 1024)
      $file_class_current .= $size_1g;
    else
      $file_class_current .= $size_g1g;
    if ($fileSize < 1024);
    elseif ($fileSize < 1024 * 1024)
      $fileSize  = round($fileSize / 1024, 2).'K';
    elseif ($fileSize < 1024 * 1024 * 1024)
      $fileSize  = round($fileSize / 1024 / 1024, 2).'M';
    elseif ($fileSize < 1024 * 1024 * 1024 * 1024)
      $fileSize  = round($fileSize / 1024 / 1024 / 1024, 2).'G';
    $fileName = $file->getFilename();
    $pathName = $file->getPathname();
    $filehtml[$fileName] = '<article class="'.$file_class_current.'"><div class="one-half"><a href="'.substr($pathName, $bgn).'" title="'.$fileName.'">'.$fileName.'</a></div><div class="one-fourth autohide">'.$date.'</div><div class="one-fourth last autohide">'.$fileSize.'</div></article><hr class="clear"/>';
  }
}
ksort($dirhtml);
ksort($filehtml);
function isChildDocument($thispath) {
  if(strncmp($_SERVER['SCRIPT_NAME'],$thispath,strlen($thispath))==0)
    echo " class=\"current\"";
}
include("../DOCTYPE.shtml");
?>
<title>swpustc | Index of <?php echo $cur; ?></title>
<link rel="stylesheet" href="//cdn.swpbox.info/css/style.min.css" media="screen"/>
