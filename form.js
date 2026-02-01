let nameAp = document.getElementById('nameAp');
let emailAp = document.getElementById('emailAp');
let numberAp = document.getElementById('num');
let dob = document.getElementById('dob');
let date = document.getElementById('date');
let time = document.getElementById('time');
let reason = document.getElementById('reason');
let doctor = document.getElementById('doctor');
let submit = document.getElementById('submit');

if (submit) {
    submit.addEventListener('click', async () =>{
        let ntime = formatTime(time.value)
        const { error } = await client
        .from('appoinmentForm')
        .insert({
            name:nameAp.value,
            email:emailAp.value,
            number:numberAp.value,
            dob:dob.value,
            date:date.value,
            time:ntime,
            reason:reason.value,
            doctor:doctor.value 
        })
        if (error) {
            console.log('error', error.message);
        }else{
            console.log('Your Form is Submit');
            window.location.href = 'https://mustafa-raza-26.github.io/Final-Test/appoinment.html'
        }

        nameAp.value = ''
        emailAp.value = ''
        numberAp.value = ''
        dob.value = ''
        date.value = ''
        ntime.value = ''
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

