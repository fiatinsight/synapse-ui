# Fiat UI

This gem is designed to provide baseline UI for Rails projects at Fiat Insight.

> Currently installed on [Tekne](https://github.com/fiatinsight/tekne/), [Parish.es](https://github.com/fiatinsight/parish-app), [Cleveland Mixer](https://github.com/fiatinsight/cleveland-mixer/), [CatholicStock](https://github.com/fiatinsight/catholic-stock/), [Ethika Politika](https://github.com/fiatinsight/ethika-politika/), [BrokrQuotes](https://github.com/fiatinsight/brokrquotes/), and others.

## Installation

### Rails

Add this line to your application's Gemfile:

```ruby
gem 'fiat_ui'
```

Or install it yourself with:

    $ gem install fiat_ui

### Jekyll

You can use parts of this library for Jekyll sites.
- Copy the contents of `vendor/assets/stylesheets` into your site's `_sass` folder.
- Include each file uniquely in your master `.scss` (e.g., `@import "fiat_ui/variables";`); or you can create a file like `_sass/fiat_ui.scss` that refers to other individual files within a `_sass/fiat_ui` folder, and then call the main file in your master `.scss` file.
- Compile Bootstrap `.scss` files before you load `fiat_ui`. (You cannot use pre-compiled Bootstrap files.)
- Include JavaScript by copying the contents of `vendor/assets/javascripts` into your Jekyll site and calling them as usual.

## Styles

Stylesheets assume using the latest Bootstrap, and should be loaded after it. For example:

```ruby
@import "bootstrap";
@import "fiat_ui";
```

You can override style variables by including your own `project_name-variables.scss` and `project_name-styles.scss` files. Variables should be loaded _before_ the Fiat UI package. (Included variables are set using the `!default` flag, which means they'll only take effect if there's not a previous variable with the same name.) Styles should be added _after_ the Fiat UI package. For example:

```ruby
@import "bootstrap";
@import "project_name-variables";
@import "fiat_ui";
@import "project_name-styles";
```

## JavaScript

### Font Awesome

To include Font Awesome, `require` the following in your `application.js` file:

```ruby
//= require fa-v4-shims.min
//= require fontawesome-all.min
```

> Legal Notice: Font Awesome is included in this gem under Fiat's [Font Awesome Pro License](https://fontawesome.com/license). Users not covered by Fiat's license (i.e., "non-Creators" as designated by Font Awesome) are _not_ hereby authorized to use licensed materials. Inclusion of Font Awesome scripts in this gem is not designed to distribute permissions to non-Creators, nor does it constitute a standalone copy of any licensed materials.

## Components

Some integrated components are also included to make it easier to build common utilities and workflows.

### Alerts

An [alerts](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/_alerts.html.erb) module to handle `flash` notifications is available by loading:

```ruby
= render 'layouts/fiat_ui/components/alerts'
```

This picks up the value of both `flash[:alert]` and `flash[:notice]` and renders them in the view.

Alerts are styled using the `#alert` and `.flash` selectors. By default, they're designed to appear at the top of a page and to persist. However, you can optionally fade them by including something like the following in your `application.js` file:

```javascript
$(document).on('turbolinks:load', function() {
  setTimeout(function(){
    $("#alert").addClass("fade");
  }, 4000);
});
```

### Analytics

A [Google Analytics tracking script](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/_analytics.html.erb) is supplied. You can include it in the `head` section of your main template file by calling:

```ruby
= render partial: 'layouts/fiat_ui/components/analytics', locals: { tracking_id: "UA-12345678-9"}
```

Make sure to replace the `tracking_id` variable with yours from Google. Setting the value to `nil` will bypass the script loading.

### Errors

An [errors](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/_errors.html.erb) module is available to handle information passed to `flash[:errors]`. To use it, include the following in your layout template:

```ruby
= render 'layouts/fiat_ui/components/errors'
```

To pass information to the partial — e.g., during a form submission fault — do something like this in your controller:

```ruby
respond_to do |format|
  if @item.save
    format.html # Success response
  else
    format.html { redirect_to item_path(field_one: @item.field_one, field_two: @item.field_two), alert: "Missing fields required", flash: { errors: @item.errors.full_messages } }
  end
end
```

In the above example, `flash[:errors]` will contain a concatenated string of applicable errors. You can query that string to display custom, embedded error messages in your view. For example:

```ruby
if flash[:error] && flash[:error].include?("Email can't be blank")
  # Email must be included
end
```

By default, the `.flash.errors` class is set to `display: hidden`, so you can access it in your view template without showing the raw results.

Also in the above example, `flash[:alert]` is reserved for a normal alert message. And form parameters — which are usually when using `redirect_to` — are passed along to the path. This enables you to re-populate your nicely marked up error form with any originally included values. For example:

```ruby
= f.input :field_one, input_html: { value: params[:field_one] }
```

### Meta tags

Meta tags are enabled via the `meta-tags` gem dependency. Run `rails generate meta_tags:install` to create a config initializer. Then include something like this in your main template file:

```ruby
= display_meta_tags site: site_name, description: description, image_src: image, twitter: { card: "summary_large_image", site: "@username", creator: "@username" }, og: { title: site_name, type: 'website', image: image, description: description }
```

You can read the full documentation [here](https://github.com/kpumuk/meta-tags).

### Sitemaps

Sitemaps can be configured via the `sitemap_generator` gem dependency. Read the full setup documentation [here](https://github.com/kjvarga/sitemap_generator).

### Spinner

A [spinner](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/_spinner.html.erb) is available to use for page loads, transitions, etc. To include it in your app, load the following partial in your layout template:

```ruby
= render partial: 'layouts/fiat_ui/components/spinner', locals: { color: 'light', icon: 'fal fa-spinner-third' }
```

This accepts variables for `color` and `icon`. By default, color is set to `light`, but can also be `dark`. The `icon` variable is `fal fa-spinner-third` by default, but can be any fully qualified Font Awesome icon.

To display the spinner, adjust the following to work with your `application.js` file:

```javascript
// Show spinner during Turbolinks loads
$(document).on('turbolinks:load', function() {
  // hide spinner when a page is loaded
  $(".spinner").hide();
});
$(document).on('turbolinks:click', function() {
  // show spinner when a Turbolinks link is clicked
  $(".spinner").show();
});

// Show spinner during AJAX requests
$(document).on('turbolinks:load', function() {
  // hide spinner to start
  $(".spinner").hide();
  // show spinner on AJAX start
  $(document).ajaxStart(function(){
    $(".spinner").show();
  });
  // hide spinner on AJAX stop
  $(document).ajaxStop(function(){
    $(".spinner").hide();
  });
});
```

If you want to create a custom spinner template, instead, you can do so by wrapping your own HTML with the `spinner` class.

### Tables

A [table](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/tables/_config.html.erb) generator is available for creating advanced, flexible tables. To invoke, include the following in your view:

```ruby
= render partial: 'layouts/fiat_ui/components/tables/config', locals: { header: false, columns: ['Column 1', 'Column 2'], items: @items, namespace: 'namespace', type: 'item-type', cache_scope: 'specific_cache_scope', cache_status: true, style: 'minimal condensed', variables: { variable_one: computed_value, variable_two: "red" } }
```

You  can pass the following variables into the `locals`:

- `title`: Defaults to `false` unless a title is included.

- `header`: Defaults to `false` unless optionally included and set to `true`. This allows you to display column headers.

- `columns`: Set an array of column titles between one and a handful. Defaults to `false` if not included.

- `paginate`: Decide whether the list should paginate. If `true`, you'll need to set the pagination parameters on the query, probably in the controller. If not set, it will default to `false`.

- `per_page`: Sets the pagination number to 25 unless it's explicitly declared otherwise.

- `items`: Include the query you want to iterate over.

- `namespace`: Optionally include a namespace to use in the list item partial (e.g., to reuse partials for multiple namespaces).

- `type`: Include the partial name for this item type. Create partials in a folder in your app at `app/views/layouts/fiat_ui/components/tables/item_types`. E.g., `_page.html.erb` would be called with `page`.

- `cache_status`: Determines whether results will be cached or not. Defaults to `false` unless included as `true`.

- `cache_scope` Sets the cache scope automatically using `#{controller_path}/#{action_name}`unless it's explicitly included, e.g., `admin_users`. Including a scope for the cache key helps to differentiate similar queries for separate views.

- `cache_expire`: Sets cache expiration using Ruby time helpers, e.g., `1.hour`. Defaults to `false` unless declared.

- `style`: Include classes to pass into the `table` element. Defaults to `false` unless something is included.

- `variables`: Pass anything else you like for use in your template. For example: `variables: { color: 'red', account: Current.account }` Then retrieve them by calling `variables[:color]` or `variables[:account]`. Defaults to `nil` unless included.

## Development

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fiatinsight/fiat_ui.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
