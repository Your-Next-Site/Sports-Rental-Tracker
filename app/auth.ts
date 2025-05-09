async authorized({ request, auth }) {
    const url = request.nextUrl
   
    if(request.method === "POST") {
      const { authToken } = (await request.json()) ?? {}
      // If the request has a valid auth token, it is authorized
      const valid = await validateAuthToken(authToken)
      if(valid) return true
      return NextResponse.json("Invalid auth token", { status: 401 })
    }
   
    // Logged in users are authenticated, otherwise redirect to login page
    return !!auth.user
  }