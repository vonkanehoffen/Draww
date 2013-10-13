class Vote < ActiveRecord::Base
	belongs_to :post
	belongs_to :user
	validates_uniqueness_of :post_id, :scope => :user_id, :message => "You've already voted on this!"
	before_save {
		logger.debug "POST -------------------> "
		logger.debug @post
	}
end
