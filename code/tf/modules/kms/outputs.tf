# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform outputs.tf output                                                                      ║
# ╠═════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
# ║ backup_kms_key_arn          │ KMS Key Arn for backup kms key.                                                                            ║
# ║ ec2_kms_key_id              │ KMS Key Id for EC2 kms key.                                                                                ║
# ╚═════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

output "backup_kms_key_arn" {
  value       = aws_kms_key.backup_cmk.arn
  description = "KMS Key Arn for backup kms key."
}

output "ec2_kms_key_id" {
  value       = aws_kms_key.ec2_cmk.key_id
  description = "KMS Key Id for EC2 kms key."
}
