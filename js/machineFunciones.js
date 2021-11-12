// ------------------------- TABLE MACHINE -------------------------

function traerInformacionMachine(){
    $.ajax({
        url:"http://155.248.211.93:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestaMachine(respuesta1);
        }
    });
}

function pintarRespuestaMachine(respuesta1){
    let myTable1="<table>";
    for(i=0;i<respuesta1.length;i++){
        myTable1+="<tr>";
        myTable1+="<td>"+respuesta1[i].name+"</td>";
        myTable1+="<td>"+respuesta1[i].brand+"</td>";
        myTable1+="<td>"+respuesta1[i].year+"</td>";
        myTable1+="<td>"+respuesta1[i].description+"</td>";
        myTable1+="<td> <button onclick='actualizarInformacionMachine("+respuesta1[i].id+")'>Actualizar</button>";
        myTable1+="<td> <button onclick='borrarInformacionMachine("+respuesta1[i].id+")'>Borrar</button>";
        myTable1+="</tr>";
    }
    myTable1+="</table>";
    $("#resultado1").html(myTable1);
}

function guardarInformacionMachine(){
    let var1 = {
        name:$("#nameMachine").val(),
        brand:$("#brandMachine").val(),
        year:$("#yearMachine").val(),
        description:$("#descriptionMachine").val()
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        url:"http://155.248.211.93:8080/api/Machine/save",
        success:function(respuesta1) {
            console.log(respuesta1);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}
function actualizarInformacionMachine(idElemento){
    let myData1={
        id:idElemento,
        name:$("#nameMachine").val(),
        brand:$("#brandMachine").val(),
        year:$("#yearMachine").val(),
        description:$("#descriptionMachine").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Machine/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            $("#id").val("");
            $("#nameMachine").val("");
            $("#brandMachine").val("");
            $("#yearMachine").val("");
            $("#descriptionMachine").val("");
            traerInformacionMachine();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarInformacionMachine(idElemento){
    let myData1={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Machine/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            traerInformacionMachine();
            alert("Se ha Eliminado.")
        }
    });
}