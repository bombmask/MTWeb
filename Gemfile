source 'https://rubygems.org'
ruby '2.2.1'

gem 'rails'
gem 'thin'
gem 'haml-rails'

gem 'sprockets', github: 'rails/sprockets', branch: 'master'
gem 'babel-transpiler'

gem 'sass-rails', github: 'rails/sass-rails', branch: 'master'
gem 'sprockets-rails', github: 'rails/sprockets-rails', branch: 'master'
gem 'uglifier'
gem 'jquery-rails'
gem 'jquery-ui-rails'
gem 'bootstrap-sass', '~> 3.3.6'
gem 'therubyracer'
source 'https://rails-assets.org' do
  gem 'rails-assets-almond'
end

gem 'httparty'

gem 'figaro'

gem 'sdoc', group: :doc

group :development do
  gem 'sqlite3', '1.3.10'
  gem 'spring'
  gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
end

group :production do
  gem 'rails_12factor'
  gem 'unicorn'
  gem 'pg'
end
