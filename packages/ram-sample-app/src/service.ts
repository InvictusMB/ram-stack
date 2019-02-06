let isLoggedIn = false;

export function login(credentials) {
  isLoggedIn = true;
  return delay({isLoggedIn});
}

export function logout() {
  isLoggedIn = false;
  return delay({isLoggedIn});
}

export function getUserProfile() {
  if (!isLoggedIn) {
    return delay(Promise.reject());
  }
  return delay({
    name: 'John Doe',
  });
}

function delay<T>(value: T = null, ms = 1000) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
