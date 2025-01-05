# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform outputs.tf output                                                                      ║
# ╠═════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
# ║ ec2_instance_profile_name   │ EC2 instance profile name.                                                                                 ║
# ║ lambda_role_arn             │ Lambda IAM Role Arn.                                                                                       ║
# ╚═════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

output "ec2_instance_profile_name" {
  value = aws_iam_instance_profile.ec2_instance_profile.name
  description = "EC2 instance profile name."
}

output "lambda_role_arn" {
  value = aws_iam_role.lambda_role.arn
  description = "Lambda IAM Role Arn."
}
