import * as core from "@actions/core";
import { validatePackageLock } from "./validate-package-lock";

const run = async (): Promise<void> => {
  try {
    const cwd: string = core.getInput("cwd") ?? process.cwd();
    core.debug(`Checking lockfile in directory ${cwd}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const version: number = parseInt(core.getInput("version"), 10);
    core.debug(`Ensuring lockfile has version ${version}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString());
    await validatePackageLock({ cwd, version });
    core.debug(new Date().toTimeString());
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};

run();
