import { join } from "path";

// Internal dependencies
import { error } from "./utils/inform.js";
import { highlight } from "./utils/inform.js";
import { deletePath } from "./utils/deletePath.js";
import { pathExists } from "./utils/pathExists.js";

/**
 * Remove a block from both the src and the build directories
 * @param {String} slug Slug of the block to be removes
 */
export async function removeBlock(slug) {
  try {
    const srcPath = join(process.cwd(), "blocks", "src", slug);
    const buildPath = join(process.cwd(), "blocks", "build", slug);
    if (!(await pathExists(srcPath))) await deletePath(srcPath);
    if (!(await pathExists(buildPath))) await deletePath(buildPath);
  } catch (e) {
    error(`Could not remove ${highlight(slug)}.`);
    console.trace(e);
    throw e;
  }
}
