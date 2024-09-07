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

    > This will add a folder named `blaze` to your root directory

-   Add the CSS files from the `blaze` Folder to your app:

    ```javascript
    import "@/blaze/color.css";
    import "blaze-ui/styles/root.css";
    import "@/blaze/theme.css";
    import "blaze-ui/styles/blaze.css";
    ```

    > NB: All other custom css files should come after this code block.

-   That's it. You're set to go.

## Usage

### Use Components

You can use blaze components like so:

```javascript
import { Button, Row } from "blaze-ui";

export default function Home() {
    return (
        <Row>
            <Button>Button</Button>
            <Button color="secondary">Button Secondary</Button>
            <Button color="accent">Button Accent</Button>
        </Row>
    );
}
```

### Customize theme

To customize your theme simply edit the `blaze/theme/theme.css` file

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
