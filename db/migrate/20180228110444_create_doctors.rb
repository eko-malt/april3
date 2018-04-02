class CreateDoctors < ActiveRecord::Migration[5.1]
  def change
    create_table :doctors do |t|
      t.string :first_name
      t.string :second_name
      t.string :middle_name
      t.string :spec
      t.string :city
      t.string :work
      t.string :phone
      t.string :email
      t.integer :console
      t.string :club
      t.string :pharm
    end
  end
end
