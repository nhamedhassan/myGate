/*get a random color in hex
 lifted from -http://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
*/
function get_random_color() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);;
}


//Event to display on the timeline

function Event(title, start, end, template, img) {
    this.start = start;
    this.end = end;
    this.title = title;
    this.color = get_random_color();
    this.template = template;
    this.img = img;

    /*height and scale properties*/
    this.scale = ko.observable(1);
    this.height = ko.computed(function () {
        var days;
        if (!this.end) {
            days = moment().diff(this.start, "days");
        } else {
            days = this.end.diff(this.start, "days");
        }
        return days * this.scale();
    }, this);

    this.top = ko.computed(function () {
        var now = moment();
        if (!this.end) {
            return 0;
        }
        var diff = now.diff(this.end, 'days');
        return (diff * (this.scale()));

    }, this);

    /*time helpers*/
    this.fromEnd = function () {
        if (!this.end) {
            return "present"
        }
        return this.end.from(moment());
    };
    this.fromStart = function () {
        return this.start.from(moment());
    };
    /*selected*/
    this.selected = ko.observable(false);
    this.toggleSelected = function () {
        this.selected(!this.selected());
    };
}

//TODO: no overlapping event paradigm
//Left events
var leftEvents = [
    new Event("Completed a course 1", moment("2016-05-05"), moment(), {
        name: '',
        context: {},

    },"images/timeline_course.png"),
    new Event("Achieved 160 hours", moment("2016-04-14"), moment(), {
        name: '',
        context: {},
        
    },"images/timeline_flag.png"),
    new Event("Some cool place", moment("2009-01"), moment("2010-11"), {
        name: '',
        context: {},
       
    },"images/timeline_course.png"),
    new Event("First Real Job", moment("2008-07"), moment("2009-01"), {
        name: '',
        context: {},
       
    },"images/timeline_course.png"),
    new Event("The next place", moment("2006-10"), moment("2008-07"), {
        name: '',
        context: {},
       
    },"images/timeline_flag.png"),
    new Event("Some place", moment("2003-08"), moment("2006-10"),{
        name: '',
        context: {},
       
    },"images/timeline_course.png"),
];

//right events
var rightEvents = [


];


//Timeline Viewmodel
function ViewModel() {
    this.title = "jQuery Simple Timeline";
    this.subtitle = "Example";

    this.lastIndex = 0;
    this.leftEvents = ko.observableArray(leftEvents);
    this.rightEvents = ko.observableArray(rightEvents);
    this.currentScale = ko.observable(.75);
    this.currentScale.subscribe(this.updateEventsScale.bind(this));

    //any selected
    this.itemSelected = ko.computed(function () {
        var leftSelected = this.leftEvents().some(function (event) {
            return event.selected();
        });
        //return early
        if (leftSelected) {
            return leftSelected;
        }
        var rightSelected = this.rightEvents().some(function (event) {
            return event.selected();
        });

        return rightSelected;
    }, this);

    //combined and sorted items
    this.combinedSorted = ko.computed(function () {

        var combined = this.leftEvents().concat(this.rightEvents());

        //sort by computed top poisition
        combined.sort(function (a, b) {

            if (a.top() < b.top())
                return -1;
            if (a.top() > b.top())
                return 1;
            return 0;

        });

        return combined;

    }, this);

};

ViewModel.prototype.updateEventsScale = function (value) {
    this.leftEvents().forEach(function (event) {
        event.scale(value);
    });
    this.rightEvents().forEach(function (event) {
        event.scale(value);
    });
};
ViewModel.prototype.scrollNext = function () {

    if (this.lastIndex < this.combinedSorted().length - 1) {
        this.lastIndex++;
    }
    var top = this.combinedSorted()[this.lastIndex].top()

    $( ".dashboard_timeline" ).scrollTo(top, 250);

};
ViewModel.prototype.scrollPrevious = function () {

    if (this.lastIndex > 0) {
        this.lastIndex--;
        console.log(this.lastIndex)
    }

    var top = this.combinedSorted()[this.lastIndex].top()

    $( ".dashboard_timeline" ).scrollTo(top, 250);

};
ViewModel.prototype.scrollFirst = function () {
    this.lastIndex=0

    var top = this.combinedSorted()[this.lastIndex].top()

    $( ".dashboard_timeline" ).scrollTo(top, 250);

};

//bind
var vm = new ViewModel();
ko.applyBindings(vm);