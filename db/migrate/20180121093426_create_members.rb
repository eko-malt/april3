class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.string    :first_name
      t.string    :second_name
      t.string    :company
      t.string    :position
      t.integer   :phone, limit: 8
      t.string    :email
      t.string    :address
      t.integer   :edrpou
      t.integer   :area
      t.string    :manager

      t.timestamps
    end
  end
end
