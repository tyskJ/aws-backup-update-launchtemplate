/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit iam.ts                                                                     ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct IAM Managed Policy and IAM Role.                                                                  ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import { iamPolicyInfo } from "../../parameter";
import * as fs from "fs";
import * as path from "path";

export interface IamProps {
  ltupdatePolicy: iamPolicyInfo;
}

export class Iam extends Construct {
  public readonly backupRole: iam.Role;
  public readonly lambdaRole: iam.Role;
  public readonly ec2Role: iam.Role;

  constructor(scope: Construct, id: string, props: IamProps) {
    super(scope, id);

    const ltupdatePolicy = this.createIamPolicy(this, props.ltupdatePolicy);
  }
  /*
  ╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Method (private)                                                                                               ║
  ╠═══════════════════════════╤═════════════════════════╤══════════════════════════════════════════════════════════╣
  ║ createIamPolicy           │ iam.Policy              │ Method to create IAM Managed Policy for L2 constructs.   ║
  ║ createIamRole             │ iam.Role                │ Method to create IAM Role for L2 constructs.             ║
  ╚═══════════════════════════╧═════════════════════════╧══════════════════════════════════════════════════════════╝
  */
  private createIamPolicy(scope: Construct, policyInfo: iamPolicyInfo) {
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
  }
}
