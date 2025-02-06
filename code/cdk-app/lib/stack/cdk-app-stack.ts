/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit cdk-app-stack.ts                                                                    ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ CDK stacks that bundle constructs (collections of multiple resources).                                                                             ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Parameter } from "../../parameter";
import { Network } from "../construct/network";
import { Kms } from "../construct/kms";
import { Iam } from "../construct/iam";
import { AwsBackup } from "../construct/awsbackup";
import { Observe } from "../construct/observe";
import { Ec2 } from "../construct/ec2";

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Parameter) {
    super(scope, id, {
      ...props,
      description: "Launch Template Update Solution Stack.",
    });

    const network = new Network(this, "Network", {
      vpc: props.vpc,
      subnet: props.subnet,
    });

    const kms = new Kms(this, "Kms", {
      ebsCmk: props.ebsCmk,
      backupCmk: props.backupCmk,
    });

    const iam = new Iam(this, "Iam", {
      ltupdatePolicy: props.ltupdatePolicy,
      lambdaRole: props.lambdaRole,
      backupRole: props.backupRole,
      ec2Role: props.ec2Role,
    });

    const awsBackup = new AwsBackup(this, "AwsBackup", {
      bkVault: props.bkVault,
      backupCmk: kms.backupCmk,
    });

    const observe = new Observe(this, "Observe", {
      logGroup: props.logGroup,
      lambdaRole: iam.lambdaRole,
      fn: props.fn,
      rule: props.rule,
    });

    const ec2 = new Ec2(this, "Ec2", {
      vpc: network.vpc,
      subnet: network.subnet,
      ebsCmk: kms.ebsCmk,
      ec2Role: iam.ec2Role,
      keyPair: props.keyPair,
      secg: props.secg,
      ec2: props.ec2,
    });
  }
}
