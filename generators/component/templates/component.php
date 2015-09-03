<?php

use Nette\Application\UI\Control;

class <%= componentName %> extends Control
{
  public function __construct()
  {
    // update
  }

  public function render()
  {
    $template = $this->template;
    $template->setFile(dirname(__FILE__) . '/<%= templateFile %>.latte');

    $template->render();
  }
}
