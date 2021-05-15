Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

made with ❤️ by [Lucas](https://www.linkedin.com/in/lucas-tiberio/)

## Definitions of usage

- I opeted to use Yarn instead Npm, due to its multi-core processing and its cache system (not to download the same lib that was already installed)
- The PWA (site), will be used mainly on desktops, for this reason the mobile-first was not used as a practice.
- Firstly, I used craco for init my project. It allows me to use features like Path Mapping in typescript (ex.: @poupachef/components/_ instead ../../../poupachef/components/_).
- I opted for the Context API instead of Redux, to avoid manipulation of large informations and logic. Using only to save the state in more nested objects.
- I used a UX technique called Fast-Feedback, to avoid repeating unnecessary requests or renders. Updating the values directly ​​in the state, right after the request is answer.
- To stylize the components, I chose to use styled-components, to keep the code cleaner and readable. In addition to the possibility of theme control across the state.
- For architecture, I decided to choose DDD, thus having the possibility to model the most important/central classes of the project, in a way that reduces the complexity and maintenance of these.
- Lighthouse feedback is in the file: localhost_2021-02-22_14-16-53.report.html.

# Architecture folders definition

- src
  - /\_\_mocks\_\_ (Mocks to be used in tests)
  - /assets (Save custom images/css/scss/js files)
  - /components (Global components that should be used in all project)
  - /contex (ContextAPI setup)
  - /domains (Central domains of the project and its subdomains)
    - supplies (example)
      - /tests (Every test from every component in this domain)
      - /components (Custom components that should be used only in this domain)
  - /io (Input <-> Output. Intermediary between routes and domains, unique contact that client-view will have with the domains)
  - /routing (Main react-router-dom setup and its routes)
  - /support (Helpers, envs, commons, custom hooks, etc)
  - /theme (Everything about theme, as like Global style, and themes style (light, dark))
  - /ui (Custom design system with components)

## .env

REACT_APP_BASIC_AUTH_PASSWORD=dd3ed90e-667f-4248-a671-9266261dba5b

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready to be deployed!
