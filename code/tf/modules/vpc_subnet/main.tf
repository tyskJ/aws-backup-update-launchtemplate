# ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform main.tf resource                                                                        ║
# ╠═════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
# ║ vpc             │ aws_vpc                           │ VPC.                                                                                ║
# ║ subnet          │ aws_subnet                        │ Subnet.                                                                             ║
# ╚═════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝

resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_map.cidr
  enable_dns_hostnames = var.vpc_map.dnshost
  enable_dns_support   = var.vpc_map.dnssupport
  tags = {
    Name = var.vpc_map.name
  }
}

resource "aws_subnet" "subnet" {
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = var.subnet_map.cidr
  availability_zone = var.subnet_map.az_name
  tags = {
    Name = var.subnet_map.name
  }
}
