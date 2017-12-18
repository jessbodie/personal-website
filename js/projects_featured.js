var dataController = (function() {

     var prev = {
       image: '',
       title: '',
       descrip: ''
     };





     return {

       getPrev: function() {
         return prev;

       },

      updatePrev: function(cur) {

         var projToggleID = cur.parentNode.parentNode;

         // Title text (displayed on  mobile) from list for feature area
         var curProjTitle = projToggleID.nextSibling.nextSibling.childNodes[1].childNodes[1];

         // Descriptive text (displayed on  mobile) from list for feature area
         var curProjDescrip = projToggleID.nextSibling.nextSibling.childNodes[1].childNodes[3];

         prev.image = cur;
         prev.title = curProjTitle;
         prev.descrip = curProjDescrip;
        //  console.log(prev);
       }



     }


})();



var UIController = (function() {

  return {
    showFeature: function (projImage, prevFeature) {
      // Find parent Div of selected project, with ID
      var projToggleID = projImage.parentNode.parentNode;

      // Get title, descrip (displayed on  mobile only)
      var projTitle = projToggleID.nextSibling.nextSibling.childNodes[1].childNodes[1];
      var projDescrip = projToggleID.nextSibling.nextSibling.childNodes[1].childNodes[3];


      // Define where featured image and text should appear
      var featuredImageDiv = document.getElementById("feature-container").childNodes[1];
      var featuredTextDiv = document.getElementById("feature-container").childNodes[3];


      // Clone image, title, descrip that was selected from list
      var featuredImage = projImage.cloneNode();
      var featuredTitle = projTitle.cloneNode(true);
      var featuredDescrip = projDescrip.cloneNode(true);

      // Check if featured image already
      if (featuredImageDiv.childNodes[1]) {

        //Remove u-hidden and add u-visible
        document.getElementById("section-featured").classList.remove('u-visible');

        // Replace previous with newly selected
        featuredImageDiv.replaceChild(featuredImage, featuredImageDiv.childNodes[1]);
        featuredTextDiv.replaceChild(featuredTitle, featuredTextDiv.childNodes[1]);
        featuredTextDiv.replaceChild(featuredDescrip, featuredTextDiv.childNodes[2]);

        //Remove u-hidden and add u-visible
        document.getElementById("section-featured").className += ' u-visible';
        // TODO ADD SLOW TRANSITION BETWEEN NEW PROJECTS
        // TODO ADD WAY TO COLLAPSE THE FEATURED AREA


      } else {
        // Add cloned image, title, descrip to featured area
        featuredImageDiv.appendChild(featuredImage);
        featuredTextDiv.appendChild(featuredTitle);
        featuredTextDiv.appendChild(featuredDescrip);

        //Remove u-hidden and add u-visible
        document.getElementById("section-featured").classList.remove('u-hidden');
        document.getElementById("section-featured").className += ' u-visible';

      }



    }

  }



})();



var controller = (function(dataCtrl, UICtrl){


    var updateFeature = function(div) {

      // Get previous featured
      curFeature = dataCtrl.getPrev();
      // Show new featured
      UICtrl.showFeature(div.target, curFeature);
      // Set currently selected to previous featured
      dataCtrl.updatePrev(div.target);

    }

    var setupEventListeners = function() {
      console.log("event listeners");

      var divList = document.querySelectorAll('.list__container-image');
      for (var i = 0; i < divList.length; i++) {
        // console.log(divList[i]);
        divList[i].addEventListener('click', updateFeature);
        // TODO ADD FOR HOVER, FOCUS

      }

    }

    return {
      init: function() {
        console.log("started");
        setupEventListeners();
      }
    }

})(dataController, UIController);

controller.init();
