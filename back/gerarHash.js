const bcrypt = require("bcrypt");

const senha = "54321";

bcrypt.hash(senha, 10).then(hash => {
  console.log(hash);
});
 //"Admin@1234"
 //Teste@123
 //12345
 //54321