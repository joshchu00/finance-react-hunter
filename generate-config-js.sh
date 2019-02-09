#!/bin/sh

# if [ -z ${ENVIRONMENT} ]; then
#     ENVIRONMENT=undefined
# else
#     ENVIRONMENT=${ENVIRONMENT}
# fi

# if [ -z ${HUNTER_PORT} ]; then
#     HUNTER_PORT=undefined
# else
#     HUNTER_PORT=${HUNTER_PORT}
# fi

# if [ -z ${SHIELDER_PROXY_SCHEME} ]; then
#     SHIELDER_PROXY_SCHEME=undefined
# else
#     SHIELDER_PROXY_SCHEME=${SHIELDER_PROXY_SCHEME}
# fi

# if [ -z ${SHIELDER_PROXY_HOST} ]; then
#     SHIELDER_PROXY_HOST=undefined
# else
#     SHIELDER_PROXY_HOST=${SHIELDER_PROXY_HOST}
# fi

# if [ -z ${SHIELDER_PROXY_PORT} ]; then
#     SHIELDER_PROXY_PORT=undefined
# else
#     SHIELDER_PROXY_PORT=${SHIELDER_PROXY_PORT}
# fi

cat <<EOF
window.config.environment='${ENVIRONMENT}';
window.config.hunter.port='${HUNTER_PORT}';
window.config.shielder.proxy.scheme='${SHIELDER_PROXY_SCHEME}';
window.config.shielder.proxy.host='${SHIELDER_PROXY_HOST}';
window.config.shielder.proxy.port='${SHIELDER_PROXY_PORT}';
EOF
