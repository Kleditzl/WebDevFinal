(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['drinkcard'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "         <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"drink-card\">\n    <div class=\"name\">\n      <h1>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Name") || (depth0 != null ? lookupProperty(depth0,"Name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data,"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":18}}}) : helper)))
    + "</h1>\n    </div>\n    <div class=\"ingredients\">\n      <h2> Ingredients: </h2>\n      <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"Ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":10,"column":17}}})) != null ? stack1 : "")
    + "      </ul>\n    </div>\n    <div class=\"recipe\">\n      <h2> Recipe: </h2>\n      <p> "
    + alias4(((helper = (helper = lookupProperty(helpers,"Recipe") || (depth0 != null ? lookupProperty(depth0,"Recipe") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Recipe","hash":{},"data":data,"loc":{"start":{"line":15,"column":10},"end":{"line":15,"column":20}}}) : helper)))
    + " </p>\n      \n    </div>\n</article>\n\n";
},"useData":true});
})();