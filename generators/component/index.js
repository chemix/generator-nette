'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('componentName', {
      required: true,
      type: String,
      desc: 'The component name'
    });

    this.log('You called the Nette subgenerator with the argument ' + this.componentName + '.');
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('component.php'),
      this.destinationPath('app/components/'+ _.capitalize(this.componentName) +'/'+ this.componentName +'.php'),
      {
        componentName: _.capitalize(this.componentName),
        templateFile: this.componentName,
      }
    );
    this.fs.copyTpl(
      this.templatePath('component.latte'),
      this.destinationPath('app/components/'+ _.capitalize(this.componentName) +'/'+ this.componentName +'.latte'),
      {
        componentName: _.capitalize(this.componentName)
      }
    );
  }
});
