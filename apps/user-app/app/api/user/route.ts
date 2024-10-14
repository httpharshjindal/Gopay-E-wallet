import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions)
  if(session.user){
    return NextResponse.json({
      user:session.user
    })
  }
  return NextResponse.json({
    msg:"You are not login"
  },{
    status:403
  })
};
