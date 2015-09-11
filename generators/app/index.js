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
      },
      {
        when: function(props) { return props.users; },
        name: 'database',
        default: 'test',
        message: 'Database name:'
      },
      {
        when: function(props) { return props.users; },
        name: 'username',
        default: 'root',
        message: 'username:'
      },
      {
        when: function(props) { return props.users; },
        name: 'password',
        default: '',
        message: 'password:'
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
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
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

    // Module Users
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

    // Create config file
    this.fs.copyTpl(
      this.templatePath('_/app/config/_config.neon'),
      this.destinationPath('app/config/config.neon'),
      {
        moduleUsers: this.props.users
      }
    );
    // config.local.neon
    this.fs.copyTpl(
      this.templatePath('_/app/config/_config.local.neon'),
      this.destinationPath('app/config/config.local.neon'),
      {
        useDatabase: this.props.users,
        moduleUsers: this.props.users,
        database: this.props.database,
        username: this.props.username,
        password: this.props.password
      }
    );


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
