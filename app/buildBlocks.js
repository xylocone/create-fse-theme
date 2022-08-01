import { execaCommand } from "execa";

// Internal dependencies
import { error } from "./utils/inform.js";

/**
 * Build the theme's blocks
 */
export async function buildBlocks() {
  try {
    await execaCommand("npm run build");
  } catch (e) {
    error("Could not build your block(s).");
    console.trace(e);
    throw e;
  }
}
