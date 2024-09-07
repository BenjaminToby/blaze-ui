# Blaze UI Library

A react component library done right

## Installation

```shell
npm install https://github.com/BenjaminToby/blaze-ui.git#latest
```

## Setup

After installing the module follow these steps to setup your theme:

-   Generate the `blaze` folder

    ```shell
    npx blaze --init
    ```

-   Add the CSS files from the `blaze` Folder to your app:

    ```javascript
    import "@/blaze/styles/root.css";
    import "@/blaze/theme/theme.css";
    import "@/blaze/styles/blaze.css";
    ```

    > NB: All other custom css files should come after this code block.

-   That's it. You're set to go.

## Usage

### Customize theme

To customize your theme simply customize the `blaze/theme/theme.css` file

```css
:root {
    --radius: 20px;
}
```

This will change the global radius for buttons and other UI components

### Change Color

The color scheme is generated from a JSON file located at `blaze/theme/color.json`.

```json
{
    "main": "#565ab4",
    "sec": "#002C7C",
    "accent": "#FFA200"
}
```

After editing this file run:

```shell
npx blaze --theme
```

This will generate all the required colors and respective shades.

> NB: The `gray` color can be specified in the `blaze/theme/color.json`. If not the default gray color is used
