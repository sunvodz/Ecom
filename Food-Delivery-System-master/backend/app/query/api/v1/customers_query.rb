module Api
  module V1
    class CustomersQuery

      def self.get(id)
        sql = "select * from customers where id = #{id}"
        # PG::Result
        customer_result = ActiveRecord::Base.connection.execute(sql)
        # {"id"=>1, "name"=>"ali", "payment_method_id"=>1, "credit_card_number"=>"12345", "address"=>"Pasir Ris", "order_count"=>0, "reward_points"=>0, "access_rights"=>0, "last_order_date"=>1900-01-01 00:00:00 UTC, "created_date"=>2020-03-06 14:01:06 UTC}
        return customer_result[0]
      end

      def self.getAll(params)
        per_page = params[:per_page] || 5
        sort_by = params[:sort_by] || 'id'
        sort_dir = params[:sort_dir] || 'asc'
        sql = "select * from customers ORDER BY customers.#{sort_by} #{sort_dir} LIMIT #{per_page}"
        # PG::Result
        customer_result = ActiveRecord::Base.connection.execute(sql)
        # {"id"=>1, "name"=>"ali", "payment_method_id"=>1, "credit_card_number"=>"12345", "address"=>"Pasir Ris", "order_count"=>0, "reward_points"=>0, "access_rights"=>0, "last_order_date"=>1900-01-01 00:00:00 UTC, "created_date"=>2020-03-06 14:01:06 UTC}
        return customer_result
      end

    end
  end
end