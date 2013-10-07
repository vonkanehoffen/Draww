class AddWeightToVotes < ActiveRecord::Migration
  def change
  	add_column :votes, :weight, :integer
  end
end
