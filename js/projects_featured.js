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

    // Show the image and text for selected project in feature area
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

      //Remove u-hidden and add u-visible
      document.getElementById("section-featured").classList.remove('u-hidden');
      document.getElementById("section-featured").className += ' u-visible';


      // Check if featured image already
      if (featuredImageDiv.childNodes[1]) {

        // Remove previously featured
        featuredImageDiv.removeChild(featuredImageDiv.childNodes[1]);
        featuredTextDiv.removeChild(featuredTextDiv.childNodes[1]);
        // Since first child was just removed, formerly 2nd child now first child
        featuredTextDiv.removeChild(featuredTextDiv.childNodes[1]);

        // Add newly featured
        featuredImageDiv.appendChild(featuredImage);
        featuredTextDiv.appendChild(featuredTitle);
        featuredTextDiv.appendChild(featuredDescrip);
        featuredImageDiv.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

      } else {
        // If no featured image already
        // Add cloned image, title, descrip to featured area
        featuredImageDiv.appendChild(featuredImage);
        featuredTextDiv.appendChild(featuredTitle);
        featuredTextDiv.appendChild(featuredDescrip);
        featuredImageDiv.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }
    },

    closeFeature: function () {
      // console.log("closeFeature");
      document.getElementById("section-featured").classList.remove('u-visible');
      document.getElementById("section-featured").className += ' u-hidden';

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
      console.log("eventlisteners");
      // Setup to detect window width
      var w = window.innerWidth;

      // TODO On resize, update event listeners
      window.addEventListener('resize', resizeReset);

      // Listeners for showing project in featured area
      var divList = document.querySelectorAll('.list__container-image > img');
      for (var i = 0; i < divList.length; i++) {
        // console.log(divList[i]);
        // If window width greater than 600, listener to show top feature area
        if (w >= 600) {
          divList[i].addEventListener('click', updateFeature);
          divList[i].addEventListener('focus', updateFeature);
        } else {
          // Less than 600px, listener to scroll current project into view
          divList[i].addEventListener('click', function(el) {
            el.target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          });
        }
      }

      // Listener for close button
      document.getElementById('list__featured-close').addEventListener('click', UICtrl.closeFeature);
    }

    // When user resizes window, reset the listeners. Probably an edge case.
    var resizeReset = function() {
      console.log("replace eventlisteners");

      // Listeners for showing project in featured area
      var divList = document.querySelectorAll('.list__container-image > img');
      for (var i = 0; i < divList.length; i++) {

        // Remove listeners
          divList[i].removeEventListener('click', updateFeature);
          divList[i].removeEventListener('focus', updateFeature);
          divList[i].removeEventListener('click', function(el) {
            el.target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          });
        }

        setupEventListeners();
      }



    return {
      init: function() {
        console.log("Project Features JS started");
        setupEventListeners();
      }
    }

})(dataController, UIController);

controller.init();
