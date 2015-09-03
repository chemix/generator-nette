'use strict';
var yeoman = require('yeoman-generator');

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
    this.fs.copy(
      this.templatePath('component.php'),
      this.destinationPath('app/components/'+ this.componentName +'.php')
    );
    this.fs.copy(
      this.templatePath('component.latte'),
      this.destinationPath('app/components/'+ this.componentName +'.latte')
    );
  }
});
