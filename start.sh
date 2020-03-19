cp -rf ./nginx/test.conf ./nginx/app.conf
npm i
npm run build
app_name=beating_broker_name
version=v1
image_name=$app_name:$version
docker stop $app_name
docker rm $app_name
docker rmi -f $image_name
docker build -t $image_name .
docker run  -p 8084:80 --name $app_name $image_name  