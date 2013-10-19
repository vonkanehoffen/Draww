class Post < ActiveRecord::Base
	has_attached_file :image, :styles => { :fullsize => "960x960>", :thumb => "285x285>" }
	belongs_to :user
	has_many :votes

	def vote_up(user)
    vote = votes.find_by_user_id(user.id)
    if vote
      vote.update_attributes(:weight => 1)
    else
    	votes.build(:user => user, :weight => 1)
    end
    count_votes
    vote
	end

	def vote_down(user)
    vote = votes.find_by_user_id(user.id)
    if vote
      vote.update_attributes(:weight => -1)
    else
      votes.build(:user => user, :weight => -1)
    end
    count_votes
    vote
	end

	def count_votes
		self.vote_count = votes.inject(0) { |count, v| count + v.weight }
    self.save!
	end

  def self.hot(limit=20, offset=0)
    self.find_by_sql <<eos
      SELECT *, LOG10(ABS(vote_count) + 1) * SIGN(vote_count)   
          + (UNIX_TIMESTAMP(created_at) / 300000)
          as hotness
      FROM posts
      ORDER BY hotness
           DESC
      LIMIT #{offset}, #{limit}
eos
  end

end
