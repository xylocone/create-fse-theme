import { rm } from "fs/promises";

// Internal dependencies
import { pathExists } from "./pathExists.js";
import { error } from "./inform.js";

/**
 * Delete a file or a directory
 * @param {String} path Path of the file or dir to be deleted
 */
export async function deletePath(path) {
  if (!(await pathExists(path))) {
    error("Cannot delete a non-existent path.");
    throw new Error();
  }
  await rm(path, { recursive: true, force: true });
}
