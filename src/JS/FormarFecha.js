function FormarFecha(fechaFormulario) {
    let fecha = new Date(fechaFormulario);
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();
    let nuevaFecha = dia + "-" + mes + "-" + anio;
    return nuevaFecha;
}
export default FormarFecha;