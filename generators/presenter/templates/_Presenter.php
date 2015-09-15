<?php

namespace App\Presenters;

use Nette;


class <%= presenterName %>Presenter extends <% if (basePresenter) { %>BasePresenter<% } else { %>Nette\Application\UI\Presenter<% } %>
{
	public function renderDefault()
	{
		$this->template->foo = 'bar';
	}
}
