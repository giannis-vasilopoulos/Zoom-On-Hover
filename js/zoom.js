(function(window) {
  function define_library() {
    // Create the library object and all its properties and methods.
    var vanillaZoom = {};
    vanillaZoom.init = function(el) {
      // Our library's logic goes here.
      var container = document.querySelector(el);

        if(!container) {
            console.error('Please specify the correct class of your gallery.');
            return;
        }

        var firstSmallImage = container.querySelector('.small-preview');
        var zoomedImage = container.querySelector('.zoomed-image');

        if(!zoomedImage) {
            console.error('Please add a .zoomed-image element to your gallery.');
            return;
        }

        if(!firstSmallImage) {
            console.error('Please add images with the .small-preview class to your gallery.');
            return;
        }
        else {
            // Set the source of the zoomed image.
            zoomedImage.style.backgroundImage = 'url('+ firstSmallImage.src +')';
        }

        container.addEventListener("click", function (event) {
          var elem = event.target;

          if (elem.classList.contains("small-preview")) {
              zoomedImage.style.backgroundImage = 'url('+ elem.src +')';
          }
        });
        zoomedImage.addEventListener('mouseenter', function(e) {
        this.style.backgroundSize = "250%"; 
        }, false);



        zoomedImage.addEventListener('mousemove', function(e) {

        // getBoundingClientReact gives us various information about the position of the element.
        var dimensions = this.getBoundingClientRect();

        // Calculate the position of the cursor inside the element (in pixels).
        var x = e.clientX - dimensions.left;
        var y = e.clientY - dimensions.top;

        // Calculate the position of the cursor as a percentage of the total size of the element.
        var xpercent = Math.round(100 / (dimensions.width / x));
        var ypercent = Math.round(100 / (dimensions.height / y));

        // Update the background position of the image.
        this.style.backgroundPosition = xpercent+'% ' + ypercent+'%';

      }, false);

      zoomedImage.addEventListener('mouseleave', function(e) {
          this.style.backgroundSize = "cover"; 
          this.style.backgroundPosition = "center"; 
      }, false);

    }
    return vanillaZoom;
  }

  // Add the vanillaZoom object to global scope if its not already defined.
  if(typeof(vanillaZoom) === 'undefined') {
    window.vanillaZoom = define_library();
  }
  else{
    console.log("Library already defined.");
  }
})(window);

