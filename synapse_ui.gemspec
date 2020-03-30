lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "synapse_ui/version"

Gem::Specification.new do |s|
  s.name          = "synapse_ui"
  s.version       = SynapseUi::VERSION
  s.authors       = ["Andrew Haines"]
  s.email         = ["andrew@fiatinsight.com"]

  s.summary       = "Synapse UI libraries"
  s.description   = "This is a front end pack designed to be used by Fiat Insight developers on Synapse projects."
  s.homepage      = "https://github.com/fiatinsight/synapse_ui"
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|s|features)/})
  end

  s.bindir        = "exe"
  s.executables   = s.files.grep(%r{^exe/}) { |f| File.basename(f) }
  s.require_paths = ["lib"]

  s.add_dependency "will_paginate"
  s.add_dependency "ransack"
  s.add_dependency "meta-tags"
  s.add_dependency "sitemap_generator"

  s.add_development_dependency "bundler", "~> 1.16"
  s.add_development_dependency "rake", "~> 13.0"
end
