    pipeline {
      agent any

      tools {
        maven "3.6.0" // You need to add a maven with name "3.6.0" in the Global Tools Configuration page
        nodejs "14.15.0"

      }

      stages {
        stage(" UNIT TEST") {
          steps {

            echo 'test unitaire'

          }
        }
        stage("Installing dependencies") {
          steps {
           sh " cd  guru-webapp && ls  && npm install "
            sh "mvn clean install"
          }
        }
        stage("deploy ") {
          steps {
            sh 'echo " stop and remove old  container ranning   "'

             sh '''  docker ps -a | grep "frontcontainer*" | awk '{print $1}' | xargs docker rm -f ; '''

              sh 'echo " start Clearing old docker images "'
              sh ''' docker images -a   | grep 'appfront' | awk '{print $1":"$2}' | xargs docker rmi -f ;'''

             
              sh 'echo " build new images with number of build   "'
              sh "cd /var/lib/jenkins/workspace/front && docker build -t appfront:latest$BUILD_NUMBER .  " 
 
 
                  sh 'echo " run container with new build image   "'
                  sh 'docker run --name=frontcontainer -d -p 6666:6666 appfront:latest$BUILD_NUMBER '



          }

        }
        
       
       }
       post {
        always {
            cleanWs()
        }
    }


    }

