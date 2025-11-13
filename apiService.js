
export async function fetchProducts(){
    const response = await fetch("https://fakestoreapi.com/products")
if(!response.ok)
     throw new Error(console.log("You got an HTTP-error", response.status));
    const data = await response.json();
    return await fetchProducts()
}