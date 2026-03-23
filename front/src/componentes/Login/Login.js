import { useState } from "react";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

 async function entrar(e) {
  e.preventDefault();

  if (email === "" || senha === "") {
    setMensagem("Preencha todos os campos!");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    const dados = await resposta.json();

    setMensagem(dados.mensagem);

  } catch (erro) {
    setMensagem("Erro ao conectar com o servidor!");
  }

  setTimeout(() => {
    setMensagem("");
  }, 3000);
}

  return (
    <div className="container">

      <h2>Tela de Login</h2>

      <form onSubmit={entrar}>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e)=> setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>

      </form>

      <p>{mensagem}</p>

    </div>
  );
}

export default Login;