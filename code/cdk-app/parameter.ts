/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit parameter.tf type                                                           ║
╠═════════════════╤═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ vpcInfo         │ Type defined L1 Construct vpc configuration information.                                                                ║
║ subnetInfo      │ Type defined L1 Construct subnet configuration information.                                                             ║
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

/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit parameter.tf interface Parameter                                            ║
╠═════════════════╤═══════════════════════════════════╤═════════════════════════════════════════════════════════════════════════════════════╣
║ AppName         │ string                            │ common tag value.                                                                   ║
║ vpc             │ vpcInfo                           │ VPC.                                                                                ║
║ subnet          │ subnetInfo                        │ Private Subnet.                                                                     ║
╚═════════════════╧═══════════════════════════════════╧═════════════════════════════════════════════════════════════════════════════════════╝
*/
export interface Parameter {
  AppName: string;
  vpc: vpcInfo;
  subnet: subnetInfo;
}

/*
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Ep.01 Launch Template Update Solution - Cloud Development Kit parameter.tf devParameter                                                   ║
╠═════════════════╤═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ AppName         │ common tag value.                                                                                                       ║
║ vpc             │ VPC.                                                                                                                    ║
║ subnet          │ Private Subnet.                                                                                                         ║
╚═════════════════╧═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
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
};
