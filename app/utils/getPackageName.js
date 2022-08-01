import { join } from "path";
import { readFile } from "fs/promises";

/**
 * Get the package name (theme name)
 * @returns {Promise<String>} Package name
 */
export async function getPackageName() {
  const pkg = JSON.parse(await readFile(join(process.cwd(), "package.json")));
  return pkg.name;
}
