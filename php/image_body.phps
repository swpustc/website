<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <h1>
      <a href="<?php
        $return = dirname($_SERVER['SCRIPT_NAME']);
        if (strlen($return) > 1)
          echo $return;
        ?>/" class="return" title="Return"></a>
      <a href="<?php echo $src; ?>"
        title="Download <?php echo $name; ?>"
        class="index-title"
        >Download <?php echo $name; ?></a>
    </h1>
    <br class="index-title"/>
  </header><!--/ .page-header-->
  <div class="ftp-image aligncenter-with-title">
    <a href="<?php echo $src; ?>" class="single-image picture-icon" rel="group_portfolio">
      <img src="<?php echo $src; ?>" alt="">
    </a>
  </div><!--/ .ftp-image.aligncenter-with-title-->
</div><!--/ .content-wrapper-->
