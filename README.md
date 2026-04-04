

# Automated CI/CD Pipeline for a Full-Stack App on AWS

I just built my first automated CI/CD pipeline with AWS and wanted to share how it came together. 😎

## What I Did

- **Dockerized my full-stack app**: Built container images for both frontend and backend, and tested everything locally before moving to the cloud.
- **Infrastructure as Code with Terraform**: Instead of clicking through the AWS console, I wrote infrastructure as code to provision everything (networking, EC2, IAM, ECR, etc).
- **Pushed Docker images to Amazon ECR**: Used ECR as a private registry so my server can always pull the latest images.
- **Deployed on EC2 with k3s (Kubernetes)**: Installed k3s (lightweight Kubernetes) on a t3.small EC2 instance to manage containers and handle auto-restarts.
- **Automated with GitHub Actions**: Every push to the main branch:
   - Builds images
   - Pushes to ECR
   - Connects to EC2
   - Restarts Kubernetes pods automatically

⚡ **Result:** Full deployment in minutes with just a git push.

If you're getting into DevOps, I’d recommend building something like this yourself. That’s what made everything click for me.

---

## Hashtags

#DevOps #CICD #Docker #Kubernetes #Terraform #AWS #GitHubActions #CloudComputing



## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [DevOps & CI/CD Pipeline](#devops--cicd-pipeline)
- [Technologies Used](#technologies-used)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Docker & Compose Usage](#docker--compose-usage)
- [Features](#features)
- [Screenshots](#screenshots)




## Project Overview
This repository contains a sample full-stack application (frontend and backend) that demonstrates a complete DevOps workflow:

- Dockerized services
- Infrastructure as Code (Terraform)
- Private container registry (ECR)
- Kubernetes orchestration (k3s)
- Automated CI/CD (GitHub Actions)


## Architecture
```
┌─────────────┐      ┌─────────────┐
│  Frontend   │<---> │  Backend    │
└─────────────┘      └─────────────┘
   │                  │
   └─────►  Database  ◄───────┘
```

All services are containerized and orchestrated with Kubernetes (k3s) on AWS EC2. Infrastructure is provisioned with Terraform. CI/CD is handled by GitHub Actions.


## DevOps & CI/CD Pipeline
This project demonstrates:

- **Docker**: Containerization of all services
- **Terraform**: Infrastructure as Code for AWS resources
- **Amazon ECR**: Private Docker image registry
- **Kubernetes (k3s)**: Lightweight cluster on EC2 for orchestration
- **GitHub Actions**: Automated build, push, and deployment pipeline

### Pipeline Flow
1. **Build**: Build Docker images for frontend and backend
2. **Push**: Push images to Amazon ECR
3. **Deploy**: Connect to EC2, update Kubernetes manifests, and restart pods
4. **Provision**: Use Terraform to create AWS infrastructure

> **Note:** You can adapt the pipeline to your preferred CI/CD platform or cloud provider.




## Getting Started (Local Development)

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <project-folder>
   ```
2. **Copy environment files:**
   - Place your `.env` files in the appropriate directories.
3. **Start with Docker Compose (optional for local):**
   ```sh
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

> **Tip:** You do NOT need to install Node.js or MongoDB locally—everything runs in containers.



## Technologies Used
- **Frontend:** Modern JavaScript framework (e.g., React, Vue, Angular)
- **Backend:** Node.js/Express or similar
- **Database:** MongoDB or other
- **DevOps:** Docker, Docker Compose, Terraform, GitHub Actions, AWS (ECR, EC2), Kubernetes (k3s)



## Features
- Full-stack app with frontend and backend
- Containerized deployment (Docker)
- Infrastructure as Code (Terraform)
- Private image registry (ECR)
- Kubernetes orchestration (k3s)
- Automated CI/CD pipeline (GitHub Actions)


## Screenshots

<!-- Add your screenshots here to showcase the app and pipeline results -->
---


## Contact
For any queries or contributions, please open an issue or pull request.

