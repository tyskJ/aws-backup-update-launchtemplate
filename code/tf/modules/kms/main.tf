# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform main.tf resource                                                                              ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ ec2_cmk                 │ aws_kms_key                       │ EC2 CMK.                                                                           ║
# ║ backup_cmk              │ aws_kms_key                       │ AWS Backup CMK.                                                                    ║
# ║ ec2_cmk_alias           │ aws_kms_alias                     │ EC2 CMK Alias.                                                                     ║
# ║ backup_cmk_alias        │ aws_kms_alias                     │ AWS Backup CMK Alias.                                                              ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

resource "aws_kms_key" "ec2_cmk" {
  description             = "EC2 CMK"
  enable_key_rotation     = true
  deletion_window_in_days = 7
  tags = {
    Name = var.ec2_cmk_name
  }
}

resource "aws_kms_key" "backup_cmk" {
  description             = "AWS Backup CMK"
  enable_key_rotation     = true
  deletion_window_in_days = 7
  tags = {
    Name = var.backup_cmk_name
  }
}

resource "aws_kms_alias" "ec2_cmk_alias" {
  name          = "alias/${var.ec2_cmk_name}"
  target_key_id = aws_kms_key.ec2_cmk.key_id
}

resource "aws_kms_alias" "backup_cmk_alias" {
  name          = "alias/${var.backup_cmk_name}"
  target_key_id = aws_kms_key.backup_cmk.key_id
}
