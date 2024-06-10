export async function verifyCredentials(user) {
  const response = await fetch(`${process.env.API_URL}/users/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY,
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).catch((err) => {
    console.log(err);
  });
  return await response.json();
}
