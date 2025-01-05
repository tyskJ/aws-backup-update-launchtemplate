# ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform data.tf data                                                                                  ║
# ╠═══════════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ ec2_trust_policy      │ aws_iam_policy_document           │ Trust policy for EC2.                                                               ║
# ║ lambda_trust_policy   │ aws_iam_policy_document           │ Trust policy for Lambda.                                                            ║
# ║ backup_trust_policy   │ aws_iam_policy_document           │ Trust policy for AWS Backup.                                                        ║
# ║ ltupdate_statement    │ aws_iam_policy_document           │ IAM Policy Statement for launchtemplate update.                                     ║
# ╚═══════════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

data "aws_iam_policy_document" "ec2_trust_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "lambda_trust_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "backup_trust_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["backup.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "ltupdate_statement" {
  statement {
    sid = "AllowLaunchTemplateUpdate"
    actions = [
      "ec2:DescribeImages",
      "ec2:DescribeLaunchTemplates",
      "ec2:DescribeLaunchTemplateVersions",
      "ec2:ModifyLaunchTemplate",
      "ec2:DeleteLaunchTemplateVersions",
      "ec2:CreateLaunchTemplateVersion",
    ]
    resources = ["*"]
  }
}
