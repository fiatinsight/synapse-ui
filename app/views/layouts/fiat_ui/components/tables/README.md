# Tables

This is used to generate... tables! A table can be invoked from a view using the following:

```ruby
render partial: 'layouts/fiat_ui/components/tables/config', locals: { header: false, columns: ['Column 1', 'Column 2'], items: @items, namespace: 'namespace', type: 'item-type', cache_scope: 'specific_cache_scope', cache_status: true, style: 'minimal condensed' }
```

## Variables

`title`: Defaults to `false` unless a title is included.

`header`: Defaults to `false` unless optionally included and set to `true`. This allows you to display column headers.

`columns`: Set an array of column titles between one and a handful. Defaults to `false` if not included.

`paginate`: Decide whether the list should paginate. If `true`, you'll need to set the pagination parameters on the query, probably in the controller. If not set, it will default to `false`.

`per_page`: Sets the pagination number to 25 unless it's explicitly declared otherwise.

`items`: Include the query you want to iterate over.

`namespace`: Optionally include a namespace to use in the list item partial (e.g., to reuse partials for multiple namespaces).

`type`: Include the partial name for this item type. Create partials in a folder in your app at `app/views/layouts/fiat_ui/components/tables/item_types`. E.g., `_page.html.erb` would be called with `page`.

`cache_status`: Determines whether results will be cached or not. Defaults to `false` unless included as `true`.

`cache_scope` Sets the cache scope automatically using `#{controller_path}/#{action_name}`unless it's explicitly included, e.g., `admin_users`. Including a scope for the cache key helps to differentiate similar queries for separate views.

`cache_expire`: Sets cache expiration using Ruby time helpers, e.g., `1.hour`. Defaults to `false` unless declared.

`style`: Include classes to pass into the `table` element. Defaults to `false` unless something is included.
