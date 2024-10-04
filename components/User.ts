const user = (ssession): User => //server session from SSR
{
  let session: any = { }

  if (ssession && ssession.path) {
    session.path = ssession.path
  }


  var obj: User = {
    loggedin: !!session?.user?.email,
    name: session?.user?.name || "unknown user",
    uid: session?.user?.uid || null,
    email: session?.user?.email,
    phone: session?.user?.phone,
    role: session?.user?.role,
    path: ssession?.path,
  }

  return obj;
}


export type User = {
  loggedin: boolean
  name: string | null
  uid: string | null
  email: string | null
  phone: string | null
  role: string | null
  path: string | null
}

export default user;