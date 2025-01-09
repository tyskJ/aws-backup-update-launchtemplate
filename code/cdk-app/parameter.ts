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
╔════════════════════════════════════════════════════════════════╗
║ Interface Parameter                                            ║
╚════════════════════════════════════════════════════════════════╝
*/
export interface Parameter {
  AppName: string;
  vpc: vpcInfo;
  subnet: subnetInfo;
}

/*
╔════════════════════════════════════════════════════════════════╗
║ devParameter                                                   ║
╠═════════════════╤══════════════════════════════════════════════╣
║ AppName         │ common tag value.                            ║
║ vpc             │ VPC.                                         ║
║ subnet          │ Private Subnet.                              ║
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
};
