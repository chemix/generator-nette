<?php

namespace App;

use Nette;
use Nette\Application\Routers\RouteList;
use Nette\Application\Routers\Route;


class RouterFactory
{

	/**
	 * @return Nette\Application\IRouter
	 */
	public static function createRouter()
	{
		$router = new RouteList;
		<% if (multilanguage) { %>
		$router[] = new Route('[<locale=cs [a-z]{2}>/]<presenter>/<action>[/<id>]', 'Homepage:default');
		<% } else { %>
		$router[] = new Route('<presenter>/<action>[/<id>]', 'Homepage:default');
		<% } %>
		return $router;
	}

}
