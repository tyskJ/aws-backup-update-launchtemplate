# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform variable.tf variable                                                                          ║
# ╠════════════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ ec2_cmk_name           │ string                            │ EC2 CMK name.                                                                       ║
# ║ backup_cmk_name        │ string                            │ AWS Backup CMK name.                                                                ║
# ╚════════════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

variable "ec2_cmk_name" {
  type        = string
  description = "EC2 CMK name."
}

variable "backup_cmk_name" {
  type        = string
  description = "AWS Backup CMK name."
}
