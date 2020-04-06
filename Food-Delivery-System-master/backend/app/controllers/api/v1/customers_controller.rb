module Api
  module V1
    class CustomersController < ApplicationController

      # GET /customers/:id
      def show
        customer_id = params[:id]
        customer = Api::V1::CustomersQuery.get(customer_id)
        render(
          json: customer
        )
      end

      # private

      # def show_params
      #   params.permit(:id)
      # end

    end
  end
end