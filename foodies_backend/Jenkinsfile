pipeline {
    agent { label 'Pipeline' }

    environment {
        IMAGE_NAME = "khaddy08/foodies_backend"
        CONTAINER_NAME = "foodies_backend"
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/KhaddyX/food-delivery-backend.git', branch: 'main'
            }
        }

        stage('Docker Version') {
            steps {
                bat 'docker version'
            }
        }

        stage('Unit Test') {
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

        stage('Build Jar') {
            steps {
                dir('foodies_backend') {
                    bat 'mvnw.cmd clean package -DskipTests'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('foodies_backend') {
                    bat "docker build -t khaddy08/foodies_backend ."
                }
            }
        }
//         stage('Docker Login') {
//             steps {
//                 bat 'docker login -u khaddy08 -p Khaddy2$'
//             }
//         }

stage('Docker Push') {
    steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
            bat "docker push khaddy08/foodies_backend"
        }
    }
}

stage('Docker Run') {
    steps {
        bat """
        docker rm -f foodies_backend || exit 0
        docker run -d -p 9090:9090 khaddy08/foodies_backend

        """
    }
}
    }
}