A simple react.js demo utilizing React Contexts and Hooks

## Live Demo:

You can test out this project by visiting: https://todoapp-c4c4a.firebaseapp.com/


## Information

This demo was built using create-react-app(React.js) and all of it's bundled dependencies. <br />

It connects to Google's Cloud Firestore for data storage, uses Firebase Authentication, and is hosted on Firebase as well. <br />

A custom Context was created for a minimal global state(to prevent performance issues).
This custom class includes 2 Contexts, one for state and one for dispatching events to udpate the state.

All components are functional components, utilizing hooks where need be.

Due to the project's simplicity, Context was only used for a global state, while normal prop passing is used between parent-children components.
