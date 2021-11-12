// ------------------------- TABLE RESERVATION -------------------------

function traerInformacionReservation(){
    $.ajax({
        url:"http://155.248.211.93:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestaReservation(respuesta1);
        }
    });
}

function pintarRespuestaReservation(respuesta1){
    let myTable1="<table>";
    for(i=0;i<respuesta1.length;i++){
        myTable1+="<tr>";
        myTable1+="<td>"+respuesta1[i].startDate+"</td>";
        myTable1+="<td>"+respuesta1[i].devolutionData+"</td>";
        myTable1+="<td> <button onclick='actualizarInformacionReservation("+respuesta1[i].id+")'>Actualizar</button>";
        myTable1+="<td> <button onclick='borrarInformacionReservation("+respuesta1[i].id+")'>Borrar</button>";
        myTable1+="</tr>";
    }
    myTable1+="</table>";
    $("#resultado1").html(myTable1);
}

function guardarInformacionReservation(){
    let var1 = {
        startDate:$("#startDateReservation").val(),
        devolutionData:$("#devolutionDataReservation").val()
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        url:"http://155.248.211.93:8080/api/Reservation/save",
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
function actualizarInformacionReservation(idElemento){
    let myData1={
        id:idElemento,
        startDate:$("#startDateReservation").val(),
        devolutionData:$("#devolutionDataReservation").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            $("#id").val("");
            $("#startDateReservation").val("");
            $("#devolutionDataReservation").val("");
            traerInformacionReservation();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarInformacionReservation(idElemento){
    let myData1={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            traerInformacionReservation();
            alert("Se ha Eliminado.")
        }
    });
}