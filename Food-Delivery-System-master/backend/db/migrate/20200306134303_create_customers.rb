class CreateCustomers < ActiveRecord::Migration[6.0]

  def up
    execute <<-SQL
      CREATE TABLE customers(
        id serial PRIMARY KEY,
        name VARCHAR (255) NOT NULL,
        payment_method_id INTEGER DEFAULT 1 REFERENCES payment_methods(id),
        credit_card_number VARCHAR (255) NOT NULL,
        address VARCHAR (455) NOT NULL,
        order_count INTEGER NOT NULL DEFAULT 0,
        reward_points INTEGER NOT NULL DEFAULT 0,
        access_rights INTEGER NOT NULL default 0,
        last_order_date TIMESTAMP NOT NULL,
        created_date TIMESTAMP NOT NULL
      );
    SQL
  end

  def down
    execute <<-SQL
      DROP TABLE customers;
    SQL
  end

end
