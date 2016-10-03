
$(function (){
//sinlge select configuration
$(".custom_select").select2();
// Multiple select configuration
$(".custom_select.multiple").select2();
// placeholder select configuration
$(".custom_select.placeholder").select2({
    placeholder: "Select a service number",
    allowClear: true
});
// tagging enabled  select configuration
$(".custom_select.tagging").select2({
    tags: true,
    placeholder: "Select a contact",
    tokenSeparators: [',', ' ']
});

// tagging enabled  select configuration
$(".custom_select.rtl").select2({
    dir: "rtl"
});

// flags template  select configuration
function formatState (state) {
    if (!state.id) { return state.text; }
    var $state = $(
        '<span><img src="../../images/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
};

$(".custom_select.flags").select2({
    templateResult: formatState
});

// Side By Side Multi Select
$('#my-select').multiSelect()

// Range Slider
$(".range-slider").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 100,
    from: 0,
    to: 100,
    step: 10,
    grid_snap: true,
})
});