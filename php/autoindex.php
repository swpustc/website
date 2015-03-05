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
$left_part  = 74;
$right_part = 18;
$date_size  = 24;
$dircount  = 0;
$filecount = 0;
if (strlen($pwd) - $bgn > 1) {
  $dirhtml[$dircount++] = '<a href="'.substr(dirname($pwd), $bgn).'/">../</a>'.str_pad('_', $left_part - 3,' ',STR_PAD_LEFT).str_pad('_', $right_part, ' ', STR_PAD_LEFT);
}
foreach ($it as $file){
  $date = date('Y-m-d H:i:s', $file->getCTime());
  if ($file->isDir()) {
    $fileSize = '_';
    $fileName = $file->getFilename().'/';
    $fileNameGBK = iconv("UTF-8", "GBK//IGNORE", $fileName);
    if (strlen($fileNameGBK) > $left_part - $date_size + 4) {
      $fileNameGBK = mb_strcut($fileNameGBK, 0, $left_part - $date_size, 'GBK').' ...';
      $fileName = iconv("GBK", "UTF-8//IGNORE", $fileNameGBK);
    }
    $pathName = $file->getPathname().'/';
    $dirhtml[$dircount++] = '<a href="'.substr($pathName, $bgn).'">'.$fileName.'</a>'.str_pad($date, $left_part - strlen($fileNameGBK),' ',STR_PAD_LEFT).str_pad($fileSize, $right_part, ' ', STR_PAD_LEFT);
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
    $fileNameGBK = iconv("UTF-8", "GBK//IGNORE", $fileName);
    if (strlen($fileNameGBK) > $left_part - $date_size + 4) {
      $fileNameGBK = mb_strcut($fileNameGBK, 0, $left_part - $date_size, 'GBK').' ...';
      $fileName = iconv("GBK", "UTF-8//IGNORE", $fileNameGBK);
    }
    $pathName = $file->getPathname();
    $filehtml[$filecount++] = '<a href="'.substr($pathName, $bgn).'">'.$fileName.'</a>'.str_pad($date, $left_part - strlen($fileNameGBK),' ',STR_PAD_LEFT).str_pad($fileSize, $right_part, ' ', STR_PAD_LEFT);
  }
}
for ($i = 0; $i < $dircount; $i++) {
  echo $dirhtml[$i]."\n";
}
for ($i = 0; $i < $filecount; $i++) {
  echo $filehtml[$i]."\n";
}
?></pre><hr>
</body>
</html>
