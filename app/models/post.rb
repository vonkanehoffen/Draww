class Post < ActiveRecord::Base
	has_attached_file :image, 
    :styles => { :fullsize => "960x960>", :thumb => "285x285>" },
    :default_url => '/assets/missing.png'
	belongs_to :user
	has_many :votes

  attr_accessor :image_data
  before_validation :save_image_data

  require_dependency 'lib/datafy'

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

  private
  def save_image_data
    logger.debug "Saving image data"
    if self.image_data
      require Rails.root.join('lib', 'datafy.rb')
      tmp_uri = "tmp/"+friendly_name(self.title)+".jpg"
      logger.debug "Friendly name = "+tmp_uri
      File.open(tmp_uri, "wb") { |f| f.write(Datafy::decode_data_uri(image_data)[0]) }  
      self.image = File.open(tmp_uri, "r")
      # TODOL: Remove the temporary image after paperclip saves it.
    end
  end

  def friendly_name(str)
    s = str.encode('utf-8')
    s.downcase!
    s.gsub!(/'/, '')
    s.gsub!(/[^A-Za-z0-9]+/, ' ')
    s.strip!
    s.gsub!(/\ +/, '-')
    return s
  end

end
