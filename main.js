const CONSTS = {
    BASE_HOST: location.origin,
    GET_INFO_URL: location.origin + '/user/login/',
    CHANGE_NAME: location.origin + '/user/login/',
    GET_ALL_POINTS: location.origin + '/api/v1/points/?username=' + localStorage.getItem('userName')
}


$(document).ready(() => {

    //данные для точек


    // данные для получения основной
    let data;
    // let mockData = ' <div class="table-header bg-gray px-2 py-1"> <div id="pointName" class="inline-block w-10/12 font-medium">Название</div> <div id="pointStatus" class="inline-block py-1 px-3 font-medium">Cтатус</div>  </div>';
    let mockData = '';
    fetch(CONSTS.GET_INFO_URL, {
        method: 'get'
    }).then((res) => {
        res?.prop.map((item,index) => {
            mockData += ` <a href="/card-page" class="no-underline w-full">
            <div class="table-row-custom flex align-items-center px-2 py-1">
              <div id="pointName" class="w-full font-light px-2 no-underline">
                ${item.text}
              </div>
                ${item.permission ? 
                    ` <a
                    href="${item.text}"
                    class=""
                    ><div
                      id="pointStatusRow"
                      class="py-1 px-3 text-center no-underline text-red"
                    >
                    ${item.status.text}
                    </div></a
                  >`
                : ''}
              
            </div>
          </a>`
        })
        
    })
    // $('.table-custom').html(mockData)
    
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
        let postData = {
            login: $('#nameChanger').val(),
        }
        alert(postData.login + '   ====  '+ CONSTS.CHANGE_NAME)
        fetch(CONSTS.CHANGE_NAME, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        }).then(() => {
           location.reload();
        })
        $('#userName').toggleClass('hidden');
        $('#nameChanger').toggleClass('hidden');
        $('#done').toggleClass('hidden');
        $('#edit').toggleClass('hidden');

    })

    var $rows = $('.user-table a');
    $('#userSearch').keyup(function() {
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function() {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });
})