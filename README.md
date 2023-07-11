cd E:\Training\Microservices\ticket

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

Alias
Set-Alias k kubectl
Set-Alias d docker
Set-Alias skf skaffold
function gok { set-location "E:\Training\Microservices\ticket\infra\k8s" }
function gor { set-location "E:\Training\Microservices\ticket" }
gor
echo Done

