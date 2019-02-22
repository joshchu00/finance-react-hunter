#!/bin/sh

cat <<EOF
window.config = {}
window.config.environment.name = '${ENVIRONMENT_NAME}';
window.config.hunter = {}
window.config.hunter.port = '${HUNTER_PORT}';
window.config.shielder = {}
window.config.shielder.proxy = {}
window.config.shielder.proxy.scheme = '${SHIELDER_PROXY_SCHEME}';
window.config.shielder.proxy.host = '${SHIELDER_PROXY_HOST}';
window.config.shielder.proxy.port = '${SHIELDER_PROXY_PORT}';
EOF
