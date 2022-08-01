import inquirer from "inquirer";
import { capitalCase } from "change-case";

// Internal dependencies
import { getPackageName } from "./utils/getPackageName.js";

/**
 * Prompt the user for more details about the theme
 * @param {String} slug Block slug
 * @returns {Object} Block details
 */
export async function askBlockDetails(slug) {
  const { prompt } = inquirer;

  while (!slug) {
    // Slug has not been provided as an option
    ({ slug } = await prompt({
      name: "slug",
      message: "Block Slug",
      default: "my-awesome-block",
    }));
  }

  const BLOCK_CATEGORY_CHOICES = [
    "text",
    "media",
    "design",
    "widget",
    "theme",
    "embed",
    "custom",
  ];

  const BLOCK_QUESTIONS = [
    {
      name: "namespace",
      message: "Block Namespace",
      default: await getPackageName(),
    },
    {
      name: "title",
      message: "Title",
      default: capitalCase(slug),
    },
    {
      name: "icon",
      message: "Icon: ",
      default: "heart",
    },
    {
      name: "description",
      message: "Description: ",
      default: "An amazing block",
    },
    {
      type: "list",
      name: "category",
      message: "Block Category",
      choices: BLOCK_CATEGORY_CHOICES,
      default: "widget",
    },
  ];

  const answers = await prompt(BLOCK_QUESTIONS);

  let category = answers.category;
  if (category == "custom")
    category = (
      await prompt({
        name: "customCategory",
        message: "Custom category",
      })
    ).customCategory;
  return { slug, ...answers, category };
}
