import { mkdir } from "fs/promises";
import { join } from "path";

// Internal dependencies
import { copyTemplateFiles } from "./copyTemplateFiles.js";
import { renameCopiedFiles } from "./renameCopiedFiles.js";
import { error } from "./utils/inform.js";
import { pathExists } from "./utils/pathExists.js";

/**
 * Generate block files in the CWD
 * @param {Object} blockDetails Details about the block (slug, title, category)
 */
export async function generateBlockFiles(blockDetails) {
  try {
    const blockDir = join(process.cwd(), "blocks", "src", blockDetails.slug);

    if (!(await pathExists(blockDir))) await mkdir(blockDir);

    await copyTemplateFiles("block", blockDir, blockDetails);
    await renameCopiedFiles(blockDir);
  } catch (e) {
    error("Could not generate block files.");
    console.trace(e);
    throw e;
  }
}
