<?php

namespace App\Presenters;

use Nette;


class HomepagePresenter extends <% if (basePresenter) { %>BasePresenter<% } else { %>Nette\Application\UI\Presenter<% } %>
{
}
