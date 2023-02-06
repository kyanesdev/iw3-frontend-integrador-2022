export default class OrdenCli1Service{

  constructor(){
    this.url = "http://localhost:8080/api/v1/cli1/orden/b2b";
    this.token = sessionStorage.getItem("token");
  }

  async create(orden){
    const response = await fetch(`${this.url}?authtoken=${this.token}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    });
    return await response.json();
  }
  

}