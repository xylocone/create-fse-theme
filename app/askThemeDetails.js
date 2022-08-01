import inquirer from "inquirer";
import { capitalCase } from "change-case";

/**
 * Prompt the user for more details about the theme
 * @param {String} slug Theme slug
 * @returns {Object} Theme details
 */
export async function askThemeDetails(slug) {
  const { prompt } = inquirer;

  while (!slug) {
    // Slug has not been provided as an option
    ({ slug } = await prompt({
      type: "input",
      name: "slug",
      message: "Theme Slug",
    }));
  }

  const THEME_QUESTIONS = [
    {
      name: "title",
      message: "Theme Title",
      default: capitalCase(slug),
    },
    {
      name: "author",
      message: "Theme Author",
    },
  ];

  return { slug, ...(await prompt(THEME_QUESTIONS)) };
}
