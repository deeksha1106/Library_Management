pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Ensure you have NodeJS installed in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/alokrajhans/City-Central-Library.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                script {
            withCredentials([string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY')]) {
                sh '''
                curl -X POST https://api.render.com/v1/services/srv-cqvol58gph6c7390aha0/deploys \
                -H "Authorization: Bearer ${RENDER_API_KEY}" \
                -H "Content-Type: application/json"
                '''
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