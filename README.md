# E-Commerce Platform with Automated CI/CD Pipeline (AWS)

This repository demonstrates a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js), fully containerized and deployed using a modern DevOps workflow on AWS. The project highlights best practices in CI/CD, infrastructure as code, and cloud-native deployment.



## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [DevOps & CI/CD Pipeline](#devops--cicd-pipeline)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Screenshots](#screenshots)
- [Contact](#contact)



## Features
- User authentication (login, signup)
- Admin product management (add, edit, remove)
- Shopping cart
- Responsive UI with React & Redux
- RESTful API with Node.js & Express
- MongoDB for data persistence
- Automated CI/CD pipeline (GitHub Actions)
- Infrastructure as Code (Terraform)
- Containerized deployment (Docker, k3s)



## Technologies
- **Frontend:** React, Redux, React-Bootstrap, Axios
- **Backend:** Node.js, Express, Mongoose, JWT
- **Database:** MongoDB
- **DevOps:** Docker, Docker Compose, Terraform, GitHub Actions, AWS (ECR, EC2), Kubernetes (k3s)


## DevOps & CI/CD Pipeline

This project implements a complete CI/CD pipeline and cloud-native deployment:

1. **Dockerization:** Both frontend and backend are containerized. Local testing is performed with Docker Compose.
2. **Infrastructure as Code:** AWS resources (ECR, EC2, IAM, networking) are provisioned using Terraform.
3. **Image Registry:** Docker images are pushed to Amazon ECR (private registry).
4. **Kubernetes Orchestration:** Deployed on a t3.small EC2 instance running k3s (lightweight Kubernetes).
5. **CI/CD Automation:** GitHub Actions automates the workflow:
  - On every push to `main`:
    - Builds Docker images
    - Pushes images to ECR
    - Connects to EC2
    - Restarts Kubernetes pods

**Result:** Full deployment in minutes with a single git push.

> If you're getting into DevOps, building a project like this is highly recommended.

---

`#DevOps #CICD #Docker #Kubernetes #Terraform #AWS #GitHubActions #CloudComputing`


## Prerequisites
- [VS Code](https://code.visualstudio.com/download) or any text editor
- [Docker](https://www.docker.com/get-started)
- [Node.js & npm](https://www.npmjs.com/get-npm)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local dev)


## Local Development

1. **Clone the repository:**
  ```sh
  git clone <your-repo-url>
  cd E-commerce
  ```
2. **Copy environment files:**
  - Place your `.env` files in the appropriate directories (see backend/ for example).
3. **Start with Docker Compose:**
  ```sh
  docker-compose up --build
  ```
  - Frontend: http://localhost:3000
  - Backend: http://localhost:5000

> You do NOT need to install Node.js or MongoDB locally—everything runs in containers.


## Screenshots

### Home Page
![Main](Screenshots/main.png)

### Product Details Page
![Product Details](Screenshots/product-details.png)

### Cart
![Cart](Screenshots/cart.png)

### Register
![Register](Screenshots/register.png)

### Sign-In
![SignIn](Screenshots/signin.png)

### Shipping Screen
![Shipping](Screenshots/shipping.png)

### Payment Screen
![Payment](Screenshots/payment.png)

### Place Order Screen
![Place Order](Screenshots/placeorder.png)

### Admin - View Products
![Admin View Products](Screenshots/admin-products.png)

### Admin - Add Products
![Admin Add products](Screenshots/add-product.png)

---

## Contact
For any queries or contributions, please open an issue or pull request.

