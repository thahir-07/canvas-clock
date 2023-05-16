/**@type {HTMLCanvasElement} */
window.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("clock")
    var ctx = canvas.getContext("2d")
    var radius = canvas.height / 2
    ctx.translate(radius, radius)
    radius = radius * 0.90
    drawClock();
    function drawClock() {
        drawFace(radius)
        drawNumbers(radius)
        drawTime()

    }

    function drawFace(radius) {
        var grad
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, 2 * Math.PI)
        ctx.fillStyle = "#ffffff"
        ctx.fill()
        grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
        grad.addColorStop(0, ' rgb(208, 132, 132)')
        grad.addColorStop(1, ' rgb(133, 194, 133)')
        ctx.strokeStyle = grad
        ctx.lineWidth = radius * 0.1
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
        ctx.fillStyle = "#333"
        ctx.fill()


    }
    function drawNumbers(radius) {
        var ang, num
        ctx.font = radius * 0.15 + "px arial"
        ctx.textBaseline = "middle"
        ctx.textAlign = "center"
        for (num = 1; num < 13; num++) {
            ang = num * Math.PI / 6
            ctx.rotate(ang)
            ctx.translate(0, -radius * 0.85)
            ctx.rotate(-ang)
            ctx.fillText(num.toString(), 0, 0)
            ctx.rotate(ang)
            ctx.translate(0, radius * 0.85)
            ctx.rotate(-ang)
        }
    }

    function drawTime() {
        var now = new Date()
        console.log(now)
        var hour = now.getHours()
        var minute = now.getMinutes()
        var second = now.getSeconds()
        if (hour > 12)
            hour = hour % 12
        var digital = hour + ":" + minute + ":" + second
        document.getElementById("digital").innerHTML = digital
        console.log(hour)
        hour %= 12
        console.log(hour)
        hour = (hour * Math.PI / 6) + (minute * Math.PI / (60 * 6)) + (second * Math.PI / (360 * 60))
        console.log(hour)
        drawHand(hour, radius * 0.5, radius * 0.07)
        minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
        drawHand(minute, radius * 0.8, radius * 0.07)
        second = second * Math.PI / 30
        drawHand(second, radius * 0.9, radius * 0.07)



    }
    function drawHand(pos, length, width) {
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ctx.moveTo(0, 0)
        ctx.rotate(pos)
        ctx.lineTo(0, -length)
        if (length == (radius * 0.5)) {
            ctx.strokeStyle = "rgb(188, 188, 102)"
        } else if (length == radius * 0.8) {
            ctx.strokeStyle = "rgb(208, 132, 132)"
        }
        else {
            ctx.strokeStyle = "rgb(133, 194, 133)"
        }
        ctx.stroke()
        ctx.rotate(-pos)


    }
    setInterval(drawClock, 1000)
})



