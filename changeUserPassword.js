$(document).ready(() => {
    const changePasswordButton = $('#changePassword');
    const saveChangedUserDataForm = $('#saveChangedUserData');

    const userName = $('#userLoginForm').val();
    // const userPassword = $('#userPasswordForm').val();
    const userFirstName = $('#userFirstNameForm').val();
    const userLastName = $('#userLastNameForm').val();
    const userPatronymicName = $('#userPatronymicName').val();
    saveChangedUserDataForm.on('submit', () =>{
        let dataToPost = JSON.stringify({
            name: userName,
            lastName: userLastName,
            firstName: userFirstName,
            middleName: userPatronymicName
        })
        // fetch('api/v1/...', )....
        
    })
    changePasswordButton.on('click', (e) => {
        e.preventDefault();
        // location.href = '/jwkcfbjvevbfvubeuvbev что-то там надо вставить линк'
    })
})