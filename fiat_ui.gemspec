
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "fiat_ui/version"

Gem::sification.new do |s|
  s.name          = "fiat_ui"
  s.version       = FiatUi::VERSION
  s.authors       = ["Andrew Haines"]
  s.email         = ["andrew@fiatinsight.com"]

  s.summary       = "Fiat Insight UI libraries"
  s.description   = "This is a front end pack designed to be used by Fiat Insight developers on Rails and Jekyll projects."
  s.homepage      = "https://github.com/fiatinsight/fiat_ui"
  s.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  # if s.respond_to?(:metadata)
  #   s.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  # else
  #   raise "RubyGems 2.0 or newer is required to protect against " \
  #     "public gem pushes."
  # end

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  # s.files         = `git ls-files -z`.split("\x0").reject do |f|
  #   f.match(%r{^(test|s|features)/})
  # end

  s.bindir        = "exe"
  s.executables   = s.files.grep(%r{^exe/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_development_dependency "bundler", "~> 1.16"
  s.add_development_dependency "rake", "~> 10.0"
end
