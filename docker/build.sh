#!/bin/bash

docker build -t product-service:latest -f docker/Dockerfile $* .
