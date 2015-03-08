<div class="content-wrapper clearfix">
  <header class="page-header clearfix">
    <a href="<?php
      $return = dirname($_SERVER['SCRIPT_NAME']);
      if (strlen($return) > 1)
        echo $return;
      ?>/" class="return" title="Return"></a>
    <h1>
      <a href="<?php echo $src; ?>" title="Download <?php echo $name; ?>"><?php echo $name; ?></a>
    </h1>
  </header><!--/ .page-header-->
  <div class="ftp-image">
    <a href="<?php echo $src; ?>" class="single-image picture-icon" rel="group_portfolio">
      <img src="<?php echo $src; ?>" alt="">
    </a>
  </div><!--/ .ftp-image-->
</div><!--/ .content-wrapper-->
