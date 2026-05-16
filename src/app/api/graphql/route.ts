import { NextRequest, NextResponse } from "next/server";

const POKEMON_GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app/";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: [{ message: "Invalid JSON request body." }] },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(POKEMON_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    });

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
      headers: {
        "cache-control": "no-store"
      }
    });
  } catch {
    return NextResponse.json(
      {
        errors: [
          {
            message:
              "Unable to fetch the Pokemon GraphQL API. Please try again."
          }
        ]
      },
      { status: 502 }
    );
  }
}
