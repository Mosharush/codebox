import child_process from "child_process";

export default (command) =>
  new Promise((resolve, reject) => {
    child_process.exec(command, (error, stdout, stderr) => {
      if (error || stderr)
        return reject({
          status: "error",
          output: stdout || error || stderr,
        });

      resolve({
        status: "success",
        output: stdout,
      });
    });
  });
