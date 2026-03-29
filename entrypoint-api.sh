#!/bin/sh
# On first run or if mock is empty, copy default mock data to persistent volume
if [ ! -d /cache/mock ] || [ ! -f /cache/mock/templates/list.json ]; then
  echo "Initializing: copying mock data to /cache/mock"
  rm -rf /cache/mock
  cp -r /usr/src/app/mock /cache/mock
fi

# Replace the bundled mock dir with a symlink to persistent storage
rm -rf /usr/src/app/mock
ln -sf /cache/mock /usr/src/app/mock

# Also ensure upload dirs exist
mkdir -p /cache/user /cache/psd /cache/covers

exec node server/index.js
