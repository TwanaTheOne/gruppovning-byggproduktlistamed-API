export async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");

  if (!response.ok) {
    throw new Error(`You got an HTTP-error: ${response.status}`);
  }

  const data = await response.json();
  return data; 
}
