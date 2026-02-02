let card = document.getElementById('card');

async function fetchAppointments() {
  const { data: { user } } = await client.auth.getUser();

  if (!user) {
    console.log('Login required');
    return;
  }

  const { data, error } = await client
  .from('appoinmentForm')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });


  if (error) {
    console.log('Error:', error.message);
    return;
  }

  card.innerHTML = ""

  if (!data || data.length === 0) {
    card.innerHTML = `
      <div class="text-center mt-5 p-1">
        <h4>You don't have any appointments</h4>
      </div>
    `;
    return;
  }

  for (let i = 0; i < data.length; i++) {
    card.innerHTML += `
      <div class="col-11 col-md-4 p-3 mb-3">
        <span class="d-flex"><h5 style="font-weight: bold;">Patient Name:</h5>&nbsp;<h5>${data[i].name}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Doctor Name:</h5>&nbsp;<h5>${data[i].doctor}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Date:</h5>&nbsp;<h5>${data[i].date}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Date:</h5>&nbsp;<h5>${data[i].time}</h5></span>
        <span class="d-flex"><h5 style="font-weight: bold;">Reason:</h5>&nbsp;<h5>${data[i].reason}</h5></span>

        <button class="col-6 col-md-4 deleteBtn mt-2" data-id="${data[i].id}">
          Cancel
        </button>
      </div>
    `;
  }
}

if (card) {
  card.addEventListener('click', async (e) => {
    if (e.target.classList.contains('deleteBtn')) {

    const appointmentId = e.target.dataset.id;
    
    const confirmDelete = confirm("Are you sure you want to cancel this appointment?");

    if (!confirmDelete) return;

    const { error } = await client
      .from('appoinmentForm')
      .delete()
      .eq('id', appointmentId);

    if (error) {
      console.log('Delete error:', error.message);
    } else {
      fetchAppointments();
    }
  }
  });
}
fetchAppointments();