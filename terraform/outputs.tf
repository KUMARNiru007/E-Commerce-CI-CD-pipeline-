# Outputs are values Terraform prints after it finishes creating
# your infrastructure. Think of it like a summary at the end.
# This will print your server's public IP so you know where to access it.

output "server_public_ip" {
  description = "Public IP of your EC2 server"
  value       = aws_instance.ecommerce_server.public_ip
}

output "server_public_dns" {
  description = "Public DNS of your EC2 server"
  value       = aws_instance.ecommerce_server.public_dns
}
