pipeline {
    agent { label 'Pipeline' }

    environment {
        DOCKER_HUB_USER = 'khaddy08'
        BACKEND_IMAGE   = "${DOCKER_HUB_USER}/foodies_backend"
        FRONTEND_IMAGE  = "${DOCKER_HUB_USER}/foodies-frontend"
        ADMIN_IMAGE     = "${DOCKER_HUB_USER}/adminpanel"
        APP_PORT        = '9090'
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/KhaddyX/Food_Delivery_Project.git', branch: 'main'
            }
        }

        stage('Verify Docker') {
            steps {
                bat 'docker version'
            }
        }

        stage('Unit Tests') {
            steps {
                dir('foodies_backend') {
                    bat 'mvnw.cmd test'
                }
            }
        }

        stage('Code Coverage') {
            steps {
                dir('foodies_backend') {
                    bat 'mvnw.cmd clean verify'
                }
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'foodies_backend/target/site/jacoco',
                    reportFiles: 'index.html',
                    reportName: 'JaCoCo Report'
                ])
            }
        }

        stage('Static Code Analysis') {
            steps {
                dir('foodies_backend') {
                    bat 'mvnw.cmd checkstyle:checkstyle'
                }
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'foodies_backend/target/site',
                    reportFiles: 'checkstyle.html',
                    reportName: 'Checkstyle Report'
                ])
            }
        }

        stage('Build Backend JAR') {
            steps {
                dir('foodies_backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat "docker build -t ${BACKEND_IMAGE}:latest foodies_backend"
                    bat "docker build -t ${FRONTEND_IMAGE}:latest foodies-frontend/foodies"
                    bat "docker build -t ${ADMIN_IMAGE}:latest foodies-frontend/admin"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )]) {

                        bat "docker login -u %DOCKER_USER% -p %DOCKER_TOKEN%"

                        bat "docker push ${BACKEND_IMAGE}:latest"
                        bat "docker push ${FRONTEND_IMAGE}:latest"
                        bat "docker push ${ADMIN_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                bat """
                docker compose down
                docker compose pull
                docker compose up -d
                """
            }
        }
    }
}