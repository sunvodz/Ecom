# Requirements

* Database design and implementation for the application should demonstrate non-trivial usage of SQL and database features.
* You are to develop a database application for a food delivery service (FDS). 
* The FDS operates daily from 10am to 10pm.

+ (Definition) 1 week = 7 consecutive days, 1 month = 4 consecutive weeks
+ (Requirement) There must be at least five riders (part-time or full-time) working at each hourly interval.
  
# Types of users

* customers
* restaurant staff, 
* delivery riders, and 
* FDS managers.

# Expected Requirements and Fuctionalities

## Report Information

The project report (up to a maximum of 20 pages in pdf format with at least 10-point font size) should include the following:

1. Names and student numbers of all team members and project team number (on the first page).
2. A listing of the project responsibilities of each team member.
3. A description of your application’s data requirements and functionalities. Highlight any interesting/non- trivial aspects of your application’s functionalities/implementation. List down all the application’s data constraints.
4. The ER model of your application. If your ER model is too large (spanning more than a page), you may want to include a single-page simplified ER model (with non-key attributes omitted) before presenting the detailed ER model. Provide justifications for any non-trivial design decisions in your ER model. List down all the application’s constraints that are not captured by your ER model.
5. The relational schema derived from your ER data model; i.e show the DDL statements of all your database tables. List down all the application’s constraints that are not enforced by your relational schema (i.e., the constraints that are enforced using triggers). For each database table, state whether it is in 3NF/BCNF. Provide justifications for tables that are not in 3NF/BCNF.
6. Present the details of three non-trivial/interesting triggers used in your application by providing an English description of the constraint enforced by each trigger and showing the code of the trigger implementation.
7. Show the SQL code of three of the most complex queries implemented in your application. Provide an English description of each of these queries.
8. Specification of the software tools/frameworks used in your project.
9. Two or three representative screenshots of your application in action.
10. A summary of any difficulties encountered and lessons learned from the project.
The source code submission should include a README file describing how to deploy and run your application.

Submit your source code by creating a zip file named codeNN.zip, where NN is your project team number. Upload this file into LumiNUS file folder named Project-Code-Submission.
• Submit your report by creating a pdf file named reportNN.pdf, where NN is your project team number. Upload this file into LumiNUS file folder named Project-Report-Submission.

**General**

1. Your application must contain at least three appropriate applications of triggers.
2. You are also free to use any of the database’s features and other SQL constructs beyond what are covered in class.
3. You are free to introduce additional functionalities and realistic data constraints to make your application interesting and non-trivial 

## User creation
* Create, Retrieve, Update & Delete :
  * Customer
  * Restaurant Staff
  * Delivery Riders
  * FDS Managers

## User Stories

### Customer

As a customer, I want to:
1. View Restaurants
2. View Menus of a specific restaurant
3. View Food item reviews
4. Search for Restaurant's/Food Items/
5. View my past orders

### Restaurant Staff

As a Restaurant Staff, I want to:

1. For each month, retrieve the:
   1. total number of completed orders, 
   2. total cost of all completed orders (excluding delivery fees)
   3. top 5 favorite food items (in terms of the number of orders for that item).
2. For each promotional campaign, retrieve:
   1. duration (in terms of the number of days/hours) of the campaign
   2. average number of orders received during the promotion (i.e., the ratio of the total number of orders received during the campaign duration to the number of days/hours in the campaign duration).
### Delivery Rider
As a delivery Rider, I want to:

*  View weekly/monthly informtion on number of orders delivered
*  View total number of hours worked
*  View Total salary earned
  
### FDS Manager

As an FDS Manager, I want to:
1. For each month, retrieve the :
   1. total number of new customers
   2. total number of orders
   3. total cost of all orders for every month
2. For each month and for each customer who has placed some order for that month, retrieve the:
   1. total number of orders placed by the customer for that month and;
   2. total cost of all these orders.
3. For each hour and for each delivery location area, retrieve the:
   1. total number of orders placed at that hour for that location area.
