# ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform main.tf module                                                                          ║
# ╠═════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ nw              │ ./modules/vpc_subnet              │ invoke network module.                                                              ║
# ║ iam             │ ./modules/iam                     │ invoke iam module.                                                                  ║
# ║ kms             │ ./modules/kms                     │ invoke kms module.                                                                  ║
# ║ backup          │ ./modules/awsbackup               │ invoke awsbackup module.                                                            ║
# ║ ec2             │ ./modules/ec2                     │ invoke ec2 module.                                                                  ║
# ║ observe         │ ./modules/lambda_eventbridge      │ invoke observe module.                                                              ║
# ╚═════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

module "nw" {
  source = "../modules/vpc_subnet"

  vpc_map    = { "name" = "${local.env}-vpc", "cidr" = "10.0.0.0/16", "dnshost" = "true", "dnssupport" = "true" }
  subnet_map = { "name" = "${local.env}-private-subnet", "cidr" = "10.0.0.0/24", "az_name" = "ap-northeast-1a" }
}

module "iam" {
  source = "../modules/iam"

  ec2_role_name        = "${local.env}-ec2-role"
  lambda_role_name     = "${local.env}-lambda-role"
  backup_role_name     = "${local.env}-backup-role"
  ltupdate_policy_name = "${local.env}-ltupdate-policy"
}

module "kms" {
  source = "../modules/kms"

  ec2_cmk_name    = "${local.env}-ec2-cmk"
  backup_cmk_name = "${local.env}-backup-cmk"
}

module "backup" {
  source = "../modules/awsbackup"

  bkvault_name = "${local.env}-bkvault"
  kms_key_arn  = module.kms.backup_kms_key_arn
}

module "ec2" {
  source = "../modules/ec2"

  private_key_file_name     = local.private_key_file
  key_name                  = local.keypair_name
  securitygroup_name        = "${local.env}-ec2-sg"
  vpc_id                    = module.nw.vpc_id
  subnet_id                 = module.nw.subnet_id
  kms_key_id                = module.kms.ec2_kms_key_id
  ec2_instance_profile_name = module.iam.ec2_instance_profile_name
  ec2_map                   = { "name" = "${local.env}-ec2", "instancetype" = "t2.micro", "volname" = "${local.env}-ebs-root", "volumesize" = "30" }
  lt_name                   = "${local.env}-lt"
}

module "observe" {
  source = "../modules/lambda_eventbridge"

  lambda_role_arn = module.iam.lambda_role_arn
}
