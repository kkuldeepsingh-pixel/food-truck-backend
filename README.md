# food-truck-backend
Base URL: http://localhost:5000

Endpoints

1. Reviews


GET /reviews
Fetch all reviews
Response (200 OK):
[
  { "id": 1, "title": "Awesome food", "content": "Loved the tacos!", "rating": 5 },
  { "id": 2, "title": "Good service", "content": "Friendly staff.", "rating": 4 }
]


GET /reviews/:id
Fetch a single review by ID
Params: id (number)
Response (200 OK):
{ "id": 1, "title": "Awesome food", "content": "Loved the tacos!", "rating": 5 }
Error (404 Not Found):
{ "message": "Review not found" }


POST /reviews
Create a new review
Body:
{
  "title": "Great service",
  "content": "Staff was amazing",
  "rating": 5
}
Response (201 Created):
{
  "id": 3,
  "title": "Great service",
  "content": "Staff was amazing",
  "rating": 5
}
Error (400 Bad Request):
{ "message": "Missing fields" }


PUT /reviews/:id
Update an existing review
Body (partial updates allowed):
{
  "title": "Updated title",
  "rating": 4
}
Response (200 OK):
{
  "id": 1,
  "title": "Updated title",
  "content": "Loved the tacos!",
  "rating": 4
}
Error (404 Not Found):
{ "message": "Review not found" }


DELETE /reviews/:id
Delete a review by ID
Response (200 OK):
{
  "id": 1,
  "title": "Awesome food",
  "content": "Loved the tacos!",
  "rating": 5
}


2. Menu

GET /menu
Fetch all menu items
Response (200 OK):
[
  { "id": 1, "name": "Taco", "price": 5.99, "truckId": 1 },
  { "id": 2, "name": "Burger", "price": 8.99, "truckId": 1 }
]


GET /menu/:id
Fetch single menu item by ID
Params: id (number)
Response (200 OK):
{ "id": 1, "name": "Taco", "price": 5.99, "truckId": 1 }
Error (404 Not Found):
{ "message": "Menu item not found" }


POST /menu
Create a new menu item
Body:
{
  "name": "Pizza",
  "price": 12.5,
  "truckId": 1
}
Response (201 Created):
{
  "id": 3,
  "name": "Pizza",
  "price": 12.5,
  "truckId": 1
}


PUT /menu/:id
Update menu item
Body (partial updates allowed):
{
  "price": 13.0
}
Response (200 OK):
{
  "id": 3,
  "name": "Pizza",
  "price": 13.0,
  "truckId": 1
}


DELETE /menu/:id
Delete menu item by ID
Response (200 OK):
{
  "id": 3,
  "name": "Pizza",
  "price": 13.0,
  "truckId": 1
}


3. Root

GET /
Check if server is running
Response:
Food Truck Backend API is running!