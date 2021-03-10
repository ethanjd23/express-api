$(function () {
  // I read that this is the current syntax to write document.ready, I promise.
  console.log("script working");
  getAndRenderChirps();

  $("#post-button").click(postNewChirp);
});

function getAndRenderChirps() {
    $.get("/api/chirps", function (json) {
        let ids = Object.keys(json);
    
        let chirpsArray = ids.map((id) => {
          return {
            id: id,
            user: json[id].user,
            message: json[id].message,
          };
        }); // Creating an array of objects from the JSON
        chirpsArray.pop(); // deleting nextid off each object
        console.log(chirpsArray);
    
        for (const id in chirpsArray) {
            let deleteBtn = $(`<button class="btn btn-danger btn-sm">Delete</button>`).click(() => {
                console.log(id);
                $.ajax({
                    type: "DELETE", 
                    url: `/api/chirps/${id}`
                }).then((response) => {
                    console.log(response);
                    $("#chirps").empty();
                    getAndRenderChirps();
                })
            });
            $(
              `<div class="card m-3 col-4">
            <p class="card-header">${chirpsArray[id].user}</p>
            <div class="card-body">
            <h5 class="card-text">${chirpsArray[id].message}</h5>            
            </div>
            </div>`
            ).appendTo("#chirps").append(deleteBtn);
      };

        })};


function postNewChirp() {
    let newUsername = $("#usernameInput").val();
    let newMessage = $("#messageInput").val();
    let newChirp = { user: newUsername, message: newMessage };
    $.ajax({
        type: "POST",
        url: "/api/chirps",
        data: JSON.stringify(newChirp),
        contentType: "application/json"
    }).then(() => {
        $("#chirps").empty();
        getAndRenderChirps();
    })
    
    $("#usernameInput").val('');
    $("#messageInput").val('');
}

function deleteChirp(id) {
    $.ajax({
        type: "DELETE", 
        url: `/api/chirps/${id}`
    }).then((response) => {
        console.log(response);
        $("#chirps").empty();
        getAndRenderChirps();
    })
}