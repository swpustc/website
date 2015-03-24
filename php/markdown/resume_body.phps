<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1>
      <a href="<?php echo $file_enus_down; ?>"
        lang-en_us="<?php echo $file_enus_down; ?>"
        lang-zh_cn="<?php echo $file_zhcn_down; ?>"
        lang-zh_tw="<?php echo $file_zhtw_down; ?>"
        title="<?php echo $file_enus_down_title; ?>"
        lang-en_us_title="<?php echo $file_enus_down_title; ?>"
        lang-zh_cn_title="<?php echo $file_zhcn_down_title; ?>"
        lang-zh_tw_title="<?php echo $file_zhtw_down_title; ?>"
        id="resume-lang"
        class="index-title"
        >Source <?php echo $name; ?></a>
    </h1>
    <br class="index-title"/>
    <ul id="portfolio-filter" class="resume-lang">
      <li>Language:</li>
      <li><a id="lang-en_us" data-categories="lang-en_us">English</a></li>
      <li><a id="lang-zh_cn" data-categories="lang-zh_cn">简体中文</a></li>
      <li><a id="lang-zh_tw" data-categories="lang-zh_tw">繁體中文</a></li>
    </ul><!-- end #portfolio-items-filter -->
  </header><!--/ .page-header-->
  <div class="markdown resume">
    <div id="code-prettify-light" class="code-google">
      <div id="code-prettify-dark" class="code-vibrant-ink">
        <?php echo $file_html; ?>
        <section id="portfolio-items">
          <article data-categories="lang-en_us">
            <?php echo $file_enus_html; ?>
          </article>
          <article data-categories="lang-zh_cn">
            <?php echo $file_zhcn_html; ?>
          </article>
          <article data-categories="lang-zh_tw">
            <?php echo $file_zhtw_html; ?>
          </article>
        </section><!-- end #portfolio-items -->
      </div><!--/ .code-prettify-dark-->
    </div><!--/ .code-prettify-light-->
  </div><!--/ .markdown-->
</div><!--/ .content-wrapper-->
