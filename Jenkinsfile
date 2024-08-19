pipeline {
    agent any

    tools {
        nodejs 'NodeJS_22' // Ensure this matches the name you configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/alokrajhans/City-Central-Library.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies for server
                    dir('server') {
                        bat 'npm install'
                    }

                    // Install dependencies for client
                    dir('client') {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the client application
                    dir('client') {
                        bat 'npm run build'
                    }
                }
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
