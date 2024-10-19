
export default ()=> {
  return null
}

export async function getServerSideProps(context)
{
  if (global.Startup != "OK") {
    if (global.Startup == "PENDING") {
      await new Promise(r => setInterval(() => { if (global.Startup != "PENDING") r(null) }, 100))
    }
    else {
      global.Startup = "PENDING";
      await (await import("../startup.ts")).Run()
      global.Startup = "OK";
    }
  }

  // console.log("QUERYLLLLLLLLLLLLLLLLLLLL: ",context.query)

  // var { email, blocked, userip, role, session } = await global.SSRVerify(context)

  return {
    redirect: {
      permanent: false,
      // destination: "/"+lang,
      destination: "/fa",
    },
    props:{}
  }
}
