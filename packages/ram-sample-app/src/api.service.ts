export class ApiService {
  isLoggedIn: boolean = false;
  name: string = '';

  async login({name}) {
    this.name = name;
    this.isLoggedIn = true;
    return resolveWithDelay({isLoggedIn: this.isLoggedIn});
  }

  async logout() {
    this.name = '';
    this.isLoggedIn = false;
    return resolveWithDelay({isLoggedIn: this.isLoggedIn});
  }

  async getUserProfile() {
    if (!this.isLoggedIn) {
      return rejectWithDelay(new Error('Not logged in'));
    }
    return resolveWithDelay({
      name: this.name,
    });
  }
}

async function resolveWithDelay<T>(value: T = null, ms = 1000) {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

async function rejectWithDelay<T>(error: T = null, ms = 1000) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => reject(error), ms);
  });
}
