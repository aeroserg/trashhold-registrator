$(document).ready(() => {
    $('.input-file input[type=file]').on('change', function(){
        let file = this.files[0];
        $(this).closest('.input-file').find('.input-file-text').html(file.name);
    });
    $('#edit').off('click').on('click', () => {
        $('#userName').toggleClass('hidden');
        $('#nameChanger').toggleClass('hidden');
        $('#edit').toggleClass('hidden');
        $('#done').toggleClass('hidden');
    })
    $('#done').off('click').on('click', () => {
        //fetch('url').then(() => (location.reload()))
        $('#userName').toggleClass('hidden');
        $('#nameChanger').toggleClass('hidden');
        $('#done').toggleClass('hidden');
        $('#edit').toggleClass('hidden');

    })
})