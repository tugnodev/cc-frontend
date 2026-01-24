export class backendFetch {
  private url: string = "http://localhost:3000";
  private token: string = "your_token_here";

  constructor(token: string) {
    this.token = token;
  }

  async post<T>(endPoint: string, data: T) {
    return await fetch(`${this.url}${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  async get<T>(endPoint: string) {
    return await fetch(`${this.url}${endPoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  }

  async patch<T>(endPoint: string, data: T) {
    return await fetch(`${this.url}${endPoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }

  async delete<T>(endPoint: string) {
    return await fetch(`${this.url}${endPoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }).then((response) => response.json());
  }
}
