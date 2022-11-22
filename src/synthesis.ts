import * as cp from "child_process";
import * as util from "util";

const exec = util.promisify(cp.exec);

/* Call into cabal to execute the synthesis program */
export async function runSynthesis(fileName: string, functionName: string): Promise<string> {
  // TODO: sanitize input?
  const { stdout, stderr } = await exec(`ghc-hacking ${fileName} ${functionName}`);
  return stdout;
}