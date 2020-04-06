class CreatePaymentMethods < ActiveRecord::Migration[6.0]

  def up
    execute <<-SQL
      CREATE TABLE payment_methods(
        id serial PRIMARY KEY,
        name VARCHAR (255) NOT NULL
      );
      INSERT INTO payment_methods (name) VALUES
        ('cash'),
        ('credit_card');
    SQL
  end

  def down
    execute <<-SQL
      DROP TABLE payment_methods;
    SQL
  end

end
