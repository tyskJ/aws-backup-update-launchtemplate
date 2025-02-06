/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit awsbackup.ts                                                                        ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct AWS Backup Vault.                                                                                           ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as backup from "aws-cdk-lib/aws-backup";
import * as kms from "aws-cdk-lib/aws-kms";
import { bkvaultInfo } from "../../parameter";

export interface BackupProps {
  bkVault: bkvaultInfo;
  backupCmk: kms.Key;
}

export class AwsBackup extends Construct {
  constructor(scope: Construct, id: string, props: BackupProps) {
    super(scope, id);

    const bkvault = new backup.BackupVault(this, props.bkVault.id, {
      backupVaultName: props.bkVault.name,
      encryptionKey: props.backupCmk,
      removalPolicy: props.bkVault.removalPolicy
        ? cdk.RemovalPolicy.DESTROY
        : cdk.RemovalPolicy.RETAIN,
    });
    for (const tag of props.bkVault.tags) {
      cdk.Tags.of(bkvault).add(tag.key, tag.value);
    }
  }
}
