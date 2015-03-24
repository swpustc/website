<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1 class="autoindex-title">
      <a href="//download.swpbox.info/ftp<?php echo $_SERVER['SCRIPT_NAME']; ?>"
        title="Index of <?php echo $cur; ?>"
        target="_blank"
        >Index of <?php echo $cur; ?></a>
    </h1>
    <ul id="portfolio-filter">
      <li>Filter:</li>
      <li><a data-categories="*">All</a></li>
      <li><a data-categories="type-folder">Folder</a></li>
      <li><a data-categories="type-file">File</a></li>
      <li><a data-categories="size-1M">&lt;1M</a></li>
      <li><a data-categories="size-10M">&lt;10M</a></li>
      <li><a data-categories="size-100M">&lt;100M</a></li>
      <li><a data-categories="size-1G">&lt;1G</a></li>
      <li><a data-categories="size-g1G">&gt;1G</a></li>
    </ul><!-- end #portfolio-items-filter -->
  </header><!--/ .page-header-->
  <section id="portfolio-items" class="autoindex">
<?php
if (strlen($pwd) - $bgn > 1) {
  echo '<article class="'.$folder_class.' '.$file_class.$size_1m.$size_10m.$size_100m.$size_1g.$size_g1g.'"><div class="one-half"><a href="'.substr(dirname($pwd), $bgn).'/" title="../">../</a></div><div class="one-fourth autohide">_</div><div class="one-fourth last autohide">_</div></article>'."\n";
}
foreach($html as $name=>$value) {
  echo $value."\n";
}
?>
  </section><!-- end #portfolio-items -->
</div><!--/ .content-wrapper-->
