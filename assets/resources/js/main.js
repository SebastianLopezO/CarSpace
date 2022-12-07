$(function () {
  function changecolor(){
    const elems=document.querySelectorAll("body div");
    elems.forEach((elem)=>{
      elem.classList.toggle("bg-light");
      elem.classList.toggle("bg-dark");
      elem.classList.toggle("text-light");
      elem.classList.toggle("text-dark");
      elem.classList.toggle("navbar-light");
      elem.classList.toggle("navbar-dark");
    });
  }
  parking()

  function parking() {
    var lit = ["A", "B", "C", "D"]
    for (let x = 0; x < lit.length; x++) {
      for (let y = 0; y < 8; y++) {
        $("#parqueadero").append('<button class="redondo btn-danger text-white" style="background:rgb(0, 121, 30)" id="' + lit[x] + (y + 1) + '">' + lit[x] + "-" + (y + 1) + '</button>')
      }
    }
  }

  const place = document.querySelectorAll("#parqueadero button");
  place.forEach((elem) => {
    elem.addEventListener('click', (action) => {
      //Capturar Paginacionelem
      action.preventDefault();
      place.forEach((num) => { num.setAttribute("disabled", "true"); num.setAttribute("style", "background:rgb(50,50,50)") });
      action.target.setAttribute("style", "background:rgb(255,0,0)")
      $("#last").val(action.target.innerHTML);
      $("#tiempo").val(Math.round(Math.random()*(200-1)+1)+" Minutos");
      let fecha = new Date()
      $("#reservado").val(fecha.toISOString().substring(0, 10))
    });
  });
  
  $("#sub").click(function () {
    var coment = $("#comt").val()
    $('#tableishon').append("<tr><td>" + sessionStorage.user + "</td><td>" + coment + "</td></tr>");
    document.getElementById('sub').disabled = true;
  });



  $("#gen").click(function (e) {
    e.preventDefault();
    var nombre="Usuario"+Math.round(Math.random()*(100-1)+1)
    $("#user").val(nombre);
    document.getElementById('ing').disabled = false;
  })

  $("#ing").click(function () {
    if ($("#user").val() != "" && $("#contraseña").val() != "") {
      sessionStorage.setItem("user", $("#user").val())
      sessionStorage.setItem("password", $("#contraseña").val())
      alerta('success', 'Los datos han sido almacenados, redirigiendo');
      window.location.href = "user.html"
    } else {
      alerta('error', 'Campos Vacios');
    }
  });

  $("#user").html(sessionStorage.user)
  $("#uno").val(sessionStorage.user)
  $("#nombre").val(sessionStorage.user)
  $("#passchan").val(sessionStorage.password)

  $("#send").click(function (e) {
    e.preventDefault();
    if ($("#mail").val() != "") {
      sessionStorage.setItem("cor", $("#mail").val())
      alerta('success', 'Los datos han sido almacenados');
      document.getElementById('send').disabled = true;
      document.getElementById('mail').disabled = true;
    } else {
      alerta('error', 'Campos Vacios');
    }
  });


  $("#env").click(function () {
    const data = document.querySelectorAll("#contenedor div")
    if (data.length <= 3) {
      var mod = $("#model").val()
      var matricula = $("#matricula").val()
      var foto = $("#car").val()


      $("#contenedor").append('<div class="col d-flex justify-content-center align-items-center mb-5"> \
      <div class="card text-bg-dark" style="width: 18rem;" id="tablota"> \
          <img src="/assets/resources/img/'+ foto + '.png" class="card-img-top" alt = "..."> \
          <div class="card-body"> \
              <h5 class="card-title">'+ "Modelo: "+ mod + '</h5> \
              <p class="card-text">'+ "Matricula: "+ matricula + '</p> \          </div> \
        </div > \
      </div> ');
    } else {
      alerta("error", "No puede agregar mas vehiculos");
    }
  });

  function alerta(icon, title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

});


