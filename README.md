# ReactProject2022

This project is a modern React-based web application, demonstrating key concepts of React, including state management, component lifecycle, hooks, and routing. It is designed to serve as a comprehensive example for developers looking to build scalable and maintainable React applications.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Technologies Used](#technologie)
- [Contributing](#contributing)
- [Functional Requirements](#functional-requirements)
- [Non-functional Requirements](#non-functional-requirements)
- [Milestones](#milestones)
- [Expectations](#expectations)
- [Contact](#contact)
- [License](#licence)

## Getting Started
Responsive Design: Mobile-first design with a responsive layout.
Component-based Architecture: Modular and reusable components.
State Management: Utilizing React Hooks and Context API.
Routing: Client-side routing with React Router.
Form Handling: Custom form components with validation.
API Integration: Fetching and managing data from external APIs.
Getting Started

## Prerequisites
Make sure you have the following installed on your system:

Node.js (v14.x or later) / npm or Yarn
## Installation
Clone the repository:
```
git clone https://github.com/kartik-sajwan/ReactProject2022.git
```

## Install the dependencies:
```bash
npm install
```

## Running the Project
To start the development server and run the project locally:

```bash
npm start
```


bash
Copy code
yarn start
The application will be available at http://localhost:3000.

## Project Structure

```
ReactProject2022/
├── public/             # Public assets (HTML, images, etc.)
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components for routing
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context API for state management
│   ├── services/       # API services and utilities
│   ├── App.js          # Main application component
│   └── index.js        # Entry point for React
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```
## Technologies Used

>- React: JavaScript library for building user interfaces.
>- React Router: Declarative routing for React.
>- Context API: State management for React applications.
>- Axios: Promise-based HTTP client for making API requests.
>- Sass: CSS preprocessor for styling.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

>- Fork the repository.
>- Create a new branch (git checkout -b feature-branch).
>- Commit your changes (git commit -m 'Add some feature').
>- Push to the branch (git push origin feature-branch).
>- Open a Pull Request.

## Functional Requirements

### Dashboard
- When list is empty, Dashboard need to display search bar at the top and empty
content with icon.
- On search of location in search bar, Weather card matching the search result
need to be displayed in the dashboard.
- On click of card, it should navigate to Weather Details Page of card location.
- Once the location is added to the list under Weather Details Page, Entire
details of the location need to be displayed in the Dashboard.
- If there are multiple location added to the list, carousel need to be placed
above the location content to switch the location details.
- On click of Remove Button, the location needs to be removed from the list.
### Weather Details Page
- Weather Details Page need to display basic information about location.
- Can make use of any React library to display graph.
- Need back button at top left to navigate to the previous page.
- Need add to the list button at top right.
- On click of Add to list button, location need to be added into the dashboard.
- Added to list & Remove Button need to be displayed in place of Add to list
button
- On click of Remove Button, the location needs to be removed from the list.
### Progressive Web Apps (PWA)
- A progressive web app (PWA) is a website that looks and behaves as if it is a
mobile app.
- The PWA allows customers to cache, or save, a native web experience to their
mobile device.
- Progressive web apps bypass the Android and App Stores and the scrutiny that
comes with getting an app approved.
## Non Functional Requirements
- Create React App:
> Use create react app with typescript as the template and then start the project.
- React Hooks:
> React Hooks: Use only react hooks for this app.
- Redux:
> Use redux store to manage global state.

## Milestones
### Milestone 1
- Project setup
- Completion of dashboard with empty list.
- On search of location in search bar, Weather card matching the search result need to
be displayed in the dashboard.
- Search box needs to be functional with autocomplete on typing name of a city.
- Show Pill/Tag component for top 50 states.
- On click of card, it should navigate to Weather Details Page of card location.
- Weather Details Page need to display basic information about location.
- Can make use of any React library to display graph.
- Need back button at top left to navigate to the previous page.
- Need add to the list button at top right.
- On click of Add to the list button, Remove button need to appear.
- On click of Remove Button, the location needs to be removed from the list.
- Back button, Remove Button & Add to list button needs to be functional.
### Milestone 2
- Completion of Milestone 1.
- Once the location is added to the list under Weather Details Page, Entire details of
the location need to be displayed in the Dashboard.
- If there are multiple location added to the list, carousel need to be placed below the
location content to switch the location details.
- On click of Remove Button, the location needs to be removed from the list.
- Need to Integrate API to get the data.
- Need to use Redux to store the data.
### Milestone 3
- Completion of Milestone 2.
- Design the mobile view of the Application.
- UI must be responsive to handle all the screen resolutions.
### Milestone 4
- Completion of Milestone 3.
- App needs to be converted into PWA.
### Milestone 5
- Completion of Milestone 4.
- Write Test case with at least 80-85% code coverage.
## Expectations
- Use Best Practices to write the code.
- Use flex and grid effectively to design the pages.
- Right selection of semantic tags.
- CSS lint / TS lint.
- Use proper naming conventions for scss/typescript variables classes etc.
- Use branching strategies in git. There should be a minimal number of
commits in master branch. Keep meaningful commit message. Do any
number of commits in different branches with proper commit messages,
then merge your branch with master branch.
- Pixel perfection for the screens.
- Avoid usage of px units in scss.
- High Code quality.
- UI must be responsive to handle all the screen resolutions.
- As part of best practices, we expect proper unit tests using a testing library
for each functionality on the application with at least 80% average code
coverage.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or issues, feel free to reach out:

- Author: Kartik Sajwan
- GitHub: kartik-sajwan
- Email: kartik.sajwan@gmail.com