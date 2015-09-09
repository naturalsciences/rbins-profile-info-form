<div class="infoforms-bartik-user-login-form-wrapper">
  <div class="login-wrapper">
    <?php     
      $form['name']['#description'] = "Enter your RBINS username";
      $form['pass']['#description'] = "Enter your RBINS password";
    ?>
    <?php print drupal_render_children($form); ?>
  </div>
  <div class="login-photo">
    <img src="<?php print base_path() . drupal_get_path('theme', 'infoform_bartik') . '/images/workInProgress.png'; ?>"
       alt="Login" title="Login" width='327' height='221' />
  </div>
</div>
