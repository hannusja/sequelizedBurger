$(document).ready(function() {
    console.log("Loaded")
    $(".change_devoured").on("click", function(event) {
        var id = $(this).data("id")
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {
                id: id,
                devoured: true
            }
        }).then(
            function() {
                location.reload()
            }
        )
    })

    function postCook (){
        $.ajax("/api/cooks", {
            type: "POST",
            data: cookedBy
        }).then( function(){
            postBurger()
        })
    }

    function postBurger (){
        $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
        }).then(
        function() {
            location.reload()
        })
    }

    $("#create-form").on("submit", function(event) {
        event.preventDefault()
        var newBurger = {
            burger_name: $("#burger_name").val().trim().toString()
        }
        var cookedBy = {
            cook_name: $("#cook_name").val().trim().toString()
        }
        postCook()
    })
})