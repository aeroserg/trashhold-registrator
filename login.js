
$(document).ready(() => {
    $('.login-form').on('submit', function login(e) {
        e.preventDefault();
        console.log(e.target)
        const userName = $('#userLoginForm').val();
        const userPassword = $('#userPasswordForm').val();
        console.log(userName,userPassword )
        fetch(`/api/v1/user/login/${userName}`)
            .then(() => {
                // пропи
                location.replace('/account')
            })
    })    
})
