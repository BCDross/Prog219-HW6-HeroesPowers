
function ToDo(ptitle, pDetail, pPriority) {
    this.title= ptitle;
    this.detail = pDetail;
    this.priority = pPriority;
  }
  var ClientToDos = [];  // don't really need this intermediate array, but if we want to allow
  // edits to existing ones, it would then be useful

document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("submit").addEventListener("click", function () {
        var tTitle = document.getElementById("title").value;
        var tDetail = document.getElementById("detail").value;
        var tPriority = document.getElementById("priority").value;
        var oneToDo = new ToDo(tTitle, tDetail, tPriority);

        $.ajax({
            url: '/NewTodo' ,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(oneToDo),
            success: function (result) {
            console.log("Added new ToDo" );
            }

        });
    });

    document.getElementById("get").addEventListener("click", function () {
        
        var listDiv = document.getElementById('listDiv');
        //listDiv.parentNode.removeChild();
        listDiv.innerHTML = "";
        
        var ul = document.createElement('ul')

        $.get("/ToDos", function(data, status){  // AJAX get
            ClientNotes = data;  // put the returned server json data into our local array
            listDiv.appendChild(ul);
            ClientNotes.forEach(ProcessOneNote); // build one li for each item in array

            function ProcessOneNote(item, index) {
                var li = document.createElement('li');
                ul.appendChild(li);
    
                li.innerHTML=li.innerHTML + index + ": " + " Priority: " + item.priority + "  " + item.title + ":  " + item.detail;
            }
        });


      
    });

   
});

