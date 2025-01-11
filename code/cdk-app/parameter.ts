/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit parameter.ts                                                               ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This file that defines the parameters for each resource.                                                                                 ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ type (Define your own type)                                                                                                               ║
╠═════════════════╤═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ vpcInfo         │ Type defined L1 Construct vpc configuration information.                                                                ║
║ subnetInfo      │ Type defined L1 Construct subnet configuration information.                                                             ║
║ kmsInfo         │ Type defined L2 Construct KMS information.                                                                              ║
║ iamPolicyInfo   │ Type defined L2 Construct IAM Managed Policy information.                                                               ║
║ iamRoleInfo     │ Type defined L2 Construct IAM Role information.                                                                         ║
║ bkvaultInfo     │ Type defined L2 Construct AWS Backup Vault information.                                                                 ║
╚═════════════════╧═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
export type vpcInfo = {
  id: string;
  cidrBlock: string;
  dnsHost: boolean;
  dnsSupport: boolean;
  tags: { key: string; value: string }[];
};

export type subnetInfo = {
  id: string;
  name: string;
  cidrBlock: string;
  availabilityZone: string;
  tags: { key: string; value: string }[];
};

export type kmsInfo = {
  id: string;
  alias: string;
  description: string;
  keyRotation: boolean;
  pendingWindow: number;
  tags: { key: string; value: string }[];
};

export type iamPolicyInfo = {
  id: string;
  policyName: string;
  description: string;
  jsonFileName: string;
};

export type iamRoleInfo = {
  id: string;
  roleName: string;
  assumed: string;
  description: string;
  customManagedPolicyAdd: boolean;
  awsManagedPolicyAdd: boolean;
  awsManagedPolicyName?: { policyName: string }[];
  tags: { key: string; value: string }[];
};

export type bkvaultInfo = {
  id: string;
  name: string;
  removalPolicy: boolean;
  tags: { key: string; value: string }[];
};

/*
╔════════════════════════════════════════════════════════════════╗
║ Interface Parameter                                            ║
╚════════════════════════════════════════════════════════════════╝
*/
export interface Parameter {
  AppName: string;
  vpc: vpcInfo;
  subnet: subnetInfo;
  ebsCmk: kmsInfo;
  backupCmk: kmsInfo;
  ltupdatePolicy: iamPolicyInfo;
  lambdaRole: iamRoleInfo;
  backupRole: iamRoleInfo;
  ec2Role: iamRoleInfo;
  bkVault: bkvaultInfo;
}

/*
╔════════════════════════════════════════════════════════════════╗
║ devParameter                                                   ║
╠═════════════════╤══════════════════════════════════════════════╣
║ AppName         │ common tag value.                            ║
║ vpc             │ VPC.                                         ║
║ subnet          │ Private Subnet.                              ║
║ ebsCmk          │ CMK for EBS.                                 ║
║ backupCmk       │ CMK for AWS Backup.                          ║
║ ltupdatePolicy  │ ltUpdate IAM Policy.                         ║
║ lambdaRole      │ Lambda IAM Role.                             ║
║ backupRole      │ AWS Backup IAM Role.                         ║
║ ec2Role         │ EC2 IAM Role.                                ║
║ bkVault         │ AWS Backup Vault.                            ║
╚═════════════════╧══════════════════════════════════════════════╝
*/
export const devParameter: Parameter = {
  AppName: "ep01",

  vpc: {
    id: "Vpc",
    cidrBlock: "10.0.0.0/16",
    dnsHost: true,
    dnsSupport: true,
    tags: [{ key: "Name", value: "ep01-vpc" }],
  },

  subnet: {
    id: "PrivateSubnetA",
    name: "ep01-subnet",
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "ap-northeast-1a",
    tags: [{ key: "Name", value: "ep01-subnet" }],
  },

  ebsCmk: {
    id: "EbsCmk",
    alias: "alias/ebs-cmk",
    description: "CMK for EBS",
    keyRotation: true,
    pendingWindow: 7,
    tags: [{ key: "Name", value: "ep01-ebs-cmk" }],
  },

  backupCmk: {
    id: "BackupCmk",
    alias: "alias/backup-cmk",
    description: "CMK for AWS Backup",
    keyRotation: true,
    pendingWindow: 7,
    tags: [{ key: "Name", value: "ep01-backup-cmk" }],
  },

  ltupdatePolicy: {
    id: "LtupdatePolicy",
    policyName: "ep01-iam-policy-ltupdate",
    description: "ltUpdate IAM Policy",
    jsonFileName: "iam-policy-ltupdate.json",
  },

  lambdaRole: {
    id: "LambdaRole",
    roleName: "ep01-iam-role-lambda",
    assumed: "lambda.amazonaws.com",
    description: "Lambda Role",
    customManagedPolicyAdd: true,
    awsManagedPolicyAdd: true,
    awsManagedPolicyName: [
      {
        policyName: "service-role/AWSLambdaBasicExecutionRole",
      },
    ],
    tags: [{ key: "Name", value: "ep01-iam-role-lambda" }],
  },

  backupRole: {
    id: "BackupRole",
    roleName: "ep01-iam-role-backup",
    assumed: "backup.amazonaws.com",
    description: "AWS Backup Role",
    customManagedPolicyAdd: false,
    awsManagedPolicyAdd: true,
    awsManagedPolicyName: [
      {
        policyName: "service-role/AWSBackupServiceRolePolicyForBackup",
      },
      {
        policyName: "service-role/AWSBackupServiceRolePolicyForRestores",
      },
    ],
    tags: [{ key: "Name", value: "ep01-iam-role-backup" }],
  },

  ec2Role: {
    id: "EC2Role",
    roleName: "ep01-iam-role-ec2",
    assumed: "ec2.amazonaws.com",
    description: "EC2 Role",
    customManagedPolicyAdd: false,
    awsManagedPolicyAdd: false,
    tags: [{ key: "Name", value: "ep01-iam-role-ec2" }],
  },

  bkVault: {
    id: "BkVault",
    name: "ep01-bkvault",
    removalPolicy: true,
    tags: [{ key: "Name", value: "ep01-bkvault" }],
  },
};
