json.array!(@posts) do |post|
  json.extract! post, :title, :vote_count
  json.url post_url(post, format: :json)
end
