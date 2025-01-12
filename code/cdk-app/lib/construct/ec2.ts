/*
╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.001 Launch Template Update Solution - Cloud Development Kit ec2.ts                                                                     ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ This construct creates an L1 Construct SecurityGroup, KeyPair, Instance Profile, EC2 Instance.                           ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import { keypairInfo } from "../../parameter";
import { secgInfo } from "../../parameter";
import { ec2Info } from "../../parameter";

export interface Ec2Props {
  vpc: ec2.CfnVPC;
  subnet: ec2.CfnSubnet;
  ebsCmk: kms.Key;
  ec2Role: iam.Role;
  keyPair: keypairInfo;
  secg: secgInfo;
  ec2: ec2Info;
}

export class Ec2 extends Construct {
  constructor(scope: Construct, id: string, props: Ec2Props) {
    super(scope, id);

    const secg = new ec2.CfnSecurityGroup(this, props.secg.id, {
      vpcId: props.vpc.attrVpcId,
      groupDescription: props.secg.description,
      groupName: props.secg.sgName,
    });
    for (const tag of props.secg.tags) {
      cdk.Tags.of(secg).add(tag.key, tag.value);
    }

    const keyPair = new ec2.CfnKeyPair(this, props.keyPair.id, {
      keyName: props.keyPair.keyName,
      keyType: props.keyPair.keyType,
      keyFormat: props.keyPair.keyFormat,
    });
    if (props.keyPair.removalPolicy) {
      keyPair.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);
    }
    for (const tag of props.keyPair.tags) {
      cdk.Tags.of(keyPair).add(tag.key, tag.value);
    }
    new cdk.CfnOutput(this, "Get" + keyPair.keyName + "Command", {
      value: `aws ssm get-parameter --name "/ec2/keypair/${keyPair.attrKeyPairId}:1" --region ap-northeast-1 --with-decryption --query Parameter.Value --output text`,
    });

    const instanceProfile = new iam.CfnInstanceProfile(
      this,
      "instanceprofile",
      {
        roles: [props.ec2Role.roleName],
        instanceProfileName: props.ec2Role.roleName,
      }
    );
    const ec2Instance = new ec2.CfnInstance(this, props.ec2.id, {
      instanceType: props.ec2.instanceType,
      keyName: keyPair.keyName,
      iamInstanceProfile: instanceProfile.ref,
      imageId: ec2.MachineImage.latestAmazonLinux2023().getImage(this).imageId,
      disableApiTermination: props.ec2.apiTerm,
      subnetId: props.subnet.ref,
      securityGroupIds: [secg.attrGroupId],
      ebsOptimized: props.ec2.ebsOpt,
      blockDeviceMappings: [
        {
          deviceName: "/dev/xvda",
          ebs: {
            deleteOnTermination: true,
            volumeSize: props.ec2.volSize,
            volumeType: ec2.EbsDeviceVolumeType.GP3,
            encrypted: true,
            kmsKeyId: props.ebsCmk.keyId,
          },
        },
      ],
    });
    for (const tag of props.ec2.tags) {
      cdk.Tags.of(ec2Instance).add(tag.key, tag.value);
    }

    const launchTemplate = new ec2.CfnLaunchTemplate(this, "launchtemplate", {
      launchTemplateName: "launchtemplate",
      versionDescription: "LaunchTemplate",
      launchTemplateData: {
        disableApiTermination: false,
        ebsOptimized: false,
        iamInstanceProfile: {
          arn: instanceProfile.attrArn,
        },
        imageId:
          ec2.MachineImage.latestAmazonLinux2023().getImage(this).imageId,
        securityGroupIds: [secg.attrGroupId],
        instanceType: props.ec2.instanceType,
        keyName: keyPair.keyName,
        metadataOptions: {
          httpTokens: "required",
        },
        tagSpecifications: [
          {
            resourceType: "instance",
            tags: [
              {
                key: "Name",
                value: "ep001-ec2",
              },
              {
                key: "Backup",
                value: "lt1",
              },
            ],
          },
        ],
      },
      tagSpecifications: [
        {
          resourceType: "launch-template",
          tags: [
            {
              key: "Name",
              value: "launchtemplate",
            },
            {
              key: "Backup",
              value: "lt1",
            },
          ],
        },
      ],
    });
  }
}
