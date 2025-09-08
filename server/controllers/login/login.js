const dbConnect = require("../../config/mysql");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { finishDB } = require("../../util/finishDB");

module.exports.login = (req, res) => {
  const db = dbConnect();
  try {
    const { user, password } = req.body;

    /* SI NO INGRESARON USUARIO O CONTRASEÑA */
    if (!user || !password) {
      finishDB(db);
      return res.status(400).json({ error: "Usuario y/o contraseña no proporcionados" });
      
    } else {
        /* Consulta para verificar inputs */
      const sqlLogin =
        "SELECT users.* FROM users WHERE users.user = ? || users.email = ?";

      db.query(sqlLogin, [user, user], async (errLogin, resultLogin) => {
        
      
        if (errLogin) {
          /* console.log(errLogin); */
          finishDB(db);
          return res.status(500).json({ error: "Error interno del servidor" });
          /* VERIFICA SI LA CONTRASEÑA O EL USUARIO ESTÁN CORRECTOS */
        } else if (resultLogin.length == 0 || ! (await bcryptjs.compare(password, resultLogin[0].password))) {
          finishDB(db);
          return res.status(401).json({ error: "Usuario y/o contraseña incorrecto" });
        } else {
          const id = resultLogin[0].id_user;
          
          const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIME_EXPIRE,
          });

          const cookiesOptions = {
            httpOnly: true,
            sameSite: "None", 
            secure: true, 
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            )
          };
          res.cookie("jwt", token, cookiesOptions);
          finishDB(db);
          return res.status(200).json({ message: "inicio de sesión exitoso",token });
        }
      });
    }
  } catch (error) {
  /*   console.log(error); */
  finishDB(db);
   return res.status(500).json({ error: "Error interno del servidor" });
  }
};
