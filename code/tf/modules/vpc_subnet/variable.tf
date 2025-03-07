# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform variable.tf variable                                                                          ║
# ╠═════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════════════╣
# ║ vpc_map         │ map(string)                       │ VPC settings map.                                                                          ║
# ║ subnet_map      │ map(string)                       │ Subnet settings map.                                                                       ║
# ╚═════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════════════╝

variable "vpc_map" {
  type        = map(string)
  description = "VPC settings map."
}

variable "subnet_map" {
  type        = map(string)
  description = "Subnet settings map."
}
