const CONSTS = {
    BASE_HOST: location.origin,
    GET_INFO_URL: location.origin + '/user/login/',
    CHANGE_NAME: location.origin + '/user/login/',
    GET_ALL_POINTS: location.origin + '/api/v1/points/?username=' + localStorage.getItem('userName')
}


$(document).ready(async () => {

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

    $('#searchUsersForm').off('submit').on('submit', (e) => {
        e.preventDefault();
        let search = $('#userSearch').val();
        let mockData = `<div class="table-header bg-gray px-2 py-1">
        <div id="pointName" class="inline-block w-10/12 font-medium">
          ИМЯ
        </div>
        <div id="pointStatus" class="inline-block py-1 px-3 font-medium">
          РОЛЬ
        </div>
      </div>`;

        fetch('/api/v1/user/name/' + search).then(res => res.text())
        .then((data) => {
            data = JSON.parse(data)
            data.map((item) => {
                mockData += `
                <a href="/card-page" class="no-underline w-full">
                <div class="table-row-custom flex align-items-center px-2 py-1">
                  <div id="pointName" class="w-full font-light px-2 no-underline">
                    ${item.name}
                  </div>
                  <div id="pointStatusRow" class="text-green-500 py-1 px-3 text-center no-underline">
                   ${item.role}
                  </div>
                </div>
              </a>
                `
            })
            $('user-table').html(mockData)
        })
    })
    $('#searchPointsForm').on('submit', (e) => {
        e.preventDefault();
        let selected = $('#userRole>option:selected').val();
        console.log(selected)
        if (!selected) {
            alert('Выберете роль!')
        }
        let mockData = `<div class="table-header bg-gray px-2 py-1">
        <div id="pointName" class="inline-block w-10/12 font-medium">
          ТОЧКА
        </div>
        <div id="pointStatus" class="inline-block py-1 px-3 font-medium">
          СТАТУС
        </div>
      </div>`;

        fetch('api/v1/points/admin/' + selected).then(res => res.text())
        .then((data) => {
            data = JSON.parse(data)
            data.map((item) => {
                mockData += `
                <a href="/card-page" class="no-underline w-full">
                <div class="table-row-custom flex align-items-center px-2 py-1">
                  <div id="pointName" class="w-full font-light px-2 no-underline">
                    ${item.name}
                  </div>
                  <div id="pointStatusRow" class="text-green-500 py-1 px-3 text-center no-underline">
                   ${item.role}
                  </div>
                </div>
              </a>
                `
            })
            $('.table-points').html(mockData)
        })
    })
    $(document).on('click',(e) => {
        let link = e.target.classList.value.includes('user-profile') ? e.target.closest('a').attributes.href.value : null;
        console.log(link)
        // console.log(e.target.classList.value)
        if (link) {
            let currentLinkID = e.target.closest('a').attributes.id.value;
            e.preventDefault();
            console.log(link)
            let options;
            let innerUserData = '';
            fetch('api/v1/user/role')
            .then(res => res.text())
            .then(res => {
                let dataForSelect;
                let fOption = res;
                options = `<option value="${res}">${res}</option>`
                fetch('/api/v1/roles')
                    .then(response => response.json())
                    .then(response => {
                        response.map((item) => {
                            dataForSelect += item === fOption ? '' : `<option value="${item}">${item}</option>`
                        })
                        options += dataForSelect;
                    })
            })
            $('#userRole').html(options);
            fetch('/api/v1/personal-data/' + currentLinkID).then(res => res.json())
            .then((res) => {
                
                    innerUserData += `
                    <div class="form-row">
                        <label for="inputName">Логин</label>
                        <span class="my-1 block w-full message-no-input">${res.name}</span>
                    </div>
                     <div class="form-row">
                        <label for="inputName">Фамилия</label>
                        <span class="my-1 block w-full message-no-input">${res.lastName}</span>
                    </div>
                     <div class="form-row">
                        <label for="inputName">Имя</label>
                        <span class="my-1 block w-full message-no-input">${res.firstName}</span>
                    </div>
                    <div class="form-row">
                    <label for="inputName">Отчество</label>
                    <span class="my-1 block w-full message-no-input">${res.middleName}</span>
                    </div>
                    `               
            })
            $('#userDataForAdmin').html(innerUserData);
            $(`${link}`).addClass('d-block');
        }
        if(e.target.classList.value.includes('modal')) {
            // let currentID = e.target.attributes.id.value
            // let options;
            // if(currentID === 'changeUserProfile') {
            //     // fetch('api/v1/user/role')
            //     // .then(res => res.text())
            //     // .then(res => {
            //     //     let dataForSelect;
            //     //     let fOption = res;
            //     //     options = `<option value="${res}">${res}</option>`
            //     //     fetch('/api/v1/roles')
            //     //         .then(response => response.json())
            //     //         .then(response => {
            //     //             response.map((item) => {
            //     //                 dataForSelect += item === fOption ? '' : `<option value="${item}">${item}</option>`
            //     //             })
            //     //             options += dataForSelect;
            //     //         })
            //     // })
            //     // $('#userRole').html(options);
            // }
            // $(`#${currentID}`).addClass('d-block');
        }
        if(e.target.classList.value.includes('close__X')) {
            let currentModal = e.target.closest('.modal').attributes.id.value;
            $(`#${currentModal}`).removeClass('d-block');
        }
    })   
})
