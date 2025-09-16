import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Brands() {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  return (
    <div>
      Brands
    </div>
  )
}
