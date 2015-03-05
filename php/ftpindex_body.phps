<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1 class="autoindex-title">
      <a href="//download.swpbox.info/ftp<?php echo $_SERVER['SCRIPT_NAME']; ?>" title="Index of <?php echo $cur; ?>">Index of <?php echo $cur; ?></a>
    </h1>
    <ul id="portfolio-filter">
      <li>Type:</li>
      <li><a data-categories="*">All</a></li>
      <li><a data-categories="type-folder">Folder</a></li>
      <li><a data-categories="type-file">File</a></li>
      <li><a data-categories="size-1M">&lt;1M</a></li>
      <li><a data-categories="size-10M">1M~10M</a></li>
      <li><a data-categories="size-100M">10M~100M</a></li>
      <li><a data-categories="size-1G">100M~1G</a></li>
      <li><a data-categories="size-g1G">&gt;1G</a></li>
    </ul><!-- end #portfolio-items-filter -->
  </header><!--/ .page-header-->
  <section id="portfolio-items" class="autoindex">
<?php
for ($i = 0; $i < $dircount; $i++) {
  echo $dirhtml[$i]."\n";
}
for ($i = 0; $i < $filecount; $i++) {
  echo $filehtml[$i]."\n";
}
?>
  </section><!-- end #portfolio-items -->
</div><!--/ .content-wrapper-->
