var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');

var stixview = require('stixview');


var StixviewGraphModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'StixviewGraphModel',
        _view_name : 'StixviewGraphView',
        _model_module : 'jupyter-widget-stixview',
        _view_module : 'jupyter-widget-stixview',
        _model_module_version : '1.0.1',
        _view_module_version : '1.0.1',

        properties: null,

        bundle: null,
        gist_id: null,
        gist_file: null,
        url: null,
    })
});


var StixviewGraphView = widgets.DOMWidgetView.extend({
    render: function() {

        const element = this.el;

        const bundle = this.model.get('bundle');
        const gist_id = this.model.get('gist_id');
        const gist_file = this.model.get('gist_file');
        const url = this.model.get('url');

        const renderTimeout = this.model.get('timeout');

        const properties = {
            layout: 'cola',
            hideFooter: false,
            showSidebar: true,
            allowDragDrop: false,
            graphWidth: 800,
            graphHeight: 600,
            ...this.model.get('properties'),
        };

        if (this.graph) {
            this.graph.cy.destroy()
        };

        this.graph = stixview.init(element, properties, function(graph) {
            // timeout for Jupyter to render the DOM element, so that
            // layout algorythms can run
            const timeout = renderTimeout || ((element.offsetParent === null) ? 1200 : 50);
            if (bundle && bundle.id) {
                setTimeout(() => graph.loadData(bundle), timeout);
            } else if (gist_id) {
                setTimeout(() => {
                    graph.loadDataFromGist(gist_id, gist_file);
                }, timeout);
            } else if (url) {
                setTimeout(() => graph.loadDataFromUrl(url), timeout);
            }
        });
    },
})

module.exports = {
    StixviewGraphModel: StixviewGraphModel,
    StixviewGraphView: StixviewGraphView,
};
