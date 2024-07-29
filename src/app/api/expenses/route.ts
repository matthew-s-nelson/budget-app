export async fucntion GET() {
    return Response.json({message: "hi"});
}

export asyn function POST(request: Request) {
    const expenseData = await request.json();
}