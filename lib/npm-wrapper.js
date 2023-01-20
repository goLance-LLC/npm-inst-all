const execa = require('execa')

module.exports = {
  install({ dir }) {
    const execP = execa('npm', ['install', '--legacy-peer-dep'], { cwd: dir, });
    execP.stdout.pipe(process.stdout);

    return execP;
  }
}