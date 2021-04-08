## What am I looking at?
This is a form to edit information about a film. This form demonstrates a few code patterns we use internally, including async/await methods, subcomponents, and functions-as-child-components.

The UI is designed to be a form that saves drafts whenever a field is blured and saves content with a `published` flag when the form is explicitly submitted.

The form uses a simple mocked API service that simulates GET and POST requests with a delay of 250ms by returning promises.

## Running app
Run `yarn install` and `yarn start` to run the development server.

## Instructions
1. Document the code in `App.js` to the best of your ability. Useful things to include are documentation for method arguments and line-by-line descriptions of what happens inside methods. If there's anything you're unsure about, leave a comment indicating what doesn't make sense. Finally and optionally, as you're documenting, feel free to edit any code you feel would improve readability (if you do so, add a `// CHANGED` comment so we can find what you changed.)
2. Implement an input to edit a film's release year. This should be written as a `<select>` element with options for the years between 2010 and 2020.
3. Implement an input to edit a film's rating. The value it produces should be an integer. (Feel free to refactor an existing component in order to support this.)
4. One of the components defined in `./components` has a bug that will prevent it from behaving as expected. Identify and fix the bug.
5. Refactor the component defined in `App.js` to accept an optional `id` prop that (if passed) loads in initial data using the `get` method defined in `mockApi/index.js` when the component is mounted. The component should indicate in the UI when it's loading. (Don't sweat the visuals too much – you may choose to include CSS if you'd like, but this is not mandatory.)
6. Refactor the component so that it also displays UI states when completing an update request, and when the update is complete. The mock API returns errors 20% of the time – include an error indicator as well.
7. (BONUS!) Add your favorite Marvel film to the data defined in `mockApi/data.json`.

Indicate in each commit message you write which task your changes address – we're interested in seeing your commit messages, too!
