#!/usr/bin/env node

import { join } from "path";
import { Command } from "commander";

// Internal dependencies
import { getCurrentVersion } from "./utils/getCurrentVersion.js";
import { askThemeDetails } from "./askThemeDetails.js";
import { askBlockDetails } from "./askBlockDetails.js";
import { generateThemeFiles } from "./generateThemeFiles.js";
import { generateBlockFiles } from "./generateBlockFiles.js";
import { installDependencies } from "./installDependencies.js";
import { removeBlock } from "./removeBlock.js";
import { exportAsZip } from "./exportAsZip.js";
import { buildBlocks } from "./buildBlocks.js";
import { startBuildingBlocks } from "./startBuildingBlocks.js";
import { getPackageName } from "./utils/getPackageName.js";
import { highlight } from "./utils/inform.js";
import Task from "./utils/Task.js";
import TaskRunner from "./utils/TaskRunner.js";

const tasks = new TaskRunner();
const program = new Command();

program
  .name("create-fse-theme")
  .description("Scaffolding and utility tool for Wordpress FSE themes")
  .version(await getCurrentVersion())
  .argument("[slug]", "Theme slug")
  .action(scaffoldTheme);

program.command("init").argument("[slug]", "Theme slug").action(scaffoldTheme);

program
  .command("add-block")
  .argument("[slug]", "Block slug")
  .action(async (slug) => {
    const blockDetails = await askBlockDetails(slug);

    tasks.pushTask(
      new Task(
        `Adding block ${highlight(blockDetails.slug)} to ${highlight(
          "./blocks/src"
        )}...`,
        async () => {
          await generateBlockFiles(blockDetails);
        }
      )
    );

    tasks.runAll();
  });

program
  .command("remove-block")
  .argument("<slug>", "Block slug")
  .action((slug) => {
    tasks.pushTask(
      new Task(
        `Removing block ${slug} from ${highlight(
          "./blocks/src"
        )} and ${highlight("./blocks/build")}...`,
        async () => {
          await removeBlock(slug);
        }
      )
    );

    tasks.runAll();
  });

program.command("export").action(async () => {
  const themeName = await getPackageName();
  tasks.pushTask(
    new Task(
      `Exporting theme files to ${highlight(`${themeName}-theme.zip`)}...`,
      async () => {
        await exportAsZip();
      }
    )
  );

  tasks.runAll();
});

program.command("build").action(() => {
  tasks.pushTask(
    new Task("Building block(s)...", async () => {
      await buildBlocks();
    })
  );

  tasks.runAll();
});

program.command("start").action(() => {
  tasks.pushTask(
    new Task("Starting to build block(s)...", async () => {
      await startBuildingBlocks();
    })
  );

  tasks.runAll();
});

program.parse();

/**
 * Scaffold an FSE theme in the CWD
 * @param {String} slug Theme slug
 */
async function scaffoldTheme(slug) {
  const themeDetails = await askThemeDetails(slug);
  const themeDirPath = join(process.cwd(), themeDetails.slug);

  tasks.pushTask(
    new Task("Generating theme files...", async () => {
      await generateThemeFiles(themeDirPath, themeDetails);
    })
  );

  tasks.pushTask(
    new Task("Installing dependencies...", async () => {
      await installDependencies(themeDirPath);
    })
  );

  await tasks.runAll();
}
