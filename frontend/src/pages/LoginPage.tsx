import { useState } from "react";

export function SignInUser() {
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
      const res = await fetch("http://localhost:3001/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      setStatus("Success");
      setServerMessage(data.message || "Login succeded!");
      console.log("Login succeeded");
    } catch (err) {
      setStatus("Error");
      setServerMessage("Failed to login!");
      console.log(err, status, serverMessage);
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
      <p>{serverMessage}</p>
    </div>
  );
}
