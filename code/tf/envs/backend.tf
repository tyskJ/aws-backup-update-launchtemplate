terraform {
  backend "s3" {
    bucket  = "ep01-tf-2025"
    key     = "tfstate/terraform.tfstate"
    profile = "admin"
    region  = "ap-northeast-1"
  }
}
