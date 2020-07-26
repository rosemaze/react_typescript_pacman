## About

This project is my own attempt at implementing Pacman in React / Typescript, with hooks, styled components, Mobx, with a emphasis on component driven design.

For animation to work in React, a key challenge is to render as little as possible of the app, namely only the Pacman sprite, or the Ghost sprites when they move, and the dots when they get eaten by Pacman. To achieve this, I used Mobx stores to store all gameplay data, and connected this to the React components, which are wrapped by `observe` via the `reactive` hook, so that they only re-render when the relevant store data changes.

This React version migrates most of the same data structures and game logic from the jQuery game. Having `Typescript` reduces the amount of time I spent debugging and connecting different parts of the app.

## Advantages of React / Typescript over jQuery version

- Separation of game play logic and rendering logic. Gameplay logic have now been moved entirely to the `stores` folder, and rendering logic belongs in the `elements` folder. Components are only updated when the store has changed. In the jQuery verison, all this logic belonged in the same file, and everytime the UI had to be updated by `document.getElementById` which made it difficult to visualise or trace what was happening when a game was in progress.

- Separate stores for `Game`, `Pacman` and `Ghost`. In the jQuery verison this was all mixed together and that resulted in difficulty locating bugs and isolating problems. For example, in the `Ghost` store I have one place which handles validation and switching of different `Ghost` modes. By encapsulating the behaviour of the `Ghost` and not allowing other stores to modify it directly, it eliminated bugs caused by the possibility of switching to the wrong state.

- Complex algorithms for moving the sprites are located in helper functions within `helpers` folders.

## WIP

- The dots that Pacman should eat have not been implemented. I need to look into using dynamic keys in a Mobx observable map so that only the specific object (each dot) gets rerendered instead of all the dots each time Pacman eats one dot.

## Disadvantages to be addressed in this React version

- User key press handling is less responsive than the jQuery version, resulting in less fun playing the game

## Technology

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
