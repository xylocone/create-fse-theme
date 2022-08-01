![Logo](https://xylocone.files.wordpress.com/2022/08/create-fse-theme.png)

# create-fse-theme

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Github Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

- Scaffolds a Wordpress FSE theme with a single command
- Exposes some helper binaries

## Installation

Install create-block-theme with npm

```sh
npm install create-fse-theme
```

Or with Yarn, if you prefer that:

```sh
yarn global add create-fse-theme
```

## Usage

To scaffold an FSE theme:

```sh
create-fse-theme <theme-name>
```

or

```sh
cft <theme-name>
```

Once the theme has been scaffolded and you CD into the theme, the following commands can be used for different functions:

```sh
cft add-block [block-slug]  # add a block
cft remove-block <block-slug>  # remove a block
cft export [zip-name]  # export theme files to a ready-to-use theme zip
cft build  # transpile blocks
cft start  # transpile blocks in dev mode
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
