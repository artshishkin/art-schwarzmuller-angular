export class FakeAuthService {

  private loggedIn: boolean = false;

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => resolve(this.loggedIn), 800);
    });
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
