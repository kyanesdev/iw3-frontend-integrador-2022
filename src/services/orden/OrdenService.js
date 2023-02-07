export default class OrdenService {
  constructor() {
    this.url = "http://localhost:8080/api/v1/orden";
    this.token = sessionStorage.getItem("token");
  }

  async getAll() {
    const response = await fetch(`${this.url}?authtoken=${this.token}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  }

  async get(id,numOrden) {
    const response = await fetch(`${this.url}/${id}?authtoken=${this.token}&slim=v1&${numOrden}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async getConciliation(id) {
    const response = await fetch(`${this.url}/conciliacion/${id}?authtoken=${this.token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async update(orden) {
    const response = await fetch(`${this.url}?authtoken=${this.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    });
    return await response.json();
  }

  async addInitialWeight(id,tara){
    const response = await fetch(`${this.url}/pesaje-inicial/${id}?authtoken=${this.token}&tara=${tara}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async closeOrder(id){
    const response = await fetch(`${this.url}/cerrar-orden/${id}?authtoken=${this.token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  async sendFinalWeight(id,ultimoPeso){
    const response = await fetch(`${this.url}/pesaje-final/${id}?authtoken=${this.token}&ultimoPeso=${ultimoPeso}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

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