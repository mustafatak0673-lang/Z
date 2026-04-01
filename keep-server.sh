#!/bin/bash
while true; do
  cd /home/z/my-project
  bun run dev
  echo "[$(date)] Server crashed, restarting in 2s..." >> /home/z/my-project/server-watch.log
  sleep 2
done
