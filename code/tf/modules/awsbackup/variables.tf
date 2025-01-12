# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform variables.tf variable                                                                           ║
# ╠════════════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ bkvault_name           │ string                            │ AWS Backup Vault name.                                                              ║
# ║ kms_key_arn            │ string                            │ KMS Key Arn for AWS Backup Vault.                                                   ║
# ╚════════════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

variable "bkvault_name" {
  type        = string
  description = "AWS Backup Vault name."
}

variable "kms_key_arn" {
  type        = string
  description = "KMS Key Arn for AWS Backup Vault."
}
