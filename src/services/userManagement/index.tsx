'use server'

import { UserType } from '@/types/user';

const url = process.env.NEXT_PUBLIC_STAGEHAND_USER_SERVICE_URL

export const getUser = async (email: string, password: string) : Promise<UserType | null> => {
  // Logic to get user from database
  const response: any = await fetch(url + '/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const user: UserType | null = await response.json();

  if (user) return user;

  return null
}

export const updateUser = async (user: UserType): Promise<UserType | null> => {
  // Logic to update user from database
  console.log('user', user)
  const response: any = await fetch(url + '/user/update', {
    method: 'POST',
    body: JSON.stringify({ id: user.id, userData: user}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const updatedUser: UserType = await response.json();

  if (updatedUser) return updatedUser;

  return null
}

export const saveUser = async (email: string, password: string, name: string): Promise<UserType | null> => {
  // Logic to save user from database
  const response: any = await fetch(url + '/user/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const user: UserType | null = await response.json();

  if(user) return user

  return null
}