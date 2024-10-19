// import {useSession} from "next-auth/react"
import { getCookie } from "cookies-next";


const user = ()=> 
{
  var session:any = {} //useSession()




  var obj = {
    status: session?.status ,
    loggedin:session?.status == "authenticated" || session?.status == "loading",
    name:session?.data?.user?.name||"unknown user",
    uid:session?.data?.user?.uid||null,
    email:session?.data?.user?.email,
    avatar:session?.data?.user?.image,
    image:session?.data?.user?.image,
    imageprop:session?.data?.user?.imageprop||{},
    ccode:session?.data?.user?.ccode,
    cchar:session?.data?.user?.cchar,
    phone:session?.data?.user?.phone,
    joindate:session?.data?.user?.joindate,
    lastseen:session?.data?.user?.lastseen,
    mfaenabled: session?.data?.user?.mfaenabled,
    role: session?.data?.user?.role,
    verify: session?.data?.user?.role || session?.data?.user?.verify,
    donate: session?.data?.user?.donate,
    donated: session?.data?.user?.donated,
    cart:session?.data?.user?.cart || {},
    cmntcount: session?.data?.user?.cmntcount||0,
    unreadchats:(session?.data?.user?.unreadchats) || {},
    limited:session?.data?.user?.limited
  }

  return obj;
}

export default user;