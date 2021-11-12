// ------------------------- TABLE CATEGORY -------------------------

function traerInformacionCategory(){
    $.ajax({
        url:"http://155.248.211.93:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta1){
            console.log(respuesta1);
            pintarRespuestaCategory(respuesta1);
        }
    });
}

function pintarRespuestaCategory(respuesta1){
    let myTable1="<table>";
    for(i=0;i<respuesta1.length;i++){
        myTable1+="<tr>";
        myTable1+="<td>"+respuesta1[i].name+"</td>";
        myTable1+="<td>"+respuesta1[i].description+"</td>";
        myTable1+="<td> <button onclick='actualizarInformacionCategory("+respuesta1[i].id+")'>Actualizar</button>";
        myTable1+="<td> <button onclick='borrarInformacionCategory("+respuesta1[i].id+")'>Borrar</button>";
        myTable1+="</tr>";
    }
    myTable1+="</table>";
    $("#resultado1").html(myTable1);
}

function guardarInformacionCategory(){
    let var1 = {
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val()
        };
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var1),
        url:"http://155.248.211.93:8080/api/Category/save",
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
function actualizarInformacionCategory(idElemento){
    let myData1={
        id:idElemento,
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val()
    };
    console.log(myData1);
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            traerInformacionCategory();
            alert("se ha Actualizado correctamente la categoria")
        }
    });
}

function borrarInformacionCategory(idElemento){
    let myData1={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData1);
    $.ajax({
        url:"http://155.248.211.93:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta1){
            $("#resultado1").empty();
            traerInformacionCategory();
            alert("Se ha Eliminado.")
        }
    });
}