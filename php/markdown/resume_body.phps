<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1><a href="//download.swpbox.info/ftp/html/resume<?php echo $_SERVER['SCRIPT_NAME']; ?>" title="Download <?php echo $name; ?>"><?php echo $name; ?></a></h1>
    <ul id="portfolio-filter" class="code-prettify">
      <li style="display: block!important;">
        <ul class="code-light">
          <li>Code Prettify:</li>
          <li><a id="code-google">Google</a></li>
          <li><a id="code-github">GitHub</a></li>
          <li><a id="code-tomorrow-light">Tomorrow</a></li>
          <li><a id="code-hemisu-light">Hemisu</a></li>
        </ul><!--/ .code-light -->
        <ul class="code-dark">
          <li>Code Prettify:</li>
          <li><a id="code-vibrant-ink">Vibrant Ink</a></li>
          <li><a id="code-tomorrow-dark">Tomorrow</a></li>
          <li><a id="code-tomorrow-dark-eighties">Tomorrow Eighties</a></li>
          <li><a id="code-tomorrow-dark-bright">Tomorrow Bright</a></li>
          <li><a id="code-hemisu-dark">Hemisu</a></li>
        </ul><!--/ .code-dark -->
      </li>
    </ul><!-- end #portfolio-items-filter -->
  </header><!--/ .page-header-->
  <section id="portfolio-items">
  </section><!-- end #portfolio-items -->
  <div class="markdown">
    <div id="code-prettify-light" class="code-google">
      <div id="code-prettify-dark" class="code-vibrant-ink">
<?php echo $html; ?>
      </div><!--/ .code-prettify-dark-->
    </div><!--/ .code-prettify-light-->
  </div><!--/ .markdown-->
</div><!--/ .content-wrapper-->
