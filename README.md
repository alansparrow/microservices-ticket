C:\WINDOWS\system32\drivers\etc\hosts

cd E:\Training\Microservices\ticket

# gcloud
https://cloud.google.com/sdk/docs/install
https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
gcloud components install gke-gcloud-auth-plugin
gcloud auth login

# forward port
k port-forward nats-depl-775588555-zqj4x 4222:4222

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

Set-Alias k kubectl
Set-Alias d docker
Set-Alias skf skaffold
function gok { set-location "E:\Training\Microservices\ticket\infra\k8s" }
function gor { set-location "E:\Training\Microservices\ticket" }
gor
echo Done