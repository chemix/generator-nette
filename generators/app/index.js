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

    var prompts = [
      {
        type: 'confirm',
        name: 'composer',
        message: 'Would you like to install dependencies via Composer?',
        default: true
      },
      {
        type: 'confirm',
        name: 'adminer',
        message: 'Would you like to install Adminer',
        default: false
      },
      {
        type: 'confirm',
        name: 'users',
        message: 'Would you like to add base User model with login',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {

    this.fs.copy(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );

    this.fs.copy(
      this.templatePath('yo-rc.json'),
      this.destinationPath('.yo-rc.json')
    );

    this.directory(
      this.templatePath('app'),
      this.destinationPath('app')
    );
    this.directory(
      this.templatePath('www'),
      this.destinationPath('www')
    );
    this.directory(
      this.templatePath('log'),
      this.destinationPath('log')
    );
    this.directory(
      this.templatePath('temp'),
      this.destinationPath('temp')
    );
    // todo change chmod? fs.chmodr ?

    // Modele Users
    if (this.props.users) {
      this.directory(
        this.templatePath('module-users/app'),
        this.destinationPath('app')
      );
      this.directory(
        this.templatePath('module-users/bin'),
        this.destinationPath('bin')
      );
      this.directory(
        this.templatePath('module-users/migrations'),
        this.destinationPath('migrations')
      );
    }

    // tools
    // Adminer
    if (this.props.adminer) {
      this.fs.copy(
        this.templatePath('tools/adminer-4.2.2-mysql-en.php'),
        this.destinationPath('www/adminer/index.php')
      );
    }
  },

  install: function () {
    if (this.props.composer) {
      this.spawnCommand('composer', ['install']);
    }
  }
});
