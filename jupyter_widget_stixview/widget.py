import ipywidgets as widgets
from traitlets import Unicode, default, Dict, Long

version = '^1.0.3'

class StixviewGraph(widgets.DOMWidget):

    _view_name = Unicode('StixviewGraphView').tag(sync=True)
    _model_name = Unicode('StixviewGraphModel').tag(sync=True)
    _view_module = Unicode('jupyter-widget-stixview').tag(sync=True)
    _model_module = Unicode('jupyter-widget-stixview').tag(sync=True)
    _view_module_version = Unicode(version).tag(sync=True)
    _model_module_version = Unicode(version).tag(sync=True)

    properties = Dict().tag(sync=True)

    gist_id = Unicode().tag(sync=True)
    gist_file = Unicode().tag(sync=True)
    url = Unicode().tag(sync=True)
    bundle = Dict().tag(sync=True)
    timeout = Long().tag(sync=True)
