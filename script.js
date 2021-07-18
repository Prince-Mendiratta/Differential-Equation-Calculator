(function(document, window) {

    // Global Variables
    var finalX = getById('xfinal');
    var calculateBtn = getById('calculate');
    var impresionTabla = "";
    var myChart;

    // Calculation Initialization
    calculate.onclick = function() {
        var y = parseFloat(getById("yzero").value);
        var x = parseFloat(getById("xzero").value);
        var h = parseFloat(getById("h").value);
        var func = getById("mainEquation").value;
        impresionTabla = "";

        // Array with results
        var eulerArray = euler(func, finalX.value, x, y, h)

        var n = eulerArray.length;

        // Graph and Table Rendering:
        render(eulerArray);

        for (var i = 0; i < n; i++) {
            impresionTabla += "<tr><td>" + (i + 1) + "</td><td>" + Math.round(eulerArray[i].x * 100) / 100 + "</td><td>" + Math.round(eulerArray[i].y * 1000) / 1000;
        }
        getById("tableBody").innerHTML = impresionTabla;
    };

    // Euler function
    function  euler(func, xfinal, xinicial, yinicial, h) {
        var values = [];
        var y = yinicial;
        var x = xinicial;
        values.push({ x : x, y : y });
        while (x < xfinal) {
            y = y + h * evaluate(y, x, func);
            x = x + h;
        values.push({ x : x, y : y });
        }
        return values;
    }

    function  evaluate(y, x, func) {

        while(func.includes("sin")){
            let sin = func.match(/sin\((.)\)/)[1] === "x" ? Math.sin(x) : Math.sin(y);
            let variable = func.match(/sin\((.)\)/)[1];
            func = func.replace("sin("+variable+")",sin);
        }
        while(func.includes("cos")){
            let cos = func.match(/cos\((.)\)/)[1] === "x" ? Math.cos(x) : Math.cos(y);
            let variable = func.match(/cos\((.)\)/)[1];
            func = func.replace("cos("+variable+")",cos);
        }
        while(func.includes("sqrt")){
            let sqrt = func.match(/sqrt\((.)\)/)[1] === "x" ? Math.sqrt(x) : Math.sqrt(y);
            let variable = func.match(/sqrt\((.)\)/)[1];
            func = func.replace("sqrt("+variable+")",sqrt);
        }
        while(func.includes("log")){
            let variable = func.match(/log\((.)\)/)[1];
            let log = Math.log(variable);
            func = func.replace("log("+variable+")",log);
        }
        return eval(func);
    }

    function getById(id) {
        return document.getElementById(id);
    }

    // Render Function
    function render(pointsEuler) {
        var ctx = document.getElementById('grafico').getContext('2d');
        let data ={
                                    datasets: [
                                    {
                                        label: "Euler",
                                        data: pointsEuler,
                                        borderColor: 'red',
                                        borderWidth: 2,
                                        fill: false,
                                        showLine: true,
                                        pointBackgroundColor: 'red'
                                    }],
                                };
        if(myChart){
            myChart.data = data
            myChart.update();
        }
        else{
            myChart = new Chart(ctx, {
                                options: {
                                    scales: {
                                        xAxes: [{
                                            type: 'linear',
                                            position: 'bottom',
                                            display: true,
                                            gridLines: {
                                            zeroLineColor: '#333'
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'x'
                                          }
                                        }],
                                        yAxes: [{
                                            type: 'linear',
                                            display: true,
                                            position: 'left',
                                            gridLines: {
                                            zeroLineColor: '#333'
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'y'
                                        }
                                        }],
                                    },
                                    plugins: {
                                        zoom: {
                                            pan: {
                                              enabled: true,
                                              mode: "xy",
                                              speed: 5,
                                              threshold: 10
                                            },
                                            zoom: {
                                              enabled: true,
                                              drag: false,
                                              mode: "xy",
                                              speed: 0.1,
                                              limits: {
                                                max: 5,
                                                min: 0.5
                                              }
                                            }
                                        }
                                    }
                                },
                                data: data,
                                type: 'scatter',

                            });
        }
    }

})(document, window);
