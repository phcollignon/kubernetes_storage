#!/bin/bash
kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml