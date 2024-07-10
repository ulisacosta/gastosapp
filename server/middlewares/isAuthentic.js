const dbConnect = require("../config/mysql");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { finishDB } = require("../util/finishDB");

module.exports.isAuthenticated = async (req, res, next) => {
  const db = dbConnect();

  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      db.query(
        "SELECT users.* FROM users WHERE id_user = ?",
        [decoded.id],
        (err, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];

          // Verificar si el token está a punto de expirar
          const tokenExpiry = decoded.exp * 1000; // La expiración del token en milisegundos
          const currentTime = Date.now();

          if (tokenExpiry - currentTime < 60000) {
            // Redirigir si el token está a punto de expirar en menos de 1 minuto
            console.log("El token expiró");
            finishDB(db);
           return res.redirect('/login');
          }
          finishDB(db);
          return next();
        }
      );
    } catch (error) {
      console.error("Error al verificar el token:", error);
      finishDB(db);
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  } else {
    console.log("No hay token en las cookies");
    finishDB(db);
    return res.redirect('/login')
  
  }
};
