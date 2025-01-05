# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform variables.tf variable                                                                          ║
# ╠════════════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ private_key_file_name  │ string                            │ SSH public key file name.                                                           ║
# ║ key_name               │ string                            │ KeyPair name.                                                                       ║
# ║ securitygroup_name     │ string                            │ Security Group name.                                                                ║
# ║ vpc_id                 │ string                            │ VPC ID.                                                                             ║
# ║ subnet_id              │ string                            │ Subnet ID.                                                                          ║
# ║ kms_key_id             │ string                            │ KMS key ID.                                                                         ║
# ║ instanceprofile_name   │ string                            │ EC2 instance profile name.                                                          ║
# ║ ec2_map                │ map(string)                       │ ec2 instance settings.                                                              ║
# ║ lt_name                │ string                            │ launch template name.                                                               ║
# ╚════════════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

variable "private_key_file_name" {
  type        = string
  description = "SSH private key file name."
}

variable "key_name" {
  type        = string
  description = "KeyPair name."
}

variable "securitygroup_name" {
  type        = string
  description = "Security Group name."
}

variable "vpc_id" {
  type        = string
  description = "VPC ID."
}

variable "subnet_id" {
  type        = string
  description = "Subnet ID."
}

variable "kms_key_id" {
  type        = string
  description = "KMS key ID."
}

variable "ec2_instance_profile_name" {
  type        = string
  description = "EC2 instance profile name."
}

variable "ec2_map" {
  type        = map(string)
  description = "ec2 instance settings."
}

variable "lt_name" {
  type        = string
  description = "Launch Template name."
}
