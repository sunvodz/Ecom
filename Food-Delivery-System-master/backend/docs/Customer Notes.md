# To create a customer

```ruby
Customer.create(
  name: 'ali',
  credit_card_number: '12345',
  adddress: 'Pasir Ris',
  last_order_date: '1900-01-01 00:00:00',
  created_date: Time.now()
)
```

- Highlight code above.
- Ctrl-J to join to paste into rails console.

```ruby
Customer.create( name: 'ali', credit_card_number: '12345', address: 'Pasir Ris', last_order_date: '1900-01-01 00:00:00', created_date: Time.now() )
```

## Customers Endpoints

As a Customer, I want to see my profile.
`GET foodie.sg/api/v1/customers/:id`

```js
customers: {
  id: 1,
  name: 'ali',
  credit_card_number: '12345',
  adddress: 'Pasir Ris',
  last_order_date: '1900-01-01 00:00:00',
  created_date: '2020-01-02 12:23:24'
}
```

As a customer, I want to see my past Orders

`GET foodie.sg/api/v1/customers/:id/orders`

```js
orders: {
  id: 1,
  name: 'ali',
  credit_card_number: '12345',
  adddress: 'Pasir Ris',
  last_order_date: '1900-01-01 00:00:00',
  created_date: '2020-01-02 12:23:24'
}
```

## Admin Endpoint

As a Admin, I want to see all my customers.


`GET foodie.sg/api/v1/admins/customers`
- all plural (admins, customers)

Response Body:

```js
customers: [{
  id: 1,
  name: 'ali',
  credit_card_number: '12345',
  adddress: 'Pasir Ris',
  last_order_date: '1900-01-01 00:00:00',
  created_date: '2020-01-02 12:23:24'
},{
  id: 2,
  name: 'ali',
  credit_card_number: '12345',
  adddress: 'Pasir Ris',
  last_order_date: '1900-01-01 00:00:00',
  created_date: '2020-01-02 12:23:24'
}, ...
```

As a Admin, I want to see just one customer details.
- Admin click on Customer Row in a Table on the frontend
