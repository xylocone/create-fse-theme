import { execaCommand } from "execa";

/**
 * Install npm dependencies for the scaffolded theme
 * @param { Path } themeDirPath Path to the scaffolded theme directory
 */
export async function installDependencies(themeDirPath) {
  try {
    await execaCommand("npm install", { cwd: themeDirPath });
  } catch (e) {
    console.error(e.stderr);
    throw e;
  }
}
