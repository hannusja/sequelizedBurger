$(document).ready(function() {
    var id
    var customers_name
    var eatenBy
    var CustomerId

    function postCustomer (){
        if(customers_name.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)) {
            $.ajax("/api/customers", {
                type: "POST",
                data: eatenBy
            }).then(function(res){
                if (!res[1]){
                    return alert("Don't be greedy! One free burger per person!")
                }
                else{
                    CustomerId=res[0].id
                    eatBurger()
                }
            })
        }
        else {
            return alert("Type your name!")
        }
    }

    function eatBurger (){
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

    $(".change_devoured").on("submit", function(event) {
        event.preventDefault()
        id = $(this).data("id")
        customers_name=$(this).find("input").val().trim().toString()
        eatenBy = {
            customer_name: customers_name 
        }
        postCustomer()
    })

})