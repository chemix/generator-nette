'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('Nette') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_composer.json'),
        this.destinationPath('composer.json')
      );
      this.fs.directory(
        this.templatePath('app'),
        this.destinationPath('app')
      );
      this.fs.directory(
        this.templatePath('www'),
        this.destinationPath('www')
      );
      this.fs.directory(
        this.templatePath('log'),
        this.destinationPath('log')
      );
      this.fs.directory(
        this.templatePath('temp'),
        this.destinationPath('temp')
      );
      // todo change chmod? fs.chmodr ?
    },
  },

  install: function () {
    this.spawnCommand('composer', ['install']);
  }
});
