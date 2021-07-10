#!/bin/bash
pushd database
./install.sh
popd

pushd backend
./install.sh
popd

pushd frontend
./install.sh
popd

kubectl create -f ingress.yaml