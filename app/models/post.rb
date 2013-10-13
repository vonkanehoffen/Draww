class Post < ActiveRecord::Base
	has_attached_file :image, :styles => { :fullsize => "960x960>", :thumb => "285x285>" }
	belongs_to :user
	has_many :votes

	def vote_up(user)
    	votes.build(:user => user, :weight => 1)
  	end

	def vote_down(user)
    	votes.build(:user => user, :weight => -1)
  	end

  	def count_votes
  		logger.debug "counting votes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> "+self.votes.count
  	end

end
