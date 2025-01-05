# ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform main.tf module                                                                          ║
# ╠═════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ nw              │ ./modules/vpc_subnet              │ invoke network module.                                                              ║
# ║ iam             │ ./modules/iam                     │ invoke iam module.                                                                  ║
# ║ kms             │ ./modules/kms                     │ invoke kms module.                                                                  ║
# ╚═════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

module "nw" {
  source = "../modules/vpc_subnet"

  vpc_map    = { "name" = "${local.env}-vpc", "cidr" = "10.0.0.0/16", "dnshost" = "true", "dnssupport" = "true" }
  subnet_map = { "name" = "${local.env}-private-subnet", "cidr" = "10.0.0.0/24", "az_name" = "ap-northeast-1a" }
}

module "iam" {
  source = "../modules/iam"

  ec2_role_name = "${local.env}-ec2-role"
  lambda_role_name = "${local.env}-lambda-role"
  backup_role_name = "${local.env}-backup-role"
  ltupdate_policy_name = "${local.env}-ltupdate-policy"
}

module "kms" {
  source = "../modules/kms"

  ec2_cmk_name = "${local.env}-ec2-cmk"
  backup_cmk_name = "${local.env}-backup-cmk"
}
