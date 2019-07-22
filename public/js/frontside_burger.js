$(document).ready(function() {

    function postCustomer (){
        if($("#customer_name").val().match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)) {
            var eatenBy = {
                customer_name: $("#customer_name").val().trim().toString()
            }
            $.ajax("/api/customers", {
                type: "POST",
                data: eatenBy
            }).then(function(res){
                if (!res[1]){
                    return alert("Don't be greedy! One free burger per person!")
                }
                else{
                    var CustomerId=res[0].id
                    eatBurger(CustomerId)
                }
            })
        }
        else{
            alert("Type your name!")
        }
    }

    function eatBurger (CustomerId){
        var id = $(".change_devoured").data("id")
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {
                id: id,
                CustomerId: CustomerId,
                devoured: true
            }
        }).then(
            function() {
                location.reload()
            }
        )
    }

    $(".change_devoured").on("click", function(event) {
        postCustomer()
    })

    function postCook (){
        if($("#cook_name").val().match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)) {
            var cookedBy = {
                cook_name: $("#cook_name").val().trim().toString()
            }
            $.ajax("/api/cooks", {
                type: "POST",
                data: cookedBy
            }).then(function(res){
                var CookId=res[0].id
                postBurger(CookId)
            })
        }
        else{
            alert("Type your name!")
        }
    }

    function postBurger (CookId){
        if($("#burger_name").val().match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)) {
            var newBurger = {
                burger_name: $("#burger_name").val().trim().toString(),
                CookId: CookId
            }
            $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
            }).then(
            function() {
                location.reload()
            })
        }
        else{
            alert("That's no name for a burger. Try harder!")
        }
    }

    $("#create-form").on("submit", function(event) {
        event.preventDefault()
        postCook()
    })
})