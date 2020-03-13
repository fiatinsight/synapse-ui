# Fiat UI

This gem is designed to provide baseline UI for Rails projects at [@fiatinsight](https://github.com/fiatinsight/).

> Currently installed on [Tekne](https://github.com/fiatinsight/tekne/), [Parish.es](https://github.com/fiatinsight/parish-app), [Cleveland Mixer](https://github.com/fiatinsight/cleveland-mixer/), [CatholicStock](https://github.com/fiatinsight/catholic-stock/), [Ethika Politika](https://github.com/fiatinsight/ethika-politika/), [BrokrQuotes](https://github.com/fiatinsight/brokrquotes/), and others.

## Installation

### Rails

Add this to your application's Gemfile:

```ruby
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
gem 'fiat_ui', github: 'fiatinsight/fiat_ui'
```

> For stable release with older applications using this gem prior to November 2019, include `ref: 93628761a50e0553d77ee563ed52062c5c070333` in the gem dependency.

### Jekyll

You can use parts of this library for Jekyll sites.
- Copy the contents of `vendor/assets/stylesheets` into your site's `_sass` folder.
- Include each file uniquely in your master `.scss` (e.g., `@import "fiat_ui/variables";`); or you can create a file like `_sass/fiat_ui.scss` that refers to other individual files within a `_sass/fiat_ui` folder, and then call the main file in your master `.scss` file.
- Compile Bootstrap `.scss` files before you load `fiat_ui`. (You cannot use pre-compiled Bootstrap files.)
- Include JavaScript by copying the contents of `vendor/assets/javascripts` into your Jekyll site and calling them as usual.

## Styles

### Dependencies

Stylesheets depend on the latest Bootstrap, and should be loaded after it:

```ruby
@import "bootstrap";
@import "fiat_ui";
```

### Approach / philosophy

**Simpler decisions**

This library is designed to extend the power of Bootstrap, not to infringe on it. Even if you're great a leveraging Bootstrap directly, relying on some additional, component-based conventions can help to dramatically speed up routine decision making throughout your design.

**Functionality first**

Sheets are divided up (for the most part) into components. All the styles in a component-based sheet pertain _especially_ to that component &mdash; although maybe not _exclusively_. Other sheets are purely functional, for example, `animations.scss`. If a style doesn't fit into one of those categories, it's not included.

**Consistency in customization**

Most apps utilize many of the same UI components. This library allows you to adopt a global convention where it makes sense (e.g., off-the-shelf table styling), but also to easily override conventions when required. Additionally, it offers quite a few Bootstrap-inspired, granular selectors to enable significant, on-the-fly customizations directly within your HTML.

### Sheets

You can load all stylesheets in your app by calling `@import "fiat_ui"`. Or you can load individual sheets by calling, for example, `@import "fiat_ui/buttons"`.

The following sheets are available for inclusion:

- [animations.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/animations.scss)
- [buttons.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/buttons.scss)
- [content.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/content.scss)
- [forms.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/forms.scss)
- [layouts.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/layouts.scss)
- [material.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/material.scss)
- [modals.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/modals.scss)
- [nav.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/nav.scss)
- [tables.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/tables.scss)
- [tweaks.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/tweaks.scss)
- [typography.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/typography.scss)
- [variables.scss](https://github.com/fiatinsight/fiat_ui/blob/master/vendor/assets/stylesheets/fiat_ui/variables.scss)

### Customization

You can override style variables by including your own `project_name-variables.scss` and `project_name-styles.scss` files. Variables should be loaded _before_ the Fiat UI package. (Included variables are set using the `!default` flag, which means they'll only take effect if there's not a previous variable with the same name.) Styles should be added _after_ the Fiat UI package. For example:

```ruby
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap');
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

> Note: If you're not using the assets pipeline for JavaScript, you'll still need to include `app/assets/javascripts/application.js` for this, and call it in your template with `javascript_include_tag` in your header. Make sure it loads after you invoke jQuery.

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

### Modals

You can include [modals](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/modals). Invoke them by using:

```ruby
= render partial: 'layouts/fiat_ui/components/modals/small-modal'
```

### Navigation

Responsive navigation is available. It includes a [navbar](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/nav/_navbar.html.erb) partial and a fly-out / modal-driven [menu](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/nav/_nav-modal.html.erb).

To install the navbar, add the following to your template:

```ruby
navbar_locals = {
  classes: 'fixed-top bg-transparent pt-3',
  mobile_button_classes: 'px-3 py-2 bg-pink layer-2',
  menu_icon: 'fal fa-arrow-left mr-2',
  menu_title: 'Go',
  display_menu_title_mobile: false,
  links: [
    ['Test','root_path','fal fa-users'],
    ['Another','root_path','fal fa-users'],
    ],
  }
= render partial: 'layouts/fiat_ui/components/nav/navbar', locals: navbar_locals
```

You can pass the following variables to `locals` (N.B. they all default to `false` when not included):

- `classes`: Classes for your navbar wrapper, e.g., `fixed-top` and/or `layer-0`.
- `image`: An image you want to display in the logo section.
- `title`: A title you want to display in the logo section if an image isn't included.
- `links`: Top level links for your navbar, including name, path, and an icon (optional).
- `menu_icon`: The Font Awesome icon that'll show on your menu button.
- `menu_title`: A title for your menu button.
- `menu_button_classes`: Classes for your menu button on non-mobile.
- `mobile_menu_icon`: The Font Awesome icon that'll show on your menu button.
- `mobile_menu_title`: A title for your menu button.
- `mobile_menu_button_classes`: Classes for your menu button on mobile.

To include the menu modal, add the following to your template (probably just below your navbar partial):

```ruby
nav_modal_locals = {
  image: 'https://s3.amazonaws.com/bucket-name/image.png',
  image_width_percentage: 60,
  sections: [
    {
      title: 'Company',
      path: 'root_path',
      icon: 'far fa-home mr-2'
    },
    {
      title: 'Services',
      path: 'services_path',
      items: [
        {
          title: 'Design',
          path: 'design_path'
        },
        {
          title: 'Support',
          path: 'support_path'
        }
      ]
    }
    ] # end all sections
  }
= render partial: 'layouts/fiat_ui/components/nav/nav-modal', locals: nav_modal_locals
```

You can pass the following variables to `locals`:

- `image`: An image to display above your menu list.
- `image_width_percentage`: Specify what percent of the modal column the image should occupy (defaults to `50`).
- `sections`: The content of your menu; this is structured as a section with a title, link path, path variable (optional), icon, and any sub-items, each including a title, link path, variable, icon, and method (optional; defaults to `get`).

### Search

Search with [ransack](https://github.com/activerecord-hackery/ransack) can be configured simply using a [form partial](https://github.com/fiatinsight/fiat_ui/blob/master/app/views/layouts/fiat_ui/components/_search-keyword.html.erb):

```ruby
= render partial: 'layouts/fiat_ui/components/search-keyword', locals: { url: 'search_everything_path', placeholder: 'Search', filter_types: [ ['organization', 'Organizations'], ['user', 'Users'] ] }
```

You can pass the following variables into the `locals`:

- `url`: Required to route requests within your application.

- `placeholder`: A placeholder for the keyword search field; defaults to `Search`.

- `filter_types`: Optionally include an array of values and names to be used via a filters dropdown. This allows passing extra information into your controller for complex searches.

Handling search requests and responses can be done as usual. For example, you could set up the path `search_everything_path` by putting the following in your `routes.rb` file:

```ruby
get :search_everything, controller: :search
```

And creating the controller:

```ruby
class SearchController < ApplicationController
  def search_everything
    @record_type = params[:filter_type]

    if @record_type == 'organization'
      q = Organization.order("name ASC").ransack(name_downcase_cont_any: params[:q].downcase).result
    elsif @record_type == 'user'
      q = User.order("lastname ASC").ransack(username_or_email_or_lastname_or_firstname_cont_any: params[:q]).result
    end

    @results = q.to_a.uniq

    respond_to do |format|
      format.html {}
    end
  end
end
```

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

- `data_controller`: Include a controller for Stimulus actions, e.g., `drag-table-row`.

- `data_action`: Include any actions for a Stimulus controller separated by a single space. For example: `dragstart->drag-table-row#dragstart dragover->drag-table-row#dragover`.

- `data_url`: Include a data URL attribute for handling things (maybe in JavaScript). (Note: This is included in the table layout twice, both at the `table` element as well as in the `tbody` element. This is designed to allow flexibility for actions you might want to take that depend on this value.)

- `variables`: Pass anything else you like for use in your template. For example: `variables: { color: 'red', account: Current.account }` Then retrieve them by calling `variables[:color]` or `variables[:account]`. Defaults to `nil` unless included.

## Development

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fiatinsight/fiat_ui.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
