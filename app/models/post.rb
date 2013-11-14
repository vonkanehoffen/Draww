class Post < ActiveRecord::Base
	has_attached_file :image, 
    :styles => { :original => "960x960>", :thumb => "285x285>" },
    :default_url => '/assets/missing.png'
	belongs_to :user
	has_many :votes

  attr_accessor :image_data, :tmp_uri
  before_validation :save_image_data
  after_post_process :remove_temporary_image_file

  require_dependency "#{Rails.application.root}/lib/datafy"

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

  def self.hot
    hotness_field = "LOG10(ABS(vote_count) + 1) * SIGN(vote_count)   + (UNIX_TIMESTAMP(created_at) / 300000)"
    select("*, #{hotness_field} as hotness").order('hotness')
  end

  private
  def save_image_data
    if self.image_data
      require Rails.root.join('lib', 'datafy.rb')
      self.tmp_uri = "tmp/"+friendly_name(self.title)+"_"+Time.new.to_f.to_s+".jpg"
      File.open(self.tmp_uri, "wb") { |f| f.write(Datafy::decode_data_uri(image_data)[0]) }  
      self.image = File.open(self.tmp_uri, "r")
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

  def remove_temporary_image_file
    # Maybe this double check will stop the "TypeError: no implicit conversion of nil into String" error on .exist?
    if self.tmp_uri then
      File.delete(self.tmp_uri) if File.exist?(self.tmp_uri)
    end
  end

end
