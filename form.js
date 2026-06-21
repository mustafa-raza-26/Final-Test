let nameAp = document.getElementById('nameAp');
let emailAp = document.getElementById('emailAp');
let numberAp = document.getElementById('num');
let dob = document.getElementById('dob');
let date = document.getElementById('date');
let gender = document.getElementById('gender');
let reason = document.getElementById('reason');
let doctor = document.getElementById('doctor');
let submit = document.getElementById('submit');

window.addEventListener('load', async () => {
    const { data, error } = await client
    .from('Admin_Portal_User')
    .select('name,specialty')
    if (error) {
        console.log('error', error.message);
        alert('error', error.message);
    }else{

        for (let i = 0; i < data.length; i++) {
            doctor.innerHTML +=`
                <option>Dr. ${data[i].name}&emsp;(${data[i].specialty})</option>
            `
        }
    }
});

if (submit) {
    submit.addEventListener('click', async () =>{
        let ntime = formatTime(time.value)
        const { error } = await client
        .from('appoinment')
        .insert({
            patient_Name:nameAp.value,
            email:emailAp.value,
            contact_no:numberAp.value,
            age:dob.value,
            date:date.value,
            // time:ntime,
            gender:gender.value,
            reason:reason.value,
            doctor_Name:doctor.value 
        })
        if (error) {
            console.log('error', error.message);
            alert('error', error.message);
        }else{
            console.log('Your Form is Submit');
            alert('Your Form is Submit');
            window.location.href = 'https://mustafa-raza-26.github.io/Final-Test/appoinment.html'
        }

        nameAp.value = ''
        emailAp.value = ''
        numberAp.value = ''
        dob.value = ''
        date.value = ''
        time.value = ''
        reason.value = ''
        doctor.value = ''
    
    })
}

function formatTime(time) {
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);

    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
}