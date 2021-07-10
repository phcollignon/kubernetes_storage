#!/bin/bash
kubectl delete -f ingress.yaml

pushd frontend
./uninstall.sh
popd

pushd backend
./uninstall.sh
popd

pushd database
./uninstall.sh
popd





