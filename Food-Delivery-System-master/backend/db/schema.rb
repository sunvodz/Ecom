# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_06_134303) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255, null: false
    t.integer "payment_method_id", default: 1
    t.string "credit_card_number", limit: 255, null: false
    t.string "address", limit: 455, null: false
    t.integer "order_count", default: 0, null: false
    t.integer "reward_points", default: 0, null: false
    t.integer "access_rights", default: 0, null: false
    t.datetime "last_order_date", null: false
    t.datetime "created_date", null: false
  end

  create_table "payment_methods", id: :serial, force: :cascade do |t|
    t.string "name", limit: 255, null: false
  end

  add_foreign_key "customers", "payment_methods", name: "customers_payment_method_id_fkey"
end
