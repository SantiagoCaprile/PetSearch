export async function verifyCredentials(user) {
  const response = await fetch("http://localhost:4000/users/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
