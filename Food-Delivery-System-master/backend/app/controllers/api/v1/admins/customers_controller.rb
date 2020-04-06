module Api
  module V1
    module Admins
      class CustomersController < ApplicationController

        # GET /customers
        def index
          customer_id = params[:id]
          customer = Api::V1::CustomersQuery.getAll(
            per_page: params[:per_page],
            sort_by: params[:sort_by],
            sort_dir: params[:sort_dir],
          )
          render(
            json: customer
          )
        end

        def email_order
        end


        # private

        # def show_params
        #   params.permit(:id)
        # end

      end
    end
  end
end