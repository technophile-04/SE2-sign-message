import { NextResponse } from "next/server";
import { recoverTypedDataAddress } from "viem";
import { EIP_712_DOMAIN, EIP_712_TYPES__MESSAGE } from "~~/utils/eip712";

type ReqBody = {
  signature: `0x${string}`;
  signer: string;
  message: string;
};

export const POST = async (req: Request) => {
  try {
    const { signature, signer } = (await req.json()) as ReqBody;
    const recoveredAddress = await recoverTypedDataAddress({
      domain: EIP_712_DOMAIN,
      types: EIP_712_TYPES__MESSAGE,
      primaryType: "Message",
      message: { greeting: "SE-2" },
      signature: signature,
    });

    if (recoveredAddress !== signer) {
      return NextResponse.json({ verified: false }, { status: 401 });
    }

    return NextResponse.json({ verified: true }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ verified: false }, { status: 500 });
  }
};
