# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.01 Launch Template Update Solution - Terraform locals.tf locals                                           ║
# ╠══════════════════════════╤═══════════════════════════════════════════════════════════════════════════════════╣
# ║ env                      │ Environment value.                                                                ║
# ║ keypair_name             │ KeyPair name.                                                                     ║
# ║ private_key_file         │ Private key file full path.                                                       ║
# ╚══════════════════════════╧═══════════════════════════════════════════════════════════════════════════════════╝

locals {
  env              = "ep01"
  keypair_name     = "${local.env}-keypair"
  private_key_file = "./.keypair/${local.keypair_name}.pem"
}
