#!/bin/sh
# On first run, copy mock data to persistent volume
if [ ! -d /cache/mock ]; then
  echo "First run: copying mock data to /cache/mock"
  cp -r /usr/src/app/mock /cache/mock
fi

# Replace the bundled mock dir with a symlink to persistent storage
rm -rf /usr/src/app/mock
ln -sf /cache/mock /usr/src/app/mock

# Also ensure user upload dir exists
mkdir -p /cache/user /cache/psd

exec node server/index.js
