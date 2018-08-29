'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = class extends yeoman {
	initializing() {
		this.argument('presenterName', {
			required: true,
			type: String,
			desc: 'The presenter name'
		});
		this.basePresenter = this.config.get('basePresenter');

		this.log('You called the Nette presenter with the argument ' + this.presenterName + '.');
	};

	writing() {
		this.fs.copyTpl(
			this.templatePath('_Presenter.php'),
			this.destinationPath('app/presenters/' + _.capitalize(this.presenterName) + 'Presenter.php'),
			{
				basePresenter: this.basePresenter,
				presenterName: _.capitalize(this.presenterName)
			}
		);
		this.fs.copyTpl(
			this.templatePath('_default.latte'),
			this.destinationPath('app/presenters/templates/' + _.capitalize(this.presenterName) + '/default.latte'),
			{
				presenterName: _.capitalize(this.presenterName)
			}
		);
	}
};