import { execaCommand } from "execa";

// Internal dependencies
import { error } from "./utils/inform.js";

/**
 * Start building the theme's blocks
 */
export async function startBuildingBlocks() {
  try {
    await execaCommand("npm run start");
  } catch (e) {
    error("Could not start building your block(s).");
    console.trace(e);
    throw e;
  }
}
