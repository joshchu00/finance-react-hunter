node {

  docker.withTool('docker-latest') {

    def image

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
      image = docker.build('joshchu00/finance-react-hunter')
    }
    stage('Docker Push') {
      docker.withRegistry('', 'DockerHub') {
        image.push()
      }
    }
  }
}
