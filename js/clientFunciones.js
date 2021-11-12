// ------------------------- TABLE CLIENT -------------------------

function traerInformacionClient(){
    $.ajax({
        url:"http://155.248.211.93:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestaClient(respuesta1);
        }
    });
}

function pintarRespuestaClient(respuesta1){
    let myTable1="<table>";
    for(i=0;i<respuesta1.length;i++){
        myTable1+="<tr>";
        myTable1+="<td>"+respuesta1[i].email+"</td>";
        myTable1+="<td>"+respuesta1[i].password+"</td>";
        myTable1+="<td>"+respuesta1[i].name+"</td>";
        myTable1+="<td>"+respuesta1[i].age+"</td>";
        myTable1+="<td> <button onclick='actualizarInformacionClient("+respuesta1[i].id+")'>Actualizar</button>";
        myTable1+="<td> <button onclick='borrarInformacionClient("+respuesta1[i].id+")'>Borrar</button>";
        myTable1+="</tr>";
    }
    myTable1+="</table>";
    $("#resultado1").html(myTable1);
}

function guardarInformacionClient(){
    let var1 = {
        email:$("#emailClient").val(),
        password:$("#passwordClient").val(),
        name:$("#nameClient").val(),
        age:$("#ageClient").val()
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        url:"http://155.248.211.93:8080/api/Client/save",
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
function actualizarInformacionClient(idElemento){
    let myData1={
        id:idElemento,
        email:$("#emailClient").val(),
        password:$("#passwordClient").val(),
        name:$("#nameClient").val(),
        age:$("#ageClient").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            $("#id").val("");
            $("#emailClient").val("");
            $("#passwordClient").val("");
            $("#nameClient").val("");
            $("#ageClient").val("");
            traerInformacionClient();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarInformacionClient(idElemento){
    let myData1={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            traerInformacionClient();
            alert("Se ha Eliminado.")
        }
    });
}