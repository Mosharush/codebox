const { NodeVM } = require("vm2");

const vm = new NodeVM({
  sandbox: {},
  require: {
    external: true,
    builtin: ["fs", "path", "child_process"],
    root: "./sandbox_fs/",
    mock: {
      fs: {
        readdir: () => "Nice try!",
        readFileSync: () => "Nice try!",
      },
    },
  },
  timeout: 1,
});

const execInSandbox = vm.run(
  `
      const exec = require('child_process').exec;                
      module.exports = (lang, script, cb) => {
      
        if(lang === 'js') {
            return eval(script);
        }
        
        return exec(lang + ' -e "' + script + '"', cb);
      }
    `,
  "vm.js"
);

// let output = await new Promise((resolve, reject) => {
//     execInSandbox('php', 'echo \"test\"; ', (error, stdout, stderr) => {
//         error && reject(error);
//         stdout && resolve(stdout);
//         stderr && reject(stderr);
//     });
// });

let output = await new Promise((resolve, reject) => {
  execInSandbox(
    "node",
    `
                const fs = require(\'fs\');
                fs.readdir(\'.\', (err, files) => {
                    console.log(files);
                });
            `,
    (error, stdout, stderr) => {
      error && reject(error);
      stdout && resolve(stdout);
      stderr && reject(stderr);
    }
  );
});
