# Movie Paradise

<b>Objective</b> 
<br>
Using React, build the client-side for an application called Movie Paradise based on its existing server-side code (REST API and database).

<b>Guidelines</b>
1. Who — The users of your Movie Paradise application. They will be movie enthusiasts who enjoy reading information about different movies.
2. What - A single-page, responsive application with routing, rich interactions, several interface views, and a polished user experience. The client-side developed in this Achievement will support the existing server-side by facilitating user requests and rendering the response from the server-side via a number of different interface views.
3. When-  MP users will be able to use it whenever they want to read information about different movies or update their user information—for instance, their list of “Favorite Movies.”

<h1><b>Essential Views and Features:</b></h1>

<b>Login view</b>

Allows users to log in with a username and password

<b>Registration view</b>

Allows new users to register (username, password, email, birthday)

<b>Main view</b>

Returns a list of ALL movies to the user (each listed item with an image, title, and release year)
Sorting and filtering
Ability to select a movie for more details

<b>Single Movie view</b>

Returns data (image, title, release year, description, genre, director, actors) about a single movie to the user.
Allows users to add a movie to their list of favorites
Allow users to move to director and genre viewv


<b>Director view</b>

Returns data about a director's name, bio and birth year.


<b>Genre view</b>

Returns data about a genre, with a name and description.

<b>Profile view</b>

Allows users to update their user info (username, password, email, date of birth)
Allows existing users to deregister
Displays user's favorite movies
Allows users to remove a movie from their list of favorites


<b>Technical Features:
</b>

It is a single-page application (SPA)
It uses state routing to navigate between views and share URLs
It gives users the option to filter movies
It initially uses Parcel as its build tool
React Redux is written using the React library and React Redux
It uses React Bootstrap as a UI library for styling and responsiveness
It contains a mix of class components and function components
It is hosted online

<b>Dependencies:</b>

React
react-bootstrap
react-dom
react-redux
react-router-dom
Redux
Axios
prop-types
redux-devtools-extension
