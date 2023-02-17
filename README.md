# social-media
## Setup

### Docker (Docker Compose)
1.  Create a database in MongoDB
2.  Create a .env file in the project directory 
3.  Copy connection string from MongoDB and paste into the .env file as follows
    
ATLAS_URI="connection string" 
PORT="5000"

4.  To build the docker images, run the command:

```bash
docker-compose build
```

5.  To start the application 

```bash
docker-compose up
```

### Kubernetes
1. Build docker image first, run the command:

```bash
docker-compose build
```

2. Create a database in MongoDB
3. Copy connection string from MongoDB and paste into the env.yaml file (line 7), as follows:

ATLAS_URI=mongodb+srv://root:<password>@clustername.xxxxxxx.mongodb.net/?retryWrites=true&w=majority

4. Create a Kubernetes Cluster within AWS 
5. Install AWS CLI
6. Run the following command, as follows (make the changes below to your AWS Account):

```bash
export AWS_ACCESS_KEY="YOUR AWS ACCESS KEY"
export AWS_SECRET_KEY="YOUR AWS SECRET KEY"
export AWS_REGION="YOUR AWS REGION"
aws configure set aws_access_key_id $AWS_ACCESS_KEY && aws configure set aws_secret_access_key $AWS_SECRET_KEY && aws configure set region $AWS_REGION
```

6. Run the setup.sh file within the Kubernetes Folder

```bash
sudo chmod +x ./setup.sh
./setup.sh
```
## Application

![login](https://user-images.githubusercontent.com/92265482/219783789-63c7222c-db69-4287-bb50-5ae7da1aa4de.png)

![login2](https://user-images.githubusercontent.com/92265482/219783811-14647895-be8a-4a60-b829-492e1037cf32.png)

![image2](https://user-images.githubusercontent.com/92265482/219783898-c97b7bee-7bc0-42c8-a5ce-5bceb2610af3.png)

![image3](https://user-images.githubusercontent.com/92265482/219783966-db1f5b71-e585-45f1-9ec6-1bfd9ed6e171.png)

![test2](https://user-images.githubusercontent.com/92265482/219783952-b2f88758-89fc-4442-9b02-4d246129e393.png)

![test](https://user-images.githubusercontent.com/92265482/219784156-8c5fa103-a4c5-4d5c-8f6f-e4831ca55c88.png)

