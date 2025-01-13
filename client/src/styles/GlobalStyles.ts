import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
    /* BG */
    --color-bg-primary: rgb(22, 22, 24);
    --color-bg-secondary: rgb(27, 27, 31);
    --color-bg-light: rgb(32, 33, 39);

    /* FONTS */
    --color-text: rgba(255, 255, 245, 0.86);
    --color-text-grey: rgba(240, 186, 192, 0.718);
    --color-active: rgb(246, 115, 115);

}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
    font-family: "Poppins", sans-serif;
    color: var(--color-text);
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
    transition: color 0.3s, background-color 0.3s, border 0.3s;
}

body.no-transition {
    transition: none;
}

input,
button,
textarea,
select {
  font-family: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
}
`;
