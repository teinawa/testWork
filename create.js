
const createUser = async () => {
    const maleValue = male.checked;
    const femaleValue = female.checked;
    let gender = ''
    if (maleValue){
        gender += 'male'
    }else if (femaleValue){
        gender += 'female'
    }
    console.log(gender)
    const doc = {
        first_name: firstName.value,
        last_name: lastName.value,
        gender: gender,
        age: age.value,
        email: email.value,
        password: password.value

    }


        await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: { 'Content-Type': 'application/json' }
        })



    // window.location.replace('/')
}



