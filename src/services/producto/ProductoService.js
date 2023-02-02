export default class ProductoService {
  constructor() {
    this.url = "https://localhost:8080/api/v1/producto";
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

  async get(id) {
    const response = await fetch(`${this.url}/${id}?authtoken=${this.token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async create(producto) {
    const response = await fetch(`${this.url}?authtoken=${this.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(producto),
    });
    return await response.json();
  }

  async delete(id) {
    const response = await fetch(`${this.url}/${id}?authtoken=${this.token}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

}
