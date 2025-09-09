pipeline {
    agent any

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Testss') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
