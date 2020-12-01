# You can build a ready-made Python virtual environment with jupyterlab
# and jupyter-widget-stixview, and run jupyterlab in it like this:
#
#   VENV=$(pwd)/venv
#   docker build --build-arg VENV=$VENV -t jupyter-stixview .
#   CONTAINER=$(docker create jupyter-stixview)
#   docker cp $CONTAINER:$VENV $VENV
#   docker rm $CONTAINER
#   $VENV/bin/jupyter lab
#
FROM ubuntu:bionic

RUN apt-get update && apt-get install -y curl python3-pip python3-venv

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y --no-install-recommends nodejs

ARG VENV=/tmp/venv

RUN mkdir -p $VENV
WORKDIR $VENV
RUN chown 1000:1000 $VENV
USER 1000:1000

RUN python3.6 -m venv $VENV
RUN bin/pip install --no-cache-dir jupyterlab

COPY . jupyter_widget_stixview

ENV npm_config_cache=/tmp/.npm
RUN bin/pip install --no-cache-dir jupyter_widget_stixview

RUN set -ex; \
    export PATH=$VENV/bin:$PATH; \
    jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build; \
    jupyter labextension install jupyter_widget_stixview/js --no-build; \
    jupyter lab build
