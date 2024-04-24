$(document).ready(() => {
    const date = new Date().toJSON().split('T')[0]
    $('#pointCardDate').val(date)
})