class RemoveDirectionFromVotes < ActiveRecord::Migration
  def change
  	remove_column :votes, :direction
  end
end
