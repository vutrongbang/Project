//================
// load data ...
//================
var database = [];
$.getJSON("js/pizza.json")
    .done(function (result) {
        database = result;
    })
    .fail(function () {
        alert("Get data that bai ");
    });
//  load datablog

var datablog = [];
$.getJSON("js/blog.json")
    .done(function (result) {
        datablog = result;
    })
    .fail(function () {
        alert("Get data that bai ");
    });
// modal menu
jQuery(document).ready(function ($) {
    var params = {}
    var products
    var authorArr
    $(document).on('click', '.data-product', function () {
        let id = $(this).data('id')
        let product = database.filter(e => e.id == id)
        console.log("id " + id)
        console.log("product " + product)

        addModal(product[0])
        $('#modal-id').modal('show')
    })

    function addModal(data) {
        let x = `   <div class="row">
                            <div class='col-md-6'> <img src='images/${data.image}' alt='' > </div>
                                <div class='col-md-6'>
                                    <h3>${data.name}</h3>
                                    <p>Mô tả: ${data.description}</p>
                                    <p>Giá: ${data.price}</p>
                                </div>
                            </div>
    
                            <div class="modal-footer" >
                                
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <input type='button' value='Add To Cart' data-id: onclick='addCart("${data.id}")' class='btn btn-success'> 
                            </div>
                        </div> `
        $('.modal-body').html(x)
    }
});

// modal blog
jQuery(document).ready(function ($) {
    var params = {}
    var products
    var authorArr
    $(document).on('click', '.data-blog', function () {
        let id = $(this).data('id')
        let product = datablog.filter(e => e.id == id)
        console.log("id " + id)
        console.log("product " + product)

        addModal(product[0])
        $('#modal-id').modal('show')
    })

    function addModal(data) {
        let x = `   <div class="row">
                            <div class='col-md-6'> <img src='images/${data.image}' alt='' > </div>
                                <div class='col-md-6'>
                                    <h3>${data.name}</h3>
                                    <p> ${data.blog}</p>
                                    <p> ${data.date}</p>
                                </div>
                            </div>
                            <div class="modal-footer" >
                                
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            
                        </div>
                           
                        </div> `
        $('.modal-body').html(x)
    }
});


//===========================
// xu ly lien ket chuyen trang
//===========================

$(document).ready(function () {

    $("#main-content").load("intro.html");


    /*********************************/
    /* Link home */
    /*********************************/
    $("#Home").click(function (e) {
        e.preventDefault();
        $("#main-content").load("intro.html");
    });



    /*********************************/
    /* Link about us */
    /*********************************/
    $("#About").click(function (e) {
        e.preventDefault();
        $("#main-content").load("contact.html");
    });


    /*********************************/
    /* Link xem danh sach cac mon an */
    /*********************************/

    $("#Menu").click(function (e) {
        $("#main-content").load("menu.html", function (response, status, request) {
            s = [];
            e.preventDefault();
            $.each(database, function (abc, row) {
                s.push(`<div class='col-sm-12 col-sm-6 col-md-4 item ' id='${row.type}' >`);
                s.push(`<a href='#'><img src='images/${row.image}' class='data-product' data-id='${row.id}'/> </a>`);
                s.push("<br/>" + row.price + "<br/>");
                s.push("<input type='button' value='Add To Cart' onclick='addCart(" + row.id + ")' class='btn btn-success'> <br><br>");
                s.push(`<a href='#' class='data-product' data-id='${row.id}'>${row.name} </a>`);
                s.push("<br>" + row.description.substring(0, 100));
                s.push("<br>");
                s.push("</div>");

            });

            s.push("</div> </div>");
            $("#data-product").html(s.join(" "));
        });


    });

    $("#oil").click(function (e) {
        e.preventDefault();
        $("#main-content").load("menu.html", function (response, status, request) {
            s = [];


            $
                .each(database, function (abc, row) {
                    if (row.type === "oil" || row.type === "") {



                        
                        s.push(`<div class='col-sm-12 col-sm-6 col-md-4 item ' >`);
                        s.push(`<a href='#'><img src='images/${row.image}' class='data-product' data-id='${row.id}'/> </a>`);
                        s.push("<br/>" + row.price + "<br/>");
                        s.push("<input type='button' value='Add To Cart' onclick='addCart(" + row.id + ")' class='btn btn-success'> <br><br>");
                        s.push(`<a href='#' class='data-product' data-id='${row.id}'>${row.name} </a>`);
                        s.push("<br>" + row.description.substring(0, 100));
                        s.push("<br>");
                        s.push("</div>");
                    }
                });

            s.push("</div> </div>");
            $("#data-product").html(s.join(" "));
        });

    });


    // link xem blog

    $("#blog").click(function (e) {
        e.preventDefault();
        $("#main-content").load("Blog.html", function (response, status, request) {
            s = [];

            $.each(datablog, function (i, row) {
                s.push(`<div class='col-sm-6 col-sm-6 col-md-6 item' id='row.type'>`);

                s.push("<div class='col-sm-6 col-sm-6 col-md-6 item'>")
                s.push(`<a href='#'> <img src='images/${row.image}' class='data-blog' data-id='${row.id}' /> </a>`);
                s.push("</div>");

                s.push("<div class='col-sm-6 col-sm-6 col-md-6 item'>")
                s.push("<br/>" + "DATE: " + row.date + "<br/>");
                s.push(`<a href='#' class='data-blog' data-id='${row.id}'> <h2> ${row.name}</h2>  <br/>  </a>`);

                s.push("</div>");

                s.push("</div>");
            });
            s.push("<div> </div>");
            $("#data-blog").html(s.join(" "));
        });

    });



    /*********************************/
    /* Link xem gio hang             */
    /*********************************/
    $("#Cart").click(function (e) {
        e.preventDefault();

        $("#main-content").load("cart.html", function (response, status, request) {
            if (localStorage.getItem("cart") != null) {
                cart = JSON.parse(localStorage.getItem("cart"));
                var s = [];
                var total = 0;
                $.each(cart, function (i, row) {

                    var row_total = roundToTwo(row.price * row.qty);

                    s.push("<tr><td>" + (i + 1) + "</td>");
                    s.push("<td>" + row.name + "</td>");
                    s.push("<td class='number'>" + row.price + "</td>");
                    s.push("<td class='number'>" + row.qty + "</td>");
                    s.push("<td class='number'>" + row_total + "</td>");

                    s.push("</tr>");
                    total += row_total;
                });
                $("#cart").html(s.join(" "));
                $("#cart-total").html(roundToTwo(total));
            }

        });
    });



});



//=================
//   functions
//=================
function addCart(id) {
    var item = database[id];
    var newEle = {
        "id": id,
        "name": item.name,
        "price": item.price,
        "qty": 1
    }


    if (localStorage.getItem("cart") == null) {
        cart = [];
    }
    else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    var find = false;
    cart.forEach(element => {
        if (element.id == id) {
            element.qty++;

            find = true;
        }
    });

    if (!find) {
        cart.push(newEle);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("add cart succeeded !");

}



function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}





