import scaffoldConfig from "~~/scaffold.config";

export const EIP_712_DOMAIN = {
  name: "Scaffold-ETH 2",
  version: "1",
  chainId: scaffoldConfig.targetNetworks[0].id,
} as const;

export const EIP_712_TYPES__MESSAGE = {
  Message: [{ name: "greeting", type: "string" }],
} as const;
