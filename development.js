const Application = require('thinkjs');
const babel = require('think-babel');
const watcher = require('think-watcher');
const notifier = require('node-notifier');
const babelOptions = require('./babel.config.js');

const instance = new Application({
  ROOT_PATH: __dirname,
  watcher: watcher,
  transpiler: [babel, babelOptions],
  notifier: notifier.notify.bind(notifier),
  env: 'development',
  workers: 0
});

instance.run();
