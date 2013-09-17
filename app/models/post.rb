class Post < ActiveRecord::Base
	has_attached_file :image, :styles => { :fullsize => "960x960>", :thumb => "285x285>" }
end
