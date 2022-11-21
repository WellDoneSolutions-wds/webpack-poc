import { HttpClient } from "@angular/common/http";

export class LoginService {
  constructor(private httpClient: HttpClient) {}

  authenticate() {
    return this.httpClient.get("https://pokeapi.co/api/v2/pokemon/ditto");
  }
}
