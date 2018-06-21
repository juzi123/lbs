$("#viewRentals").on('click', function () {
    $(".viewCollect").removeClass('show')
    $(".publishframe").removeClass('show')
    $(".viewPublish").removeClass('show')
    $(".frame").addClass('show')
})
$("#publishRentals").on('click', function () {
    $(".viewCollect").removeClass('show')
    $(".frame").removeClass('show')
    $(".viewPublish").removeClass('show')
    $(".publishframe").addClass('show')
})
$("#viewCollection").on('click', function () {
    $(".publishframe").removeClass('show')
    $(".frame").removeClass('show')
    $(".viewPublish").removeClass('show')
    $(".viewCollect").addClass('show')
})
$("#viewPublished").on('click', function(){
    $(".publishframe").removeClass('show')
    $(".frame").removeClass('show')
    $(".viewCollect").removeClass('show')
    $(".viewPublish").addClass('show')
})