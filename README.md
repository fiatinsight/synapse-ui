# Fiat UI

Welcome to your new gem! In this directory, you'll find the files you need to be able to package up your Ruby library into a gem. Put your Ruby code in the file `lib/fiat_ui`. To experiment with that code, run `bin/console` for an interactive prompt.

TODO: Delete this and the text above, and describe your gem

## Using with Rails

Add this line to your application's Gemfile:

```ruby
gem 'fiat_ui'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install fiat_ui

Include everything by importing the main stylesheet in `application.scss`: `@import "fiat_ui";`. Or you can include individual sheets by calling them directly: e.g., `@import "fiat_ui/variables";`.

## Using with Jekyll

Copy the contents of `vendor/assets/stylesheets` into your Jekyll site's `_sass` folder. You can include each file uniquely in your master `.scss`: e.g., `@import "fiat_ui/variables";`. Or you can create a file like `_sass/fiat_ui.scss` that refers to other individual files within a `_sass/fiat_ui` folder, and then call the main file in your master `.scss` file.

## Customizations

You can override variables and styles by including your own `project_name-variables.scss` and `project_name-styles.scss` files. Variables should be loaded _before_ the Fiat UI package. (Included variables are set using the `!default` flag, which means they'll only take effect if there's not a previous variable with the same name.) Styles should be added _after_ the Fiat UI package.

## Development

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fiatinsight/fiat_ui.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
