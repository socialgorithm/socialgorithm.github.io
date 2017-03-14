# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "socialgorithm"
  spec.version       = "1.0.0"
  spec.authors       = ["Alejandro U. Alvarez"]

  spec.summary       = %q{Social Algorithms website}

  spec.homepage      = "https://socialgorithm.org"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.3"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 0.10"
  spec.add_runtime_dependency "jekyll-mentions", "~> 1.2"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
  spec.add_runtime_dependency "jekyll-redirect-from", "~> 0.11"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.5"
  spec.add_runtime_dependency "jemoji", "~> 0.7"

  spec.add_development_dependency "bundler", "~> 1.12"
end
