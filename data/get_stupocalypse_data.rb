require 'net/http'
require 'json'

player_names = {
  "6498909" => "Dialuposaurus",
  "63658494" => "Roamin Ronin",
  "71227969" => "Uncle Ginger",
  "44427624" => "hoplyte",
  "65500551" => "losandro",
  "44273131" => "mgrif"
}

player_ids = [
  "6498909",
  "63658494",
  "71227969",
  "44427624",
  "65500551",
  "44273131"
]

first_match_id = 4091450619
last_match_id = 4097603244

def get(path)
  uri = URI path
  Net::HTTP.get uri
end

def url(path)
  # "https://api.opendota.com/api/players/6498909/matches?limit=200&date=6"
  "https://api.opendota.com/api/#{path}"
end

player_ids.each do |player_id|
  name = player_names[player_id]
  puts "Getting matches for #{name}"
  body = get(url("players/#{player_id}/matches?limit=200&date=7&significant=0"))
  matches = JSON.parse(body).select do |match|
    match["match_id"].to_int < last_match_id
  end
  File.open("data/2018/#{player_id}.json", "w") do |line|
    line.puts matches.to_json
  end
end
