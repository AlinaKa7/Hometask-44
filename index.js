const cities = ['Kyiv', 'Odesa', 'Kharkiv', 'Dnipro', 'Chernihiv', 'Lutsk', 'Rivne', 'Zhytomyr', 'Sumy', 'Poltava', 'Khemlnytskyi', 'Ternopil', 'Lviv', 'Vinnytsia', 'Ivano-Frankivsk', 'Cherkasy', 'Uzhorod', 'Chernivtsi', 'Kropyvnytskyi', 'Donetsk', 'Luhansk', 'Kryvyi Rih', 'Zaporizhzhia', 'Mykolaiv', 'Kherson', 'Simferopol'];
const dropdownElement = document.getElementById('city');

cities.forEach(city => {
  
  const option = document.createElement('option');
  option.value = city;
  option.text = city;
  dropdownElement.add(option);
})

document.querySelector('#submit-btn').addEventListener('click', submitClick);

function submitClick() {
  const name = document.querySelector('.user-name').value;
  const surname = document.querySelector('.surname').value;
  const birthDate = document.querySelector('.birth-date').value;
  const gender = document.querySelector('.gender-item:checked').id;
  const city = document.querySelector('#city').value;
  const address = document.querySelector('.address-item').value;
  const language = Array.from(document.querySelectorAll('.language:checked')).map(language => language.value[0].toUpperCase() + language.value.slice(1, language.value.length));
  const phone = document.querySelector('.phone-number').value;
  const email = document.querySelector('.email-add').value;

  const data = { name, surname, birthDate, gender, city, address, language, phone, email };
  
  if (!name || !surname || !birthDate || !gender || !city || !address || language.length === 0 || !phone || !email) {
    alert('Please, fill in all the fields!');
    return;
  }

  if(!validateEmail(email)) {
    alert('Please enter correct email address!');
    return;
  }

  renderTable(data);
}

function validateEmail(email) {
  const validRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validRegex.test(email);
}

function renderTable(data) {
  const formContainer = document.querySelector('.form-container');
  const tableContainer = document.querySelector('.table-container');

  formContainer.style.display = 'none';
  tableContainer.style.display = 'block'; 

  const table = document.getElementById('table');
  table.innerHTML = '';
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const theadTitles = ['Name', 'Surname', 'Date of Birth', 'Gender', 'City', 'Address', 'Languages', 'Phone Number', 'Email'];

  theadTitles.forEach(theadTitle => {
    const th = document.createElement('th');
    th.innerText = theadTitle;
    tr.appendChild(th);
  });

  thead.appendChild(tr);

  const tbody = document.createElement('tbody');
  const datatr = document.createElement('tr');
  
  const dataValues = [data.name, data.surname, data.birthDate, data.gender, data.city, data.address, data.language.join(', '), data.phone, data.email];

  dataValues.forEach(value => {
    const td = document.createElement('td');
    td.innerText = value;
    datatr.appendChild(td);
  });

  tbody.appendChild(datatr);

  table.appendChild(thead);
  table.appendChild(tbody);
}