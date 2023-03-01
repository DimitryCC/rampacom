function filtroIdioma(listaSF, idioma) {
    if (idioma==null){
        return listaSF.filter(element => element.idiomaId == 1);;
    }else{
        return listaSF.filter(element => element.idiomaId == idioma);
    }
}
export default filtroIdioma;