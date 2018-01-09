
var loadImage = (function() {
  window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");

    var newImage = document.createElement("img");
    newImage.className = "obligatory__image-crazy";
    newImage.src = "img/profile_crazy_cropped.jpg";
    newImage.setAttribute("alt", "Wacky Jess");

    var imageDiv = document.getElementById("obligatory__image-only");

    imageDiv.appendChild(newImage);
    });
  });

loadImage();
