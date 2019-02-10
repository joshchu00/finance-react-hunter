#!/bin/sh

sh generate-config-js.sh > build/config.js
node -r esm server.js
