$(function () {
  // I read that this is the current syntax to write document.ready, I promise.
  console.log("script working");
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

    chirpsArray
      .slice(0)
      .reverse() // This flips the order of the array, ik it's gross. 
      .forEach((chirp) => {
        $("#chirps").append(
          `<div class="card m-3 col-4">
        <p class="card-header">${chirp.user}</p>
        <div class="card-body">
            <h5 class="card-text">${chirp.message}</h5>
        </div>
    </div>`
        );
      });
  });
});
