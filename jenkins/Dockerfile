# Use Jenkins LTS image as the base
FROM jenkins/jenkins:lts

# Switch to root user to perform installations and configurations
USER root

# Set environment variables for Jenkins user and password
ENV JENKINS_USER admin
ENV JENKINS_PASS Raymond

# Generate SSH keys (id_rsa.pub file will be saved at /root/.ssh/)
RUN ssh-keygen -f /root/.ssh/id_rsa -t rsa -N ''

# Skip Jenkins setup wizard
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

# Copy the default user groovy script for Jenkins setup
COPY default-user.groovy /usr/share/jenkins/ref/init.groovy.d/

# Define volume for Jenkins data
VOLUME /var/jenkins_home 

# Switch to root to install packages
USER root

# Install necessary packages
RUN apt-get update && apt-get install -y apt-transport-https \
   ca-certificates curl gnupg2 \
   software-properties-common

# Add Docker's official GPG key
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -

# Add Docker repository
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) stable"

# Install Docker CLI
RUN apt-get update && apt-get install -y docker-ce-cli

# Install Git
RUN apt-get install -y git

# Create the docker group and add the jenkins user to it
RUN groupadd docker 
RUN usermod -aG docker jenkins

