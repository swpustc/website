<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1>
      <a href="<?php
        $return = dirname($_SERVER['SCRIPT_NAME']);
        if (strlen($return) > 1)
          echo $return;
        ?>/" class="return" title="Return"></a>
      <a href="<?php echo $_SERVER['SCRIPT_NAME']; ?>?src=1"
        title="View Source: <?php echo $name; ?>"
        class="index-title"
        >Source <?php echo $name; ?></a>
    </h1>
    <br class="index-title"/>
    <ul id="portfolio-filter" class="code-prettify">
      <li class="first-block">
        <ul class="code-light">
          <li>Code Prettify:</li>
          <li><a id="code-google" data-categories="data-google">Google</a></li>
          <li><a id="code-github" data-categories="data-github">GitHub</a></li>
          <li><a id="code-tomorrow-light" data-categories="data-tomorrow">Tomorrow</a></li>
          <li><a id="code-hemisu-light" data-categories="data-hemisu">Hemisu</a></li>
        </ul><!--/ .code-light -->
        <ul class="code-dark">
          <li>Code Prettify:</li>
          <li><a id="code-vibrant-ink" data-categories="data-vibrant-ink">Vibrant Ink</a></li>
          <li><a id="code-tomorrow-dark" data-categories="data-tomorrow">Tomorrow</a></li>
          <li><a id="code-tomorrow-dark-eighties" data-categories="data-tomorrow">Tomorrow Eighties</a></li>
          <li><a id="code-tomorrow-dark-bright" data-categories="data-tomorrow">Tomorrow Bright</a></li>
          <li><a id="code-hemisu-dark" data-categories="data-hemisu">Hemisu</a></li>
        </ul><!--/ .code-dark -->
      </li>
    </ul><!-- end #portfolio-items-filter -->
  </header><!--/ .page-header-->
  <section id="portfolio-items" class="code-licence">
    <article data-categories="data-google">
      <a href="https://code.google.com/p/google-code-prettify/" target="_blank">Google Code Theme</a>
    </article>
    <article data-categories="data-github">
      <a href="https://github.com/" target="_blank">GitHub Theme</a>
    </article>
    <article data-categories="data-tomorrow">
      <a href="https://github.com/chriskempson/tomorrow-theme" target="_blank">Tomorrow Theme</a>
    </article>
    <article data-categories="data-hemisu">
      <a href="https://noahfrederick.com/vim-color-scheme-hemisu/" target="_blank">Hemisu Theme</a>
    </article>
    <article data-categories="data-vibrant-ink">
      <a href="http://alternateidea.com/blog/articles/2006/1/3/textmate-vibrant-ink-theme-and-prototype-bundle" target="_blank">Vibrant Ink Theme</a>
    </article>
  </section><!-- end #portfolio-items -->
  <div class="markdown">
    <div id="code-prettify-light" class="code-google">
      <div id="code-prettify-dark" class="code-vibrant-ink">
        <?php echo $html; ?>
      </div><!--/ .code-prettify-dark-->
    </div><!--/ .code-prettify-light-->
  </div><!--/ .markdown-->
</div><!--/ .content-wrapper-->
