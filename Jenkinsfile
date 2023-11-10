pipeline {
    agent any
    environment {
        VERSION = "latest"
        DOCKERHUB_REPOSITORY_BACK = "ynwoo/tunemate-meeting"
        DOCKERHUB_CREDENTIAL = credentials('dockerhub-ynwoo')
        CONTAINER_NAME_BACK = "meeting"
        SSH_CONNECTION = "ubuntu@k9a603.p.ssafy.io"
        ENV_DIR = "./config/meeting.env"
        PORT_BACK = "8085"
    }
    stages {
        stage('Build Meeting Backend') {
            steps {
                dir('tunemate-meeting-service') {
                    sh "chmod +x gradlew"
                    sh "./gradlew clean compileJava bootJar"
               }
            }
        }
        stage("Build Images") {
            steps {
                sh "docker compose build"
            }

        }
        stage('Push Images'){
            steps {
                sh "echo $DOCKERHUB_CREDENTIAL_PSW | docker login -u $DOCKERHUB_CREDENTIAL_USR --password-stdin"
                sh "docker push $DOCKERHUB_REPOSITORY_BACK:$VERSION"
            }
        }
        stage('Deploy Backend Server') {
            steps {
                sshagent(credentials: ['pemKey']) {
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rm -f $CONTAINER_NAME_BACK'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker rmi -f $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker pull $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'echo y | docker image prune'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker images'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker run -d --name $CONTAINER_NAME_BACK --env-file $ENV_DIR -p $PORT_BACK:8085 $DOCKERHUB_REPOSITORY_BACK:$VERSION'"
                    sh "ssh -o StrictHostKeyChecking=no $SSH_CONNECTION 'docker ps'"
                }
            }
        }
    }
}
