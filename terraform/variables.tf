# Which AWS region to create everything in
variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "us-east-1"   # N. Virginia
}

# Ubuntu 22.04 AMI ID for us-east-1 region
# Different region = different AMI ID
variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID for us-east-1"
  default     = "ami-0c7217cdde317cfec"
}

# The name of your AWS key pair for SSH access
variable "key_name" {
  description = "Name of your AWS key pair for SSH access"
  default     = "ecommerce-key"
}