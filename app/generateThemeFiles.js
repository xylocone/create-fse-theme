import { mkdir } from "fs/promises";

// Internal dependencies
import { copyTemplateFiles } from "./copyTemplateFiles.js";
import { renameCopiedFiles } from "./renameCopiedFiles.js";
import { highlight } from "./utils/inform.js";
import { error } from "./utils/inform.js";
import { pathExists } from "./utils/pathExists.js";

/**
 * Generate theme files in the CWD
 * @param {Path} themeDirPath Path to the dir into which theme files are to be placed
 * @param {Object} themeDetails Details about the theme (slug, title and author)
 */
export async function generateThemeFiles(themeDirPath, themeDetails) {
  try {
    if (await pathExists(themeDirPath)) {
      error(
        `Directory ${highlight(themeDetails.slug)} already exists in the CWD.`
      );
      throw new Error();
    } else {
      await mkdir(themeDirPath);
    }

    await copyTemplateFiles("theme", themeDirPath, themeDetails);
    await renameCopiedFiles(themeDirPath);
  } catch (e) {
    error("Could not generate theme files.");
    console.trace(e);
    throw e;
  }
}
