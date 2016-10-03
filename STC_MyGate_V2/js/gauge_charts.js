function gauge_chart(id){

    var ele=$('#'+id);
    var chart_val=ele.data('value');
    var chart_maxval= ele.data('max');
    var chart_unit= ele.data('unit');
    var chart_type=ele.data('type');
    var chart_data_type=ele.data('date');
    var minDays =ele.data('minbalance');
    var maxDays =ele.data('maxbalance');;
    var chart_avg = chart_val /  chart_maxval;
    var chart_color, chart_angle;
    var chart_icon= ele.data('icon');
    var chart_val_type=ele.data('value-type');
    var percent_val=parseInt(chart_avg *100);


    var parentselec=ele.parent().find('.gauge_charts');



    $( '<h2 class="chart_val"><span class="val"></span><span class="unit"></span></h2>' ).insertAfter( parentselec );
    $( '<i class="fa" aria-hidden="true"></i>' ).insertAfter( parentselec );


    // percentage chart value
    if(chart_val_type == 'percentage'){
        ele.parent().find('h2 span.val').text(percent_val)

    }

    else{
        ele.parent().find('h2 span.val').text(chart_val)

    }

    ele.parent().find('h2 span.unit').text(chart_unit)



    if (chart_val >= 0 && chart_val <= minDays ){
        chart_color = '#da447e';

        change_class('fa-frown-o')
    }
    else if (chart_val >= minDays && chart_val <= maxDays ) {
        chart_color = '#ffd60c';
        change_class('fa-clock-o')

    }
    else if (chart_val >maxDays  ){
        chart_color = '#02db4b';
        change_class('fa-smile-o')
    }


    function change_class(classname){
        if (chart_icon !=''){
            ele.parent().find('i').addClass(chart_icon)
        }
        else{
            ele.parent().find('i').addClass(classname)

        }
    }

    // time  chart value
    if(chart_data_type == 'time'){
        var raw = chart_val;
        var time = parseInt(raw,10)
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
       var mytime =minutes+":"+seconds;
        ele.parent().find('h2 span.val').text(mytime)

    }

    else{
        ele.parent().find('h2 span.val').text(chart_val)

    }
				
// full circle chart
    if (chart_type =='circle') {
        chart_angle = 0.5;
        ele.parent().find('i').remove();
        ele.parent().find('h2').addClass('circle_val');
    }

    else{
        chart_angle=0.20
    }



    //////////////////////////////////////

    var opts = {
        lines: 1, // The number of lines to draw
        angle: chart_angle, // The length of each line
        lineWidth: 0.1, // The line thickness
        pointer: {
            length: 0.0, // The radius of the inner circle
            strokeWidth: 0.00, // The rotation offset
            color: '#000000' // Fill color
        },
        limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
        colorStart: chart_color,   // Colors
        colorStop: chart_color,    // just experiment with them
        strokeColor: '#eeeeee',   // to see which ones work best for you
        generateGradient: true
    };
    var target = document.getElementById(id); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = chart_maxval; // set max gauge value
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(chart_val); // set actual value

}

$(document).ready(function (){
    $('.gauge_charts').each(function(){
        var id = $(this).attr('id');
        //console.log(id);
        gauge_chart(id)
    })

    // Circle chart

    $('.circle_chart').each(function(){
        var id = $(this).attr('id');
        //console.log(id);
        var opts = {
            lines: 1, // The number of lines to draw
            angle: 0.5, // The length of each line
            lineWidth: 0.1, // The line thickness
            pointer: {
                length: 0.0, // The radius of the inner circle
                strokeWidth: 0.00, // The rotation offset
                color: '#000000' // Fill color
            },
            limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
            colorStart:'green' ,   // Colors
            colorStop: 'green',    // just experiment with them
            strokeColor: '#eeeeee',   // to see which ones work best for you
            generateGradient: true
        };
        var target = document.getElementById(id); // your canvas element
        var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = 200; // set max gauge value
        gauge.animationSpeed = 32; // set animation speed (32 is default value)
        gauge.set(200); // set actual value

    })

})
