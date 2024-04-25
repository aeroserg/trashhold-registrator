$(document).ready(() => {
    const changePasswordButton = $('#changePassword');
    const saveChangedUserDataForm = $('#saveChangedUserPassword');

    const userName = $('#userLoginForm').val();
    const userFirstPass = $('#userFirstPassword').val();
    const userSecondPass = $('#userSecondPassword').val();
   
    saveChangedUserDataForm.on('submit', (e) =>{
        e.preventDefault()
        if(userFirstPass !== userSecondPass) {
            alert('Пароли не совпадают!')
            return;
        }
        // fetch(...)
    })
})