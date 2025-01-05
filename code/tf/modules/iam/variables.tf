# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform variables.tf variable                                                                           ║
# ╠════════════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ ec2_role_name          │ string                            │ EC2 IAM Role name.                                                                  ║
# ║ lambda_role_name       │ string                            │ Lambda IAM Role name.                                                               ║
# ║ backup_role_name       │ string                            │ Backup IAM Role name.                                                               ║
# ║ ltupdate_policy_name   │ string                            │ ltupdate IAM Policy name.                                                           ║
# ╚════════════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

variable "ec2_role_name" {
  type        = string
  description = "EC2 IAM Role name."
}

variable "lambda_role_name" {
  type        = string
  description = "Lambda IAM Role name."
}

variable "backup_role_name" {
  type        = string
  description = "Backup IAM Role name."
}

variable "ltupdate_policy_name" {
  type        = string
  description = "ltupdate IAM Policy name."
}