4. For each rider and for each month, retrieve the:
   1. total number of orders delivered by the rider for that month 
   2. total number of hours worked by the rider for that month
   3. total salary earned by the rider for that month
   4. average delivery time by the rider for that month
   5. number of ratings received by the rider for all the orders delivered for that month
   6. average rating received by the rider for all the orders delivered for that month.

# Entities

## Customer

* has reward points
* has credit card number
* has payment method

## Recent Locations

* belongs to a customer
* has address details
* has timestamp

- (Constraint) 5 rows per customer

## Payment Method

* has type (Cash, Credit Card)
  

## Restaurant Staff

(No information provided)

## Delivery Riders

### Full Time (is a Delivery Rider)

* has a Monthly Work Schedule 

### Part Time (is a Delivery Rider)

* has a Weekly Work Schedule

## Monthly Work Schedule (MWS)

* has a WWS (same WWS used for 4 consequtive weeks)
* has a from date (specifies which month the WWS applies for)
* has a to date 

- (Constraint on WWS for MWS) DayFrom, DayTo (Total 5 days)
  - 1,5
  - 2,6
  - 3,7
  - 4,1
  - 5,2
  - 6,3
  - 7,4

- (Constraint on WWS for MWS) Shift times HourFrom, HourTo
  - Shift 1: 10, 14 and 15,19
  - Shift 2: 11, 15 and 16,20
  - Shift 3: 12, 16 and 17,21
  - Shift 4: 13, 17 and 18,22

- (Constraint) 4 WWS in MWS must be equivalent

## Weekly Work Schedule (WWS)

* belongs to a rider
* has many hour intervals

- (Constraint) hour interval must be on the hour
- (Constraint) 1 hour break between hour intervals
- (Constraint) duration specified must be <= 4
- (Constraint) min 10 hours, max 48 hours

## Hour Intervals

* has a id
* has a day (1-7)
* has a from hour (10-22 [24-hr format])
* has a to hour (10-22 [24-hr format])

## Salary (Stores salary values for computation)

* has a type (Weekly, Monthly, Commission)
* has a value
* has a date

+ (Definition) Salary = Base Weekly/Monthly salary + commision (computed based on some criteria) 

## FDS Managers

(No information provided)

## Restaurant

* has a menu
* has a minimum order treshold

+ (Requirement) New order not accepted if minimum order treshold not met.

## Menu

* has many food items


## Food Items

* has categories
* has a daily limit
* has availability (Available or Unavailable)

+ (Requirement) daily limit reached = availability updated to 'unavailable'
+ (Requirement) The menu information could also be updated dynamically by restaurant staff.

## Catagories

* has name (local, western etc.)

##  Order

* has many food items
* has a delivery rider (Assigned to a delivery rider)
* has time order placed
* has time rider departs to restaurant
* has time rider arrives at restaurant
* has time rider departs from restaurant
* has time rider delivers order
* has delivery location (If new, add to Recent locations, else use recent lcoation)
  

+ (Definition) Order Total Cost = sum of all ordered items + delivery fee 
+ (Definition) Reward Points = 1 point per dollar for completed orders. Points can be used to offset delivery fee.
+ (Requirement) Delivery fee determined by FDS based on some criteria.
+ (Requirement) The rider assignment is determined by the FDS.
  
- (Constraint) Food items must be from same menu/restaurant


## Reviews (Food)

* belongs to a food item

+ (Requirement) The posted reviews could be viewed by all customers.

## Ratings (Delivery Service)

* belongs to a delivery rider
* has a value (1-5)


## Restaurant Promotion (Set period of time)

+ (Definition) Restaurant promotion - e.g., a discount of 20% for all orders exceeding $100 during December
+ Each restaurant may offer promotional prices for their menu items for certain periods of time

## FDS Promotion (Throughout the year)

* has an id (for tracking)
+ (Description) FDS Promotion
  + 10% discount for a customer’s first order
  + free delivery during certain time periods
  + offer special discount coupons to targeted customers (e.g., customers who have not placed any order for the last three months)
