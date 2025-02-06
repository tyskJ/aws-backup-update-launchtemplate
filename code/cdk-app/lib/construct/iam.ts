/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit iam.ts                                                                              ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct IAM Managed Policy and IAM Role.                                                                            ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { iamPolicyInfo } from "../../parameter";
import { iamRoleInfo } from "../../parameter";
import * as fs from "fs";
import * as path from "path";

export interface IamProps {
  ltupdatePolicy: iamPolicyInfo;
  lambdaRole: iamRoleInfo;
  backupRole: iamRoleInfo;
  ec2Role: iamRoleInfo;
}

export class Iam extends Construct {
  public readonly lambdaRole: iam.Role;
  public readonly backupRole: iam.Role;
  public readonly ec2Role: iam.Role;

  constructor(scope: Construct, id: string, props: IamProps) {
    super(scope, id);

    const ltupdatePolicy = this.createIamPolicy(this, props.ltupdatePolicy);

    this.lambdaRole = this.createIamRole(this, props.lambdaRole, [
      ltupdatePolicy,
    ]);
    this.backupRole = this.createIamRole(this, props.backupRole);
    this.ec2Role = this.createIamRole(this, props.ec2Role);
  }
  /*
  ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Method (private)                                                                                               ║
  ╠═══════════════════════════╤═════════════════════════╤══════════════════════════════════════════════════════════╣
  ║ createIamPolicy           │ iam.ManagedPolicy       │ Method to create IAM Managed Policy for L2 constructs.   ║
  ║ createIamRole             │ iam.Role                │ Method to create IAM Role for L2 constructs.             ║
  ╚═══════════════════════════╧═════════════════════════╧══════════════════════════════════════════════════════════╝
  */
  private createIamPolicy(
    scope: Construct,
    policyInfo: iamPolicyInfo
  ): iam.ManagedPolicy {
    const filePath = path.join(
      `${__dirname}`,
      "../json/policy/",
      policyInfo.jsonFileName
    );
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const iamManagedPolicy = new iam.ManagedPolicy(scope, policyInfo.id, {
      managedPolicyName: policyInfo.policyName,
      description: policyInfo.description,
      document: iam.PolicyDocument.fromJson(jsonData),
    });
    return iamManagedPolicy;
  }

  private createIamRole(
    scope: Construct,
    roleInfo: iamRoleInfo,
    managedPolicy?: iam.ManagedPolicy[]
  ): iam.Role {
    const iamRole = new iam.Role(scope, roleInfo.id, {
      roleName: roleInfo.roleName,
      description: roleInfo.description,
      assumedBy: new iam.ServicePrincipal(roleInfo.assumed),
    });
    if (roleInfo.awsManagedPolicyAdd && roleInfo.awsManagedPolicyName) {
      for (const amp of roleInfo.awsManagedPolicyName) {
        iamRole.addManagedPolicy(
          iam.ManagedPolicy.fromAwsManagedPolicyName(amp.policyName)
        );
      }
    }
    if (roleInfo.customManagedPolicyAdd && managedPolicy) {
      for (const cmp of managedPolicy) {
        iamRole.addManagedPolicy(cmp);
      }
    }
    for (const tag of roleInfo.tags) {
      cdk.Tags.of(iamRole).add(tag.key, tag.value);
    }
    return iamRole;
  }
}
