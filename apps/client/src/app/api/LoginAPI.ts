export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  streetAddress: string;
  building: string;
  zipCode: string;
  city: string;
  country: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginError {
  message: string;
  statusCode: number;
  error: string;
}

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  const response = await fetch(`/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res: Response) => res.json())
    .then((data: User | LoginError) => {
      if ('error' in data) {
        return null;
      }
      return data;
    })
    .catch(() => {
      return null;
    });

  return response;
}

export async function etUserByID(id: number): Promise<Response> {
  const response = await fetch(`/api/user/${id}`);
  return response;
}
