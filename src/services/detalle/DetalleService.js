export default class DetalleService {
  constructor() {
    this.url = "http://localhost:8080/api/v1/detalle";
    this.token = sessionStorage.getItem("token");
  }

  async getAll() {
    const response = await fetch(`${this.url}?authtoken=${this.token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async create(detalle) {
    const response = await fetch(`${this.url}?authtoken=${this.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalle),
    });
    return await response.json();
  }
  
  async update(camion) {
    const response = await fetch(`${this.url}?authtoken=${this.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camion),
    });
    return await response.json();
  }

}
