#!/bin/bash
aws eks --region eu-west-2 update-kubeconfig --name cluster

kubectl create -f env.yaml
kubectl apply -f backend.yaml

kubectl apply -f frontend.yaml

kubectl apply -f configmap.yaml
kubectl apply -f nginx.yaml

sleep 30s
kubectl get services