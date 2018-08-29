'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = class extends yeoman {
	initializing() {
		this.argument('componentName', {
			required: true,
			type: String,
			desc: 'The component name'
		});

		this.log('You called the Nette component with the argument ' + this.options.componentName + '.');
	};

	writing() {
		this.fs.copyTpl(
			this.templatePath('component.php'),
			this.destinationPath('app/components/' + _.capitalize(this.options.componentName) + '/' + this.options.componentName + '.php'),
			{
				componentName: _.capitalize(this.options.componentName),
				templateFile: this.options.componentName,
			}
		);
		this.fs.copyTpl(
			this.templatePath('component.latte'),
			this.destinationPath('app/components/' + _.capitalize(this.options.componentName) + '/' + this.options.componentName + '.latte'),
			{
				componentName: _.capitalize(this.options.componentName)
			}
		);
	}
};