# Getting Started with AgendaCrudApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts To Run The Project

In the project directory, we need to run:

### `npm install`

It will nstall all the deps for the porject by adding node_modules folder .

### `npm run start:dev`

Runs the app in the development mode.\
It will Open [http://localhost:3000](http://localhost:3000) automatically or we may open it to view it in our browser.

## Project workflow:

1. In the main url which is a Home page and we will see empty data for the first time and so we have to add data from the Add Agenda button of the Navbar.

2. In the Add Agenda form we can fillup all the fields, if we don't then validations will come up for different types of fields.
   Add date time from the given calendar. After completing the form it will redirect to the home page where we will see all the data with actions of view, edit and delete options.

3. In the Home page, we can view data by clicking view button and it will show the view data page of that selected agenda,

   If we want to edit data then we can click edit button and it will show the edit form to update the selected agenda, it has the validations just like the add agenda form, after updating the data it will redirect to the home page as well,

   If we want to delete any data then we can delete from the delete button.

4. Last but not least, there is an Import/Export List option from the top navbar, it will go to the import/export list page,
   it will show all the list of agendas and we can download this list as excel sheet by clicking on the Download as XLS button.

## Tech stack:

1.react@18.1.0

2.bootstrap

3.react-toastify
