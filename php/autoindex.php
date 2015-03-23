<?php
$pwd = $_SERVER['DOCUMENT_ROOT'].$_SERVER['SCRIPT_NAME'];
$bgn = strlen($_SERVER['DOCUMENT_ROOT']);
$cur = substr($pwd, $bgn);
$it  = new FilesystemIterator($pwd);
?>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Index of <?php echo $cur ?></title>
</head>
<body bgcolor="white">
  <h1>Index of <?php echo $cur ?></h1><hr>
  <pre>
<?php
$left_part  = 82;
$right_part = 16;
$date_size  = 24;
foreach ($it as $file){
  $date = date('Y-m-d H:i:s', $file->getMTime());
  if ($file->isDir()) {
    $fileSize = '_';
    $fileName = $file->getFilename().'/';
    $fileNameSrc = $fileName;
    $fileNameGBK = iconv("UTF-8", "GBK//TRANSLIT", $fileName);
    if (strlen($fileNameGBK) > $left_part - $date_size + 4) {
      $fileNameGBK = mb_strcut($fileNameGBK, 0, $left_part - $date_size, 'GBK').' ...';
      $fileName = iconv("GBK", "UTF-8//TRANSLIT", $fileNameGBK);
    }
    $pathName = $file->getPathname().'/';
    $dirhtml[$fileNameSrc] = '<a href="'.substr($pathName, $bgn).'" title="'.$fileNameSrc.'">'.$fileName.'</a>'.str_pad($date, $left_part - strlen($fileNameGBK),' ',STR_PAD_LEFT).str_pad($fileSize, $right_part, ' ', STR_PAD_LEFT);
  } elseif ($file->isFile()) {
    $fileSize = $file->getSize();
    if ($fileSize < 0)
      $fileSize += 4294967296;
    if ($fileSize < 1024);
    elseif ($fileSize < 1024 * 1024)
      $fileSize  = round($fileSize / 1024, 2).'K';
    elseif ($fileSize < 1024 * 1024 * 1024)
      $fileSize  = round($fileSize / 1024 / 1024, 2).'M';
    elseif ($fileSize < 1024 * 1024 * 1024 * 1024)
      $fileSize  = round($fileSize / 1024 / 1024 / 1024, 2).'G';
    $fileName = $file->getFilename();
    $fileNameSrc = $fileName;
    $fileNameGBK = iconv("UTF-8", "GBK//TRANSLIT", $fileName);
    if (strlen($fileNameGBK) > $left_part - $date_size + 4) {
      $fileNameGBK = mb_strcut($fileNameGBK, 0, $left_part - $date_size, 'GBK').' ...';
      $fileName = iconv("GBK", "UTF-8//TRANSLIT", $fileNameGBK);
    }
    $pathName = $file->getPathname();
    $filehtml[$fileNameSrc] = '<a href="'.substr($pathName, $bgn).'" title="'.$fileNameSrc.'">'.$fileName.'</a>'.str_pad($date, $left_part - strlen($fileNameGBK),' ',STR_PAD_LEFT).str_pad($fileSize, $right_part, ' ', STR_PAD_LEFT);
  }
}
ksort($dirhtml);
ksort($filehtml);
if (strlen($pwd) - $bgn > 1) {
  echo '<a href="'.substr(dirname($pwd), $bgn).'/" title="../">../</a>'.str_pad(' ', $left_part - 3, ' ', STR_PAD_LEFT).str_pad('_', $right_part, ' ', STR_PAD_LEFT)."\n";
}
foreach($dirhtml as $name=>$value) {
  echo $value."\n";
}
foreach($filehtml as $name=>$value) {
  echo $value."\n";
}
?></pre><hr>
</body>
</html>
