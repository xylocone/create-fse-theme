import zipLib from "zip-lib";
import { extname, join } from "path";

// Internal dependencies
import { getPackageName } from "./utils/getPackageName.js";
import { pathExists } from "./utils/pathExists.js";
import { readFile } from "fs/promises";
import { highlight, error, info, warning } from "./utils/inform.js";

export async function exportAsZip() {
  const zipFileName = `${await getPackageName()}-theme.zip`;
  const zip = new zipLib.Zip();

  const itemsToExport = await getItemsToExport();

  info("The following items are going to be exported:");
  for (let item of itemsToExport) info(highlight(item));
  for (let item of itemsToExport) await addPathToArchive(zip, item);

  await zip.archive(`./${zipFileName}`);
}

/**
 * Add a path to a Zip instance
 * @param {Zip} zipInstance The zip object to which the path is to be added
 * @param {Path} path Path to be added
 */
async function addPathToArchive(zipInstance, path) {
  if (await pathExists(path)) {
    if (!extname(path)) {
      // path is a directory
      zipInstance.addFolder(path, path);
    } else {
      // path is a file
      zipInstance.addFile(path, path);
    }
  } else {
    warning(`${highlight(path)} does not exist.`);
  }
}

/**
 * Get the list of paths to be exported
 * @returns {Promise<Array<Path>>} List of paths to be exported
 */
async function getItemsToExport() {
  const DEFAULT_EXPORTS = [
    "index.php",
    "style.css",
    join("blocks", "build"),
    "gutenberg_utils",
    "functions.php",
    "gutenberg.php",
    "templates",
    "parts",
    "screenshot.png",
  ];

  const configObject = await readConfig();

  let exports = DEFAULT_EXPORTS;
  if (configObject) {
    const { add, exclude, custom } = configObject;
    if (add) exports.push(...add);
    if (exclude) exports = exports.filter((item) => !exclude.includes(item));
    if (custom) exports = custom;
  }
  return exports;
}

/**
 * Read configuration file
 * @returns {Object} Config object
 */
async function readConfig() {
  const configFilePath = join(process.cwd(), "cft.config.json");

  if (!(await pathExists(configFilePath))) return;

  try {
    return JSON.parse(await readFile(configFilePath));
  } catch (e) {
    error("Could not read configuration file.");
    throw e;
  }
}
