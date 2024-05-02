
const finishDB = (db) => {
    db.end((err) => {
        if (err) {
          console.error(
            "Error al cerrar la conexión:",
            err.message
          );
        } else {
          console.log("Conexión cerrada exitosamente.");
        }
      });
}

module.exports = {finishDB}