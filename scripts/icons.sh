#!/bin/bash

node node_modules/icon-components/dist/cli.js \
    --src assets/icons/svg \
    --dest components/Icons \
    --template assets/icons/template/component \
    --listTemplate assets/icons/template/list \
    --prefix '' \
    --in-root \
    --remove-old

prettier --write "components/Icons/*"