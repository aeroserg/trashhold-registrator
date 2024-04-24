
$(document).ready(() => {
    $('.registry-form').on('submit', function login(e) {
        e.preventDefault();
        const userName = $('#userLoginForm').val();
        const userPassword = $('#userPasswordForm').val();
        const userFirstName = $('#userFirstNameForm').val();
        const userLastName = $('#userLastNameForm').val();
        const userPatronymicName = $('#userPatronymicName').val();
        console.log(userName,userPassword,userFirstName,userLastName,userPatronymicName )
        fetch(`/api/v1/user/login/${userName}`)
            .then(() => {
                // пропи
                location.replace('/account')
            })
    })    
})
