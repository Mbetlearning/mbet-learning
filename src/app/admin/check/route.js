// src/app/api/admin/check/route.js

export async function GET(req) {
  const cookie = req.headers.get('cookie') || '';
  const isAdmin = cookie.includes('adminAuth=true');

  return new Response(JSON.stringify({ isAdmin }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
