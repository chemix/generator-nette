<?php

namespace App\Presenters;

use Nette;


class <%= presenterName %>Presenter extends Nette\Application\UI\Presenter
{
	public function renderDefault()
	{
		$this->template->foo = 'bar';
	}
}
