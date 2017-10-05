'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the legendary ' + chalk.red('Nette') + ' generator!'));

    const prompts = [
      {
        type: 'confirm',
        name: 'modules',
        message: 'Would you like to use modules?',
        default: true
      },
      {
        type: 'confirm',
        name: 'basePresenter',
        message:
          "Would you like to use BasePresenter? (It's parent of all other Presenters).",
        default: false
      },
      {
        type: 'confirm',
        name: 'signInForm',
        message: 'Would you like to add a sign in form?',
        default: false
      },
      {
        when: function(props) {
          return props.signInForm;
        },
        type: 'list',
        name: 'authorizator',
        message: 'What kind of authentication would you like to use?',
        choices: [
          {
            name: 'Simple authenticator (credentials are stored in config.neon)',
            value: 'simple'
          },
          {
            name: 'Nette/Database authenticator (credentials are stored in the database)',
            value: 'netteDatabase'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'adminer',
        message: 'Would you like to install Adminer?',
        default: false
      },
      {
        type: 'confirm',
        name: 'composer',
        message: 'Would you like to install dependencies via Composer?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copy(this.templatePath('.htaccess'), this.destinationPath('.htaccess'));

    this.fs.copy(
      this.templatePath('composer.json'),
      this.destinationPath('composer.json')
    );

    this.fs.copy(this.templatePath('readme.md'), this.destinationPath('readme.md'));

    this.fs.copy(this.templatePath('app'), this.destinationPath('app'));

    this.fs.copy(this.templatePath('log'), this.destinationPath('log'));

    this.fs.copy(this.templatePath('temp'), this.destinationPath('temp'));

    this.fs.copy(this.templatePath('www'), this.destinationPath('www'));
  }

  install() {
    if (this.props.composer) {
      this.spawnCommand('composer', ['install']);
    }
  }
};
