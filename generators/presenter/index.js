'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('presenterName', {
      required: true,
      type: String,
      desc: 'The presenter name'
    });

    this.log('You called the Nette presenter with the argument ' + this.presenterName + '.');
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_Presenter.php'),
      this.destinationPath('app/presenters/' + _.capitalize(this.presenterName) + 'Presenter.php'),
      {
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
});
