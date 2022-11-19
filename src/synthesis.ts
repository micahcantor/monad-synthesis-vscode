import * as cp from "child_process";

/* Call into cabal to execute the synthesis program */
export function runSynthesis(fileName : string, functionName : string) : string {
  let result = ""
  // TODO: sanitize input?
  cp.exec(`cabal exec ghc-hacking -- ${fileName} ${functionName}`, (err, stdout, stderr) => {
    if (err) {
      console.log("error")
      result = stderr
    } else {
      result = stdout
    }
  })
  return result
}