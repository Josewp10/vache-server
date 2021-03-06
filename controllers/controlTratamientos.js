/**
 * Controlador encargado de validar las peticiones contra la base de datos
 * para la gestión de controles de tratamiento
 */

//Llamado a todas las librerías y servicios requeridos
const ServicePG = require("../services/postgres");
let _service = new ServicePG();

/**
 * @description Se toma el parametro con la información del control de tratamiento y se valida:
 *  - Que no sea vacío
 *  - Que contenga los campos: fecha_inicio, fecha_fin, hora, enfermedad, detalles, tipo_dosis, id_bovino, id_usuario.
 * @param {Object} tratamiento 
 */
let validar = tratamiento => {
  if (!tratamiento) {
      throw { ok: false, mensaje: "La información del Control del Tratamiento de Leche es obligatoria" };
  } else if (!tratamiento.fecha_inicio) {
      throw { ok: false, mensaje: "El Fecha de Inicio es obligatoria" };
  } else if (!tratamiento.fecha_fin) {
      throw { ok: false, mensaje: "El Fecha de finalizacion es obligatoria" };
  } else if (!tratamiento.hora) {
      throw { ok: false, mensaje: "La hora es obligatoria" };
  } else if (!tratamiento.enfermedad) {
      throw { ok: false, mensaje: "La enfermedad son Obligatoria" };
  } else if (!tratamiento.detalles) {
      throw { ok: false, mensaje: "la descripcion del detalle es obligatorio" };
  }
  else if (!tratamiento.tipo_dosis) {
      throw { ok: false, mensaje: "El Id del tipo de dosis es obligatorio" };
  }
  else if (!tratamiento.id_bovino) {
    throw { ok: false, mensaje: "El Id del bovino es obligatorio" };
}
else if (!tratamiento.id_usuario) {
  throw { ok: false, mensaje: "El Id del usuario es obligatorio" };
}
};

/**
 * @description Consulta la información de todos los controles de tratamientos en la base de datos.
 * @param {Object} tratamiento 
 * @returns 
 */
const ver_tratamiento = async (tratamiento) => {    
  let sql = `SELECT "ControlTratamientos".id_tratamiento, "ControlTratamientos".fecha_inicio, "ControlTratamientos".fecha_fin,
          "ControlTratamientos".hora, "ControlTratamientos".enfermedad, "ControlTratamientos".detalles, 
          "TipoDosis".tipo as tipoDosis, "ControlTratamientos".id_bovino,"Bovinos".nombre as Bovino, "Usuarios".nombre as usuario
          FROM public."ControlTratamientos"
          INNER JOIN public."Bovinos" ON "ControlTratamientos".id_bovino= "Bovinos"."chapeta"
          INNER JOIN public."Usuarios" ON "ControlTratamientos".id_usuario = "Usuarios"."id_usuario"
          INNER JOIN public."TipoDosis" ON "ControlTratamientos".tipo_dosis = "TipoDosis"."id_tipo"
          where id_tratamiento>0 ORDER BY id_tratamiento ASC;`
  ;
  let respuesta = await _service.ejecutarSql(sql);
  return respuesta
};

/**
 * @description Conculta toda la información de un control de tratamiento en específico de la base de datos.
 * @param {int} id_tratamiento 
 * @returns 
 */
let consultarporControl = async (id_tratamiento) => {
  let sql = `SELECT "ControlTratamientos".id_tratamiento, "ControlTratamientos".fecha_inicio, "ControlTratamientos".fecha_fin,
        "ControlTratamientos".hora, "ControlTratamientos".enfermedad, "ControlTratamientos".detalles, 
        "TipoDosis".tipo as tipoDosis, "ControlTratamientos".id_bovino, "Bovinos".nombre as Bovino, "Usuarios".nombre as usuario
        FROM public."ControlTratamientos"
        INNER JOIN public."Bovinos" ON "ControlTratamientos".id_bovino= "Bovinos"."chapeta"
        INNER JOIN public."Usuarios" ON "ControlTratamientos".id_usuario = "Usuarios"."id_usuario"
        INNER JOIN public."TipoDosis" ON "ControlTratamientos".tipo_dosis = "TipoDosis"."id_tipo"
        WHERE id_tratamiento = $1;`;
          
  let respuesta = await _service.ejecutarSql(sql, [id_tratamiento]);
  return respuesta;
};

/**
 * @description Almacena un control de tratamiento en la base de datos.
 * @param {Object} tratamiento 
 * @returns 
 */
  let crear_tratamiento = async (tratamiento) => {
    let sql = `INSERT INTO public."ControlTratamientos"( fecha_inicio, fecha_fin, hora, enfermedad, detalles, tipo_dosis, id_bovino, id_usuario)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8 )`;
        
        let values = [
         
          tratamiento.fecha_inicio,
          tratamiento.fecha_fin,
          tratamiento.hora,
          tratamiento.enfermedad,
          tratamiento.detalles,
          tratamiento.tipo_dosis,
          tratamiento.id_bovino,
          tratamiento.id_usuario];
      
          let respuesta = await _service.ejecutarSql(sql, values);
          return respuesta;
  };

  
/**
 * @description Actualiza la información de un control de tratamiento en la base de datos. 
 * @param {Object} tratamiento 
 * @param {int} id_tratamiento 
 * @returns 
 */
  const editar_tratamiento = async (tratamiento,id_tratamiento) => {
    if (tratamiento.id_tratamiento != id_tratamiento) {
      throw {
        ok: false,
        mensaje: "El id del control tratamiento no corresponde al enviado",
      };
    }
    let sql =
      `UPDATE public."ControlTratamientos" SET fecha_inicio=$1, fecha_fin=$2, hora=$3, 
      enfermedad=$4, detalles=$5,tipo_dosis=$6, id_bovino=$7, id_usuario=$8
      WHERE id_tratamiento = $9;`;
      let values = [
        tratamiento.fecha_inicio,
        tratamiento.fecha_fin,
        tratamiento.hora,
        tratamiento.enfermedad,
        tratamiento.detalles,
        tratamiento.tipo_dosis,
        tratamiento.id_bovino,
        tratamiento.id_usuario,
        id_tratamiento];
    
        let respuesta = await _service.ejecutarSql(sql, values);
        return respuesta;
  };

/**
 * @description Elimina un control de tratamiento de la base de datos.
 * @param {int} id_tratamiento 
 * @returns 
 */
  const eliminar_tratamiento = async (id_tratamiento) => {
    let sql = `DELETE FROM public."ControlTratamientos"	WHERE id_tratamiento = $1`;    
    let respuesta = await _service.ejecutarSql(sql, [id_tratamiento]);
    return respuesta
};
   
  module.exports = {
    ver_tratamiento, 
    crear_tratamiento,
    editar_tratamiento,
    eliminar_tratamiento,
    validar,
    consultarporControl
  };