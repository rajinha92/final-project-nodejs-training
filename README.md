## Disclaimer:

Star wars fans would like to schedule flights to different planets and also rent vehicles to explore that planet.

## Roles:
Fan - who take flights and rent vehicles
Admin - who makes money selling fake flights and renting fake vehicles

## Pre requirements:
- You can choose the database you want (we recommend mongodb and mongoose package, that’s the one you’ll see in the solution)
- You MUST use express (and its documentation)
- Users must authenticate to the API using [JWT](https://jwt.io/)
- Auth token must contain user’s role
API endpoints must validate user role on request (when needed), use a middleware
- Create user (register) endpoint must accept user role for the purpose of this project
- You should implement the JWT middleware for the purpose of this project and use the [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken) to manipulate tokens
- To export CSV file you can either use a package (recommended) or export a common file with the string data
- Tickets bought and rented vehicles should be persisted as 2 different entities

______________________________________________________________________

## Fan API:
As a Star Wars fan I would like to buy flight tickets to the planets I like and rent vehicles to explore the planet.

### Fan registration:
GIVEN a fan that wants to join our club
WHEN it provides a role as “Fan”
AND it provides an username
AND it provides a password
AND it requests to register
THEN the API should create a new user and return the JWT to auth it

### Fan log in:
GIVEN a fan that was previously registered
WHEN it provides username
AND it provides password
AND it requests to log in
THEN the API should validate username and password
AND return JWT token

### List planets:
GIVEN a fan properly authenticated
WHEN it requests a list of planets
THEN the API should respond with a list of planets
AND allow to paginate

### Buy ticket:
GIVEN a fan that selected a planet
AND who viewed the trip price
WHEN it requests to schedule a trip
AND selects a date of departure
THEN the API should create a new ticket record 
AND return the created ticket

### List vehicles:
GIVEN a fan properly authenticated
WHEN it requests a list of available vehicles
THEN the API should return a list of vehicles not currently rented

### Rent vehicle:
GIVEN a fan properly authenticated
AND who viewed available vehicles with prices
WHEN it selects a vehicle
AND selects a date of pick up
AND selects a date of return
AND requests to rent the vehicle
THEN the API should create a new rental record
AND return the new rental data
(do not use vehicles that are not on first page, to avoid complexity when mapping status to admin list of vehicles)


## Admin API:
As a Star Wars rental Admin I would like to know the vehicle's status, and tickets sold, as well as download a financial report as CSV.

### Admin registration:
GIVEN an admin that wants to join our club
WHEN it provides a role as “Admin”
AND it provides an username
AND it provides a password
AND it requests to register
THEN the API should create a new user and return the JWT to auth it

### Admin log in:
GIVEN an admin that was previously registered
WHEN it provides username
AND it provides password
AND it requests to log in
THEN the API should validate username and password
AND return JWT token

### List tickets:
GIVEN an admin that was previously registered
WHEN it requests a list of tickets
THEN the API should return all tickets
AND sort by most recent

### List vehicles:
GIVEN an admin that was previously registered
WHEN it requests a list of vehicles
THEN the API should return all vehicles
AND if they are rented or not as status

### Export balance as csv:
GIVEN an admin that was previously registered
WHEN it requests balance export
THEN the API should export tickets and rented vehicles with type (ticket or rent), date, price as a CSV file
AND should return a download file
AND should delete the file after downloading


## Testing

Use the postman collection on the solution repo to test your code.
``` 
Final Project NodeJS Training.postman_collection.json
```
