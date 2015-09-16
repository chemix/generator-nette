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
        name: 'basePresenter',
        message: 'Would you like to use BasePresenter? (It\'s parent of all other Presenters)',
        default: true
      },
      {
        type: 'confirm',
        name: 'database',
        message: 'Would you like to add support for database connection (MySQL)',
        default: true
      },
      {
        when: function(props) { return props.database; },
        name: 'database',
        default: 'test',
        message: 'Database name:'
      },
      {
        when: function(props) { return props.database; },
        name: 'username',
        default: 'root',
        message: 'username:'
      },
      {
        when: function(props) { return props.database; },
        type: 'password',
        name: 'password',
        default: '',
        message: 'password:'
      },
      {
        when: function(props) { return props.database; },
        type: 'confirm',
        name: 'users',
        message: 'Would you like to add base User model with login',
        default: false
      },
      {
        type: 'confirm',
        name: 'multilanguage',
        message: 'Would you like to add support multilanguage website',
        default: false
      },
      {
        when: function(props) { return props.multilanguage; },
        type: 'checkbox',
        name: 'languages',
        choices: ['english', 'deutsch', 'czech', 'slovak'],
        message: 'Which languages?',
        default: ['english', 'czech']
      },
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {

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

    // BasePresenter

    this.fs.copyTpl(
      this.templatePath('_/app/presenters/_HomepagePresenter.php'),
      this.destinationPath('app/presenters/HomepagePresenter.php'),
      {
        basePresenter: this.props.basePresenter
      }
    );
    if (this.props.basePresenter){
      this.fs.copy(
        this.templatePath('_/app/presenters/BasePresenter.php'),
        this.destinationPath('app/presenters/BasePresenter.php')
      );
    }

    // HomepagePresenter - template
    this.fs.copyTpl(
      this.templatePath('_/app/presenters/templates/Homepage/_default.latte'),
      this.destinationPath('app/presenters/templates/Homepage/default.latte'),
      {
        adminer: this.props.adminer,
        useDatabase: this.props.database,
        moduleUsers: this.props.users,
      }
    );


    // Composer.json
    this.fs.copyTpl(
      this.templatePath('_/_composer.json'),
      this.destinationPath('composer.json'),
      {
        useDatabase: this.props.database,
      }
    );


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
        useDatabase: this.props.database,
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


    // save configuration
    if (this.props.basePresenter){
      this.config.set('basePresenter', this.props.basePresenter);
    }
    this.config.save();

  },

  install: function () {
    if (this.props.composer) {
      this.spawnCommand('composer', ['install']);
    }
  }
});
