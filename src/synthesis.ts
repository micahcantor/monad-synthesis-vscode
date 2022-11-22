import * as cp from "child_process";

/* TODO: install ghc-hacking globally so this works. */
/* TODO: make sure program sends output to stdout */

/* Call into cabal to execute the synthesis program */
export function runSynthesis(fileName : string, functionName : string) : string {
  let result = ""
  // TODO: sanitize input?
  cp.exec(`cabal exec ghc-hacking -- ${fileName} ${functionName}`, (err, stdout, stderr) => {
    console.log(`executing ghc-hacking... ${functionName}`)
    if (err) {
      result = stderr
    } else {
      result = stdout
    }
  });
  return result
}