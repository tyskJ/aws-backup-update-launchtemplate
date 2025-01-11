/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit observe.ts                                                                 ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L2 Construct EventBridge Rule, Lambda Function and L1 Construct LogGroup.                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as logs from "aws-cdk-lib/aws-logs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as events from "aws-cdk-lib/aws-events";
import { logsInfo } from "../../parameter";
import { lambdaInfo } from "../../parameter";
import path = require("path");

export interface ObserveProps {
  logGroup: logsInfo;
  lambdaRole: iam.Role;
  fn: lambdaInfo;
}

export class Observe extends Construct {
  constructor(scope: Construct, id: string, props: ObserveProps) {
    super(scope, id);

    const lg = new logs.CfnLogGroup(this, props.logGroup.id, {
      logGroupName: props.logGroup.logGroupName,
      retentionInDays: props.logGroup.retention,
    });
    if (props.logGroup.removalPolicy) {
      lg.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    }
    for (const tag of props.logGroup.tags) {
      cdk.Tags.of(lg).add(tag.key, tag.value);
    }

    const fn = new lambda.Function(this, props.fn.id, {
      functionName: props.fn.functionName,
      description: props.fn.description,
      role: props.lambdaRole,
      logGroup: logs.LogGroup.fromLogGroupArn(
        this,
        lg.logicalId + "lambda",
        lg.attrArn
      ),
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: "lt-update.lambda_handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../lambda")),
    });
    for (const tag of props.fn.tags) {
      cdk.Tags.of(fn).add(tag.key, tag.value);
    }
  }
}
