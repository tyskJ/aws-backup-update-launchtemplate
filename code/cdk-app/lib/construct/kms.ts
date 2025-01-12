/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit kms.ts                                                                     ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct KMS Key and Alias.                                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { kmsInfo } from "../../parameter";
import * as kms from "aws-cdk-lib/aws-kms";

export interface KmsProps {
  ebsCmk: kmsInfo;
  backupCmk: kmsInfo;
}

export class Kms extends Construct {
  public readonly ebsCmk: kms.Key;
  public readonly backupCmk: kms.Key;

  constructor(scope: Construct, id: string, props: KmsProps) {
    super(scope, id);

    this.ebsCmk = new kms.Key(this, props.ebsCmk.id, {
      alias: props.ebsCmk.alias,
      description: props.ebsCmk.description,
      enableKeyRotation: props.ebsCmk.keyRotation,
      pendingWindow: cdk.Duration.days(props.ebsCmk.pendingWindow),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    for (const tag of props.ebsCmk.tags) {
      cdk.Tags.of(this.ebsCmk).add(tag.key, tag.value);
    }

    this.backupCmk = new kms.Key(this, props.backupCmk.id, {
      alias: props.backupCmk.alias,
      description: props.backupCmk.description,
      enableKeyRotation: props.backupCmk.keyRotation,
      pendingWindow: cdk.Duration.days(props.backupCmk.pendingWindow),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    for (const tag of props.backupCmk.tags) {
      cdk.Tags.of(this.backupCmk).add(tag.key, tag.value);
    }
  }
}
