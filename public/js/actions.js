var actions = new Actions();

$( document ).ready(function() {
   $("#add-place-button").click(function(){

       $("#cover-panel").show();
       $("#list-panel").hide();
       actions.addPlace();
   });
});

function Actions() {
  this.search = function(searchText){
  };

  this.addPlace = function(name, postcode){
    $.ajax({
      url: 'places',
      method:'POST',
      data: {
        name: name,
        postcode: postcode,
      },
      success: function(json){
        this.renderTrackedList();
      }
    });
  };

  this.renderTrackedList = function(){
    var $trackedList = $('#tracked-list');

    $.ajax({
      url: "places",
      success: function(json){
        var listElements = json.data.map(function(element){
          return "<li>"+element.name+" - "+element.postcode+"</li>";
        });
        $trackedList.html(listElements.join(''));
      }
    });
  };
}
