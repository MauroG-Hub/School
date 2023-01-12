/*
let egresos = {
    Renta: 900,
    Ropa: 400
};

let ingresos = {
    Quincena: 9000,
    Venta: 400
};
*/

const ingresos = [];
ingresos.push(new Ingreso(`Salario`, 2000));
ingresos.push(new Ingreso(`Venta auto`,5000));

const egresos = [];
egresos.push(new Egreso(`Renta`, 4000));
egresos.push(new Egreso(`Ropa`, 800));


const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

const cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto)  + ' MXN';
    document.getElementById("ingresos").innerHTML = "+" + formatoMoneda(totalIngresos()) + ' MXN';
    document.getElementById("egresos").innerHTML = "-" + formatoMoneda(totalEgresos()) + ' MXN';
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);


    //Instrucciones de Debug
    /*
    console.log(formatoMoneda(presupuesto));
    console.log(formatoPorcentaje(porcentajeEgreso));
    console.log(formatoMoneda(totalIngresos()));
    console.log(formatoMoneda(totalEgresos()));
    */
}

/*
const totalIngresos = () => {
    let totalIngresos = 0;
    Object.values(ingresos).forEach((element) => { totalIngresos += element })
    return totalIngresos;
}

const totalEgresos = () => {
    let totalEgresos = 0;
    Object.values(egresos).forEach((element) => { totalEgresos += element })
    return totalEgresos;
}
*/

const totalIngresos = () => {
    let totalIngresos = 0;
    ingresos.forEach((element) => { totalIngresos += element.valor })
    return totalIngresos;
}

const totalEgresos = () => {
    let totalEgresos = 0;
    egresos.forEach((element) => { totalEgresos += element.valor })
    return totalEgresos;
}

const formatoMoneda = (Value) => {
    return Value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (Value) => {
    return Value.toLocaleString('es-MX', { style: 'percent', minimumFractionDigits: 2 });
}

const cargarIngresos = () =>{
    let ingresosHTML="";
    ingresos.forEach((element) => {
        ingresosHTML += crearIngresoHTML(element);
    })
    
    document.getElementById("listaIngresos").innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            <p>${ingreso.descripcion}</p>
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                <p>+${formatoMoneda(parseInt(ingreso.valor))} MXN</p>
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" type="button">
                    <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    
    let indiceEliminar = ingresos.findIndex(item => item.id === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();

    
}


const cargarEgresos = () =>{
    let egresosHTML="";
    egresos.forEach((element) => {
        egresosHTML += crearEgresoHTML(element);
    })
    
    document.getElementById("listaEgresos").innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            <p>${egreso.descripcion}</p>
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                <p>-${formatoMoneda(parseInt(egreso.valor))} MXN</p>
            </div>
            <div class=" elemento_porcentaje">
                <p>${formatoPorcentaje(egreso.valor/totalEgresos())}</p>
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" type="button">
                    <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;

    return egresoHTML;
}

const eliminarEgreso = (id) => {
    
    let indiceEliminar = egresos.findIndex(item => item.id === id);
    console.log(egresos);
    console.log(indiceEliminar);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
}



const agregarDato = () => {

    const forma = document.getElementById("forma");
    const tipo = forma.elements.tipo.value;
    const descripcion = forma.elements.descripcion.value;
    const valor = parseInt(forma.elements.valor.value);

    if(tipo == `ingreso`){
        const nuevoIngreso = new Ingreso(descripcion, valor);
        ingresos.push(nuevoIngreso);
    }
    else if(tipo == `egreso`)
    {
        const nuevoEgreso = new Egreso(descripcion, valor);
        egresos.push(nuevoEgreso);
    }


    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

    document.getElementById("descripcion").value = "";
    document.getElementById("valor").value = null;

}
