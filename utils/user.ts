export async function getListInvoice(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/Invoice/getListInvoice/${id}`);
  if (!res.ok) {
    throw new Error("Có lỗi xảy ra, vui hãy thử lại sau!");
  }
  return res.json();
}

export async function getUserData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/Customer/${id}`);
  // if (!res.ok) {
  //   throw new Error("Có lỗi xảy ra, vui hãy thử lại sau!");
  // }
  return res.json();
}

// get cart by id user
export async function getCartByUserId(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/Cart/${id}`);
  // if (!res.ok) {
  //   throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
  // }
  return res.json();
}
// update all cart
export async function updateCart(cart: any, id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/Cart/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  // if (!res.ok) {
  //   throw new Error("Có lỗi xảy ra, vui lòng thử lại sau!");
  // }
  return res.json();
}
