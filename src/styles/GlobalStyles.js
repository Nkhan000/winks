import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  /* #4ef037 */
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #f8da5b;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-200: #e62424;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

   /* Dark grey */
   --color-dark-grey-50: #454545;
  --color-dark-grey-100: #393e46;

  /* Black */
  --color-medium-black : #222831;
  --color-medium-black-02: #494d53;


  /* Dark orange */
  --color-orange-00 : orange;
  --color-orange-50 :#f96d00;
  --color-orange-100: #ff6000;
  --color-orange-150: #ff6000;
  --color-orange-200: #F76E11;

  /* White Creame */
  --color-creame-50 : #F4DFC8;

  /* Gradient */
  --orange-gradient-01 : linear-gradient(
    90deg,
    hsla(41, 100%, 70%, 1) 0%,
    hsla(7, 76%, 47%, 1) 100%
  );
  --orange-gradient-03 : linear-gradient(
    90deg,
    hsla(7, 76%, 47%, 1) 0%,
     hsla(41, 100%, 70%, 1) 100%
  );

  --black-gradient-01 : linear-gradient(
    to bottom,#222831 10%, #111827 95%, #222831 100%  

  );
  /* background-color: #f06543; */
--orange-gradient-02: linear-gradient(315deg, #f06543 0%, #ffbe3d 74%);
--blue-gradient-01 : linear-gradient(to right, #eef2ff 0%, #eef2f6 45%, #c7d2fe 70%);
--blue-gradient-02 : linear-gradient(to right, #4338ca 0%, #c7d2fe 45%, #312e81 98%);
--blue-gradient-03: linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%);



  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  --shadow-white: 0 2.4rem 3.2rem rgba(244, 223, 200, 0.250);
  --shadow-orange: .1rem .1rem .7rem rgba(223, 136, 44, 0.582);
  --shadow-orange-02: -.1rem .1rem .7rem rgba(223, 136, 44, 0.582);
  --shadow-orange-03 : .1rem 0rem .1rem .2rem rgba(249,109,0,0.5);


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  overflow-x: hidden;
  background-image: url("./img/home-shapes-full.svg");
  background-size: cover;

  /* background-image: url("./img/home-shapes-full.svg"); */


}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline: 2px solid var(--color-grey-50);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  /* hyphens: auto; */
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
