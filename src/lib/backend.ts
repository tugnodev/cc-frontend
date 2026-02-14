import { env } from "$env/dynamic/public";
import { fetch } from "@tauri-apps/plugin-http";

export class BackendFetch {
  private url: string = env.PUBLIC_API_URL;
  private token: string = "your_token_here";

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

// import { TokenManager } from "./token";

// export class backendFetch {
//   private url: string = "http://localhost:3000";
//   private token: string | null = null;
//   private tk = new TokenManager();

//   constructor() {
//     // On lance l'initialisation silencieusement au démarrage
//     this.init();
//   }

//   /**
//    * Charge le token depuis le store Tauri au démarrage
//    */
//   private async init() {
//     const savedToken = await this.tk.loadToken();
//     if (savedToken) {
//       this.token = savedToken as string;
//     }
//   }

//   /**
//    * Permet de mettre à jour le token manuellement (après un Login)
//    */
//   setToken(newToken: string) {
//     this.token = newToken;
//   }

//   /**
//    * Prépare les headers pour chaque requête
//    */
//   private async getHeaders(): Promise<HeadersInit> {
//     // Si le token est encore nul, on tente une dernière vérification dans le store
//     if (!this.token) {
//       const savedToken = await this.tk.loadToken();
//       if (savedToken) this.token = savedToken as string;
//     }

//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };

//     if (this.token) {
//       headers["Authorization"] = `Bearer ${this.token}`;
//     }

//     return headers;
//   }

//   // --- MÉTHODES HTTP ---

//   async post<T>(endPoint: string, data: any): Promise<T> {
//     const headers = await this.getHeaders();
//     const response = await fetch(`${this.url}${endPoint}`, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   }

//   async get<T>(endPoint: string): Promise<T> {
//     const headers = await this.getHeaders();
//     const response = await fetch(`${this.url}${endPoint}`, {
//       method: "GET",
//       headers: headers,
//     });
//     return response.json();
//   }

//   async patch<T>(endPoint: string, data: any): Promise<T> {
//     const headers = await this.getHeaders();
//     const response = await fetch(`${this.url}${endPoint}`, {
//       method: "PATCH",
//       headers: headers,
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   }

//   async delete<T>(endPoint: string): Promise<T> {
//     const headers = await this.getHeaders();
//     const response = await fetch(`${this.url}${endPoint}`, {
//       method: "DELETE",
//       headers: headers,
//     });
//     return response.json();
//   }
// }
