const express = require("express"); 
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ mensagem: "Preencha todos os campos!" });
  }

  fs.readFile(__dirname + "/usuarios.json", "utf8", (err, data) => {
    if (err) {
      return res.json({ mensagem: "Erro ao ler o banco de dados!" });
    }

    const usuarios = JSON.parse(data);

    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
      return res.json({ mensagem: "Email ou senha inválidos!" });
    }

    bcrypt.compare(senha, usuario.senha, (err, resultado) => {
      if (resultado) {
        return res.json({ mensagem: "Login realizado com sucesso!" });
      } else {
        return res.json({ mensagem: "Email ou senha inválidos!" });
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});