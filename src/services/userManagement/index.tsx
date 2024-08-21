import { User } from 'next-auth';

const url = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL

export const getUser = async (email: string, password: string) => {
  // Logic to get user from database
  const response: Unknown = await fetch(url + '/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const user: User | null = await response.json();

  if (user) return user;

  return null
}

export const saveUser = async (email: string, password: string, name: string) => {
  // Logic to save user from database
  const response: Unknown = await fetch(url + '/user/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const user: User | null = await response.json();

  if(user) return user

  return null
}