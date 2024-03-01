import { NextResponse } from "next/server";
import { verifyMessage } from "viem";

type ReqBody = {
  message: string;
  signature: `0x${string}`;
  signer: string;
};

export const POST = async (req: Request) => {
  try {
    const { signer, signature, message } = (await req.json()) as ReqBody;
    if (!signer || !signature || !message) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    // Verify the message
    const valid = await verifyMessage({ message: "SE-2", signature, address: signer });

    if (valid) {
      return NextResponse.json({ verified: true }, { status: 200 });
    } else {
      return NextResponse.json({ verified: false }, { status: 401 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ verified: false }, { status: 500 });
  }
};
