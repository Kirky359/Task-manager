import { useState } from "react";

export function signInUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = { email, password };
  const [status, setStatus] = useState<
    "Loading" | "Success" | "Error" | "Idle"
  >("Idle");
  const [serverMessage, setServerMessage] = useState("");
  async function handleSubmit() {
    try {
      setStatus("Loading");
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setStatus("Error");
      setServerMessage(data.message || "Login succeded!");
      console.log("Login succeeded");
    } catch (err) {
      console.log(err);
      setStatus("Error");
      setServerMessage("Failed to login!");
    }
  }
  return (
    <div>
      <label>Email:</label>
      <input
        type="text"
        placeholder="johndoe@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="text"
        placeholder="yourPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>Status: {status}</p>
      <p>{serverMessage}</p>
    </div>
  );
}
