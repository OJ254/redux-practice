// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios, { Method } from 'axios';
import { CLIENT_API_URL } from '@/utils/constants';

// Extract backend path from request
const getBackendPath = (req: NextRequest) => {
  const url = new URL(req.url);
  return url.pathname.replace('/api/proxy/', '');
};

// Forward necessary headers (like Authorization)
const getHeaders = (req: NextRequest) => {
  const headers: Record<string, string> = {};
  const auth = req.headers.get('authorization');
  if (auth) headers['Authorization'] = auth;
  return headers;
};

// Generic handler for all HTTP methods
const handleRequest = async (req: NextRequest, method: Method) => {
  try {
    const path = getBackendPath(req);
    const url = `${CLIENT_API_URL}/${path}${new URL(req.url).search}`; // include query params

    let response;
    if (method === 'GET' || method === 'DELETE') {
      response = await axios.request({
        url,
        method,
        headers: getHeaders(req),
      });
    } else {
      // POST or PUT
      const body = await req.json();
      response = await axios.request({
        url,
        method,
        headers: { ...getHeaders(req), 'Content-Type': 'application/json' },
        data: body,
      });
    }

    return NextResponse.json(response.data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.response?.data || 'An unexpected error occurred.' },
      { status: err?.response?.status || 500 }
    );
  }
};

// Export handlers
export const GET = (req: NextRequest) => handleRequest(req, 'GET');
export const POST = (req: NextRequest) => handleRequest(req, 'POST');
export const PUT = (req: NextRequest) => handleRequest(req, 'PUT');
export const DELETE = (req: NextRequest) => handleRequest(req, 'DELETE');
