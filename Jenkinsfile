pipeline {
    agent any

    tools {
        nodejs 'NodeJS_22' // Ensure this matches the name you configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/alokrajhans/City-Central-Library.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies in both server and client directories
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Run build script from package.json
                    bat 'npm run build'
                }
            }
        }
        stage('Debug') {
    steps {
        script {
            bat 'dir'
        }
    }
}


        stage('Test') {
            steps {
                echo 'No tests specified.'
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY')]) {
                        bat '''
                        curl -X POST https://api.render.com/v1/services/srv-cqvol58gph6c7390aha0/deploys ^
                        -H "Authorization: Bearer %RENDER_API_KEY%" ^
                        -H "Content-Type: application/json"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
