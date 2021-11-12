// ------------------------- TABLE MESSAGE -------------------------

function traerInformacionMessage(){
    $.ajax({
        url:"http://155.248.211.93:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestaMessage(respuesta1);
        }
    });
}

function pintarRespuestaMessage(respuesta1){
    let myTable1="<table>";
    for(i=0;i<respuesta1.length;i++){
        myTable1+="<tr>";
        myTable1+="<td>"+respuesta1[i].messageText+"</td>";
        myTable1+="<td> <button onclick='actualizarInformacionMessage("+respuesta1[i].id+")'>Actualizar</button>";
        myTable1+="<td> <button onclick='borrarInformacionMessage("+respuesta1[i].id+")'>Borrar</button>";
        myTable1+="</tr>";
    }
    myTable1+="</table>";
    $("#resultado1").html(myTable1);
}

function guardarInformacionMessage(){
    let var1 = {
        messageText:$("#messageTextMessage").val(),
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        url:"http://155.248.211.93:8080/api/Message/save",
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
function actualizarInformacionMessage(idElemento){
    let myData1={
        id:idElemento,
        messageText:$("#messageTextMessage").val(),
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            $("#id").val("");
            $("#messageTextMessage").val("");
            traerInformacionMessage();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarInformacionMessage(idElemento){
    let myData1={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            traerInformacionMessage();
            alert("Se ha Eliminado.")
        }
    });
}