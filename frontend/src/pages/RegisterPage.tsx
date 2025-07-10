import { useState } from "react";

export function SignUpUser() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");

  const user = { email, name, surname, password };
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:3001/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log("Server answer: ", data.message);
      setServerMessage(data.message || "Account registered successfully");
      setStatus("success");
    } catch (err) {
      setServerMessage("Failed to send data to register account");
      setStatus("error");
      console.log(err, status, serverMessage);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John"
        />
      </label>
      <label>
        Surname:
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Doe"
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndoe@gmail.com"
        />
      </label>
      <label>
        password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="yourPassword"
        />
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
