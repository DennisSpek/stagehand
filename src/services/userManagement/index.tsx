'use server'

import { UserType } from '@/types/user';

const url = process.env.NEXT_PUBLIC_STAGEHAND_API

export const getUser = async (email: string, password: string) : Promise<UserType | null> => {
  // Logic to get user from database
  console.log('user', url + '/user/login')
  const response: Response = await fetch(url + '/user/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(!response.ok) return null

  const user: UserType = await response.json();

  return user;
}

export const updateUser = async (user: UserType): Promise<UserType | null> => {
  // Logic to update user from database
  const response: Response = await fetch(url + '/user/update', {
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
  const response: Response  = await fetch(url + '/user/register', {
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