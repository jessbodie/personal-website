// Pic data for Drag and Drop
var RolePic = function(id, fileName, altText) {
     this.id = id;
     this.fileName = fileName;
     this.altText = altText;
};

var rolePics = [
     roleColleague = new RolePic("colleague", "tina3.jpg", "Liz Lemon (Tina Fey)"),
     roleFriend = new RolePic("friend", "joan.jpg", "Permanent BFF (Joan Cusack"),
     roleMom = new RolePic("mom", "lois.jpg", "Lois Wilkerson (Jane Kaczmarek)"),
     roleWife = new RolePic("wife", "courtney.jpg", "Courtney Love"),
     roleDaughter = new RolePic("daughter", "marcia.jpg", "Marcia Brady (Maureen McCormick)"),
     roleBowie = new RolePic(null,"bowie_you_awesome.webp", "David Bowie thinks you are awesome!")
];

// Set up for drop zones on the page
var dropZones = [];

// Sets up event listeners
function init () {
     // Show first pic to drag
     document.addEventListener('DOMContentLoaded', showPic);
     dragNDrop();
}

function dragNDrop() {
     // The pic that is being dragged
     var draggedPic;
     
     // When drag event starts, assign variable, set up to allow drag and drop
     document.querySelector(".pic-to-drag").addEventListener("dragstart", function(event) {
          draggedPic = event.target;
          console.log(draggedPic);
          console.log(event);
          event.dataTransfer.setData("text/uri-list", null);
          event.dataTransfer.setData("text/plain", null);
          event.dataTransfer.effectAllowed = "move";
     }, false);

     ////////////////TODO////////////////////
     // Need to do touchstart, touchend, touchmove, touchcancel
/*     document.querySelector(".pic-to-drag").addEventListener("touchstart", function(event) {
          draggedPic = event.target;
          console.log(draggedPic);
          console.log(event);
          event.dataTransfer.setData("text/uri-list", null);
          event.dataTransfer.setData("text/plain", null);
          event.dataTransfer.effectAllowed = "move";
     }, false);
*/
     // Add listeners for all the boxes that are drop zones
     dropZones = document.querySelectorAll(".drop-here");
     for (i = 0; i < dropZones.length; i++) {

          // onDragover: allow drop (default is not to allow it)
          dropZones[i].addEventListener("dragover", function(event) {
               if (event.target.className == "drop-here") {
                    event.preventDefault();
               }
          }, false);


          // onDragenter: change box color
          dropZones[i].addEventListener("dragenter", function(event) {
               if (event.target.className == "drop-here") {
                    event.target.style.background = "#44355B";
               }
          }, false);
          
          // onDragleave: reset box color
          dropZones[i].addEventListener("dragleave", function(event) {
               if (event.target.className == "drop-here") {
                    event.target.style.background = "white";
               }
          }, false);
          
          // onDrop: allow drop (default is prevent), reset box color
          dropZones[i].addEventListener("drop", function(event) {
               event.preventDefault();
               event.target.style.background = "white";

               // Check if box id matches pic id and allow drop and then
               // Remove dragged pic from top space and data and add to correct box
               if (event.target.className == "drop-here" && event.target.id === draggedPic.id) {
                    document.querySelector(".pic-to-drag").removeChild(draggedPic);
                    event.target.appendChild(draggedPic);
                    rolePics.shift();

                    // Show next pic to drag again
                    showPic();
                    
               }
          }, false);
               
     }
}

// Show pic from array
function showPic() {

     var nextImage = document.createElement("img");
     nextImage.src = "img/roles/" + rolePics[0].fileName;
     nextImage.id = rolePics[0].id;
     nextImage.alt = rolePics[0].altText;
     document.querySelector(".pic-to-drag").appendChild(nextImage);
}
     


// Begin
init();
