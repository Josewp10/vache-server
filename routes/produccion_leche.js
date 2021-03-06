/**
 * Ruta encargada de gestionar por completo las peticiones
 * referentes a la información de los árboles genealógicos de los bovinos
 */
//Llamado a todas las librerías, servicios y controladores requeridos
const express = require("express");
const router = express.Router();
const _controlador = require("../controllers/produccion_leche");


/**
 * Petición: Traer todos registros de las producciones de leche.
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Producciones consultadas o mensaje de error
 */
router.get("/produccionLeche", (req, res) => {

  _controlador
    .consultarProducciones()
    .then(respuestaDB => {
      console.log(respuestaDB);
      let produccion = respuestaDB.rows;
      res.send({ ok: true, info: produccion, mensaje: "Producciones consultadas" });
    })
    .catch(error => {
      res.send(error);
    });
});

/**
 * Petición: Traer todos registros genealógicos.
 * Parámetros: id de la producción
 * Cuerpo: Vacío
 * Respuesta: Producción consultada o mensaje de error
 */
router.get('/produccionLeche/:lecheria', async (req, res) => {

    let lecheria = req.params.lecheria;
  
    _controlador.consultarProduccion(lecheria)
        .then((respuestaDB) => {
            let produccion = respuestaDB.rows;
            res.send({ok: true, info: produccion, mensaje: 'Produccion consultada'});
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        });
  });

/**
 * Petición: Traer registro de produccion especifico.
 * Parámetros: id de la producción
 * Cuerpo: Vacío
 * Respuesta: Producción consultada o mensaje de error
 */
 router.get('/produccionLeche/id/:id_Tproduccion', async (req, res) => {

  let id_Tproduccion = req.params.id_Tproduccion;

  _controlador.consultarProduccionId(id_Tproduccion)
      .then((respuestaDB) => {
          let produccion = respuestaDB.rows;
          res.send({ok: true, info: produccion, mensaje: 'Produccion consultada'});
      })
      .catch(error => {
          console.log(error);
          res.send(error);
      });
}); 

/**
 * Petición: Consulta los registros según el tipo de consulta
 * Parámetros: 
 *  -Tipo consulta:
 *    * registros: Todas las producciones registradas de una lechería.
 *    * litros: Cantidad total de leche producida en litros de una lechería.
 *  - id_lecheria.
 *  - fecha_inicio.
 *  - fecha_fin.
 * Cuerpo: Vacío.
 * Respuesta: Producciones consultadas o mensaje de error
 */
 router.get("/produccionLeche/fechas/:consulta/:id_lecheria/:fecha_inicio/:fecha_fin", (req, res) => {

  let consulta = req.params.consulta;
  let id_lecheria = req.params.id_lecheria; 
  let fecha_inicio = req.params.fecha_inicio;
  let fecha_fin = req.params.fecha_fin;

  
  switch (consulta) {
    case 'registros':      
      _controlador
      .consultarLecheriaFecha(id_lecheria, fecha_inicio, fecha_fin)
      .then(respuestaDB => {
        console.log(respuestaDB);
        let produccion = respuestaDB.rows;
        res.send({ ok: true, info: produccion, mensaje: "Producciones consultadas" });
      })
      .catch(error => {
        res.send(error);
      });
      break;
    case 'litros':
      
      _controlador
      .consultarCantidadLecheriaFecha(id_lecheria, fecha_inicio, fecha_fin)
      .then(respuestaDB => {
        console.log(respuestaDB);
        let produccion = respuestaDB.rows;
        res.send({ ok: true, info: produccion, mensaje: "Total litros producidos consultados" });
      })
      .catch(error => {
        res.send(error);
      });
      break;
    default:
      break;
  }

});

/**
 * Petición: Almacena un registro de produccion de leche
 * Parámetros: vacío
 * Cuerpo: Todos los datos del registro produccion de leche
 * Respuesta: Produccion de leche almacenada o mensaje de error
 */
router.post("/produccionLeche", (req, res) => {
  try {
    let info_lecherias = req.body;

    _controlador.validarProduccion(info_lecherias);

    _controlador
    .insertarProduccion(info_lecherias)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: " guardada", info: info_lecherias });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
      console.log(error); 
    res.send(error);
  }
});

/**
 * Petición: Eliminar la información de un registro genealógico
 * Parametros: id del bovino
 * Cuerpo: Vacío
 * Respuesta: Registro genealógico eliminado o mensaje de error
 */
  router.delete("/produccionLeche/:id_produccion", (req, res) => {
    let id = req.params.id_produccion;
    
    _controlador.eliminarProduccion(id)
    .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Produccion eliminada", info: { id } });
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  });


  /**
 * Petición: Actualizar la información de producción
 * Parametros: id de producción
 * Cuerpo: Todos los datos de la producción
 * Respuesta: Producción actualizada o mensaje de error
 */
router.put("/produccionLeche/:id_Tproduccion", (req, res) => {
  try {
    //Capturar el body desde la solicitud
    let id_Tproduccion = req.params.id_Tproduccion;
    let produccion = req.body;

    _controlador.validarProduccion(produccion);

    // Actualiza una producción en base de datos
    _controlador
    .editarProduccion(produccion, id_Tproduccion)
      .then((respuestaDB) => {
        res.send({ ok: true, mensaje: "Producción editada", info: produccion });
      })
      .catch((error) => {
          console.log(error);
        res.send(error);
      });

    // Responder
  } catch (error) {
      console.log(error);
    res.send(error);
  }
});
  
  module.exports = router;