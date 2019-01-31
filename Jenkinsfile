node {

  docker.withTool('docker-latest') {

    def hunterImage

    stage('Git Pull') {
      git url: 'https://github.com/joshchu00/finance-react-hunter.git', branch: 'develop'
    }
    stage('Build') {
      docker.image(params.NODE_IMAGE).inside {
        sh 'yarn'
        sh 'yarn build'
      }
    }    
    stage('Docker Build') {
      hunterImage = docker.build('docker.io/joshchu00/finance-react-hunter')
    }
    stage('Docker Push') {
      docker.withRegistry('', 'DockerHub') {
        hunterImage.push()
      }
    }
  }
}
