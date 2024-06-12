# Travel Log App
This is a fullstack Travel Log Application using CodingGarden's great tutorial as a start: https://github.com/CodingGarden/travel-log

MERN Stack  - MongoDB, Express, Node,  React

## Functionality
### Show travel log entries on the map with markers
The application initially loads the markers based on the map's settings

![Map markers example](/client/public/img/show_markers.PNG)

### Add new log entry
Double clicking on the map will open the "Add your new log entry" drawer.

![Add new log entry example](/client/public/img/new_entry.PNG)

### Show details of log entry by clicking on the marker
Clicking an existin marker will open the details drawer, the user can see all the data related to the current travel log entry. 

![Show log entry details example](/client/public/img/show_entry.PNG)

### Edit log entry
In the details drawer the user can choose to edit the current entry. This happens with the same form as in the creation flow, filled with the saved values. 

![Edit log entry example](/client/public/img/edit_entry.PNG)


## Start the application
### Backend
Navigate to /server directory

Run `npm start`

The server starts up on localhost:${port} - port is set in environment file

### Frontend
Navigate to /client directory

Run `npm run start`

The React application starts up on localhost:${port} - port is set in environment file