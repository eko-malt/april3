class ChangeConsoleToString < ActiveRecord::Migration[5.1]
  def change
    change_table :doctors do |t|
      t.change :console, :string
    end
  end
end
