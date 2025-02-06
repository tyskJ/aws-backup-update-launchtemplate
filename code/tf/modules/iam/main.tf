# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform main.tf resource                                                                              ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ ltupdate_policy         │ aws_iam_policy                    │ IAM policy for Launch Template Update.                                             ║
# ║ ec2_role                │ aws_iam_role                      │ IAM role for EC2.                                                                  ║
# ║ lambda_role             │ aws_iam_role                      │ IAM role for Lambda.                                                               ║
# ║ backup_role             │ aws_iam_role                      │ IAM role for Backup.                                                               ║
# ║ lambda_cwlogs_attach    │ aws_iam_role_policy_attachment    │ Attach cwlogs policy attach to Lambda role.                                        ║
# ║ lambda_ltupdate_attach  │ aws_iam_role_policy_attachment    │ Attach ltupdate policy attach to Lambda role.                                      ║
# ║ backup_backup_attach    │ aws_iam_role_policy_attachment    │ Attach backup policy attach to Backup role.                                        ║
# ║ backup_restore_attach   │ aws_iam_role_policy_attachment    │ Attach restore policy attach to Backup role.                                       ║
# ║ ec2_instance_profile    │ aws_iam_instance_profile          │ EC2 instance profile.                                                              ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

resource "aws_iam_policy" "ltupdate_policy" {
  name        = var.ltupdate_policy_name
  description = "launch template update policy."
  policy      = data.aws_iam_policy_document.ltupdate_statement.json
  tags = {
    Name = var.ltupdate_policy_name
  }
}

resource "aws_iam_role" "ec2_role" {
  name               = var.ec2_role_name
  description        = "EC2 role."
  assume_role_policy = data.aws_iam_policy_document.ec2_trust_policy.json
  tags = {
    Name = var.ec2_role_name
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = var.lambda_role_name
  description        = "Lambda role."
  assume_role_policy = data.aws_iam_policy_document.lambda_trust_policy.json
  tags = {
    Name = var.lambda_role_name
  }
}

resource "aws_iam_role" "backup_role" {
  name               = var.backup_role_name
  description        = "Backup role."
  assume_role_policy = data.aws_iam_policy_document.backup_trust_policy.json
  tags = {
    Name = var.backup_role_name
  }
}

resource "aws_iam_role_policy_attachment" "lambda_cwlogs_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_ltupdate_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.ltupdate_policy.arn
}

resource "aws_iam_role_policy_attachment" "backup_backup_attach" {
  role       = aws_iam_role.backup_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBackupServiceRolePolicyForBackup"
}

resource "aws_iam_role_policy_attachment" "backup_restore_attach" {
  role       = aws_iam_role.backup_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBackupServiceRolePolicyForRestores"
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = aws_iam_role.ec2_role.name
  role = aws_iam_role.ec2_role.name
}
