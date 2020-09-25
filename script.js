let i = 1;

function weather() {
  !(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = "https://weatherwidget.io/js/widget.min.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, "script", "weatherwidget-io-js");
}

function clock() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.9;
  setInterval(drawClock, 1000);

  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //tund
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minut
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // sekund
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}

function toDoList() {
  var limit = prompt("Mitu Ülesannet sul on?");
  if (limit == null || limit == "") {
    alert("Katkestasite ülesannete sisestamise!");
  } else {
    while (i <= limit) {
      var toDo = prompt("Sisesta ülesanne " + i + "!");
      if (toDo == null || toDo == "") {
        alert("Katkestasite ülesannete lisamise! Proovige uuesti!");
      } else {
        document.write(
          '<tr><td><input type="text" id="TomyBtn' +
            i +
            '"></td><td><input type="button" id="myBtn' +
            i +
            '" value="Vajuta" onclick="msg(this.id)"></td></tr>'
        );
        document.getElementById("TomyBtn" + i).value = toDo;
        i++;
      }
    }
  }
}

function msg(clicked_id) {
  var id = clicked_id;
  var time = new Date();
  var day = time.getDate();
  var month = time.getMonth() + 1;
  var year = time.getFullYear();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var fullTime = day + "." + month + "." + year + " " + hour + ":" + minute;

  var todo = document.getElementById("To" + id);
  todo.style.textDecoration = "line-through";
  todo.disabled = true;

  var lahter = document.getElementById(id);
  lahter.value = fullTime;
  lahter.disabled = true;
}

function add() {
  var toDo = prompt("Sisesta ülesanne " + i + "!");
  if (toDo == null || toDo == "") {
    alert("Katkestasite ülesannete lisamise!");
  } else {
    var x = document.getElementById("table").insertRow(2);
    var y = x.insertCell(0);
    var z = x.insertCell(1);
    y.innerHTML = '<input type="text" id="TomyBtn' + i + '">';
    document.getElementById("TomyBtn" + i).value = toDo;
    z.innerHTML =
      '<input type="button" id="myBtn' +
      i +
      '" value="Vajuta" onclick="msg(this.id)">';
    i++;
  }
}

function reset() {
  location.reload();
}
