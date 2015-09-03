'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Nette:generators/component', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/component'))
      .withArguments('componentName')
      .withOptions({ skipInstall: true, force: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'app/components/componentName.latte',
      'app/components/componentName.php'
    ]);
  });
});
