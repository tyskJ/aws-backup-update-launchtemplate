/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit parameter.ts                                                                        ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This file that defines the parameters for each resource.                                                                                           ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ type (Define your own type)                                                                                                                        ║
╠═════════════════╤══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ vpcInfo         │ Type defined L1 Construct vpc configuration information.                                                                         ║
║ subnetInfo      │ Type defined L1 Construct subnet configuration information.                                                                      ║
║ kmsInfo         │ Type defined L2 Construct KMS information.                                                                                       ║
║ iamPolicyInfo   │ Type defined L2 Construct IAM Managed Policy information.                                                                        ║
║ iamRoleInfo     │ Type defined L2 Construct IAM Role information.                                                                                  ║
║ bkvaultInfo     │ Type defined L2 Construct AWS Backup Vault information.                                                                          ║
║ logsInfo        │ Type defined L1 Construct CloudWatch Logs LogGroup.                                                                              ║
║ lambdaInfo      │ Type defined L2 Construct Lambda Function.                                                                                       ║
║ ruleInfo        │ Type defined L2 Construct EventBridge Rule.                                                                                      ║
║ keypairInfo     │ Type defined L1 Construct KeyPair.                                                                                               ║
║ secgInfo        │ Type defined L2 Construct SecurityGroup.                                                                                         ║
║ ec2Info         │ Type defined L1 Construct EC2 Instance.                                                                                          ║
╚═════════════════╧══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
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

export type logsInfo = {
  id: string;
  logGroupName: string;
  removalPolicy: boolean;
  retention: number;
  tags: { key: string; value: string }[];
};

export type lambdaInfo = {
  id: string;
  description: string;
  functionName: string;
  tags: { key: string; value: string }[];
};

export type ruleInfo = {
  id: string;
  ruleName: string;
  description: string;
  tags: { key: string; value: string }[];
};

export type keypairInfo = {
  id: string;
  keyName: string;
  keyType: string;
  keyFormat: string;
  removalPolicy: boolean;
  tags: { key: string; value: string }[];
};

export type secgInfo = {
  id: string;
  sgName: string;
  description: string;
  tags: { key: string; value: string }[];
};

export type ec2Info = {
  id: string;
  instanceType: string;
  apiTerm: boolean;
  ebsOpt: boolean;
  volSize: number;
  tags: { key: string; value: string }[];
};

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Interface Parameter                                                                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
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
  logGroup: logsInfo;
  fn: lambdaInfo;
  rule: ruleInfo;
  keyPair: keypairInfo;
  secg: secgInfo;
  ec2: ec2Info;
}

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ devParameter                                                                                                                                       ║
╠═════════════════╤══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ AppName         │ common tag value.                                                                                                                ║
║ vpc             │ VPC.                                                                                                                             ║
║ subnet          │ Private Subnet.                                                                                                                  ║
║ ebsCmk          │ CMK for EBS.                                                                                                                     ║
║ backupCmk       │ CMK for AWS Backup.                                                                                                              ║
║ ltupdatePolicy  │ ltUpdate IAM Policy.                                                                                                             ║
║ lambdaRole      │ Lambda IAM Role.                                                                                                                 ║
║ backupRole      │ AWS Backup IAM Role.                                                                                                             ║
║ ec2Role         │ EC2 IAM Role.                                                                                                                    ║
║ bkVault         │ AWS Backup Vault.                                                                                                                ║
║ logGroup        │ LogGroup for Lambda.                                                                                                             ║
║ fn              │ Lambda Function.                                                                                                                 ║
║ rule            │ EventBridge Rule.                                                                                                                ║
║ keyPair         │ KeyPair.                                                                                                                         ║
║ secg            │ SecurityGroup.                                                                                                                   ║
║ ec2             │ EC2 Instance.                                                                                                                    ║
╚═════════════════╧══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
export const devParameter: Parameter = {
  AppName: "ep001",

  vpc: {
    id: "Vpc",
    cidrBlock: "10.0.0.0/16",
    dnsHost: true,
    dnsSupport: true,
    tags: [{ key: "Name", value: "ep001-vpc" }],
  },

  subnet: {
    id: "PrivateSubnetA",
    name: "ep001-subnet",
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "ap-northeast-1a",
    tags: [{ key: "Name", value: "ep001-subnet" }],
  },

  ebsCmk: {
    id: "EbsCmk",
    alias: "alias/ebs-cmk",
    description: "CMK for EBS",
    keyRotation: true,
    pendingWindow: 7,
    tags: [{ key: "Name", value: "ep001-ebs-cmk" }],
  },

  backupCmk: {
    id: "BackupCmk",
    alias: "alias/backup-cmk",
    description: "CMK for AWS Backup",
    keyRotation: true,
    pendingWindow: 7,
    tags: [{ key: "Name", value: "ep001-backup-cmk" }],
  },

  ltupdatePolicy: {
    id: "LtupdatePolicy",
    policyName: "ep001-iam-policy-ltupdate",
    description: "ltUpdate IAM Policy",
    jsonFileName: "iam-policy-ltupdate.json",
  },

  lambdaRole: {
    id: "LambdaRole",
    roleName: "ep001-iam-role-lambda",
    assumed: "lambda.amazonaws.com",
    description: "Lambda Role",
    customManagedPolicyAdd: true,
    awsManagedPolicyAdd: true,
    awsManagedPolicyName: [
      {
        policyName: "service-role/AWSLambdaBasicExecutionRole",
      },
    ],
    tags: [{ key: "Name", value: "ep001-iam-role-lambda" }],
  },

  backupRole: {
    id: "BackupRole",
    roleName: "ep001-iam-role-backup",
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
    tags: [{ key: "Name", value: "ep001-iam-role-backup" }],
  },

  ec2Role: {
    id: "EC2Role",
    roleName: "ep001-iam-role-ec2",
    assumed: "ec2.amazonaws.com",
    description: "EC2 Role",
    customManagedPolicyAdd: false,
    awsManagedPolicyAdd: false,
    tags: [{ key: "Name", value: "ep001-iam-role-ec2" }],
  },

  bkVault: {
    id: "BkVault",
    name: "ep001-bkvault",
    removalPolicy: true,
    tags: [{ key: "Name", value: "ep001-bkvault" }],
  },

  logGroup: {
    id: "LogGroup",
    logGroupName: "ep001-loggroup",
    removalPolicy: true,
    retention: 1,
    tags: [{ key: "Name", value: "ep001-loggroup" }],
  },

  fn: {
    id: "LambdaFunction",
    functionName: "ep001-lambda-function",
    description: "Launch Template Update Lambda Function",
    tags: [{ key: "Name", value: "ep001-lambda-function" }],
  },

  rule: {
    id: "Rule",
    ruleName: "ep001-rule",
    description: "Backup Job State Completed Rule",
    tags: [{ key: "Name", value: "ep001-rule" }],
  },

  keyPair: {
    id: "KeyPair",
    keyName: "ep001-keypair",
    keyType: "rsa",
    keyFormat: "pem",
    removalPolicy: true,
    tags: [{ key: "Name", value: "ep001-keypair" }],
  },

  secg: {
    id: "SecurityGroup",
    sgName: "ep001-sg",
    description: "SG for EC2",
    tags: [{ key: "Name", value: "ep001-sg" }],
  },

  ec2: {
    id: "EC2Instance",
    instanceType: "t2.micro",
    apiTerm: false,
    ebsOpt: false,
    volSize: 30,
    tags: [
      { key: "Name", value: "ep001-ec2" },
      { key: "Backup", value: "lt1" },
    ],
  },
};
