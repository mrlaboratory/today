function conBN(number) {
    const banglaNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let result = '';
    const parts = number.toString().split('.');
    // Convert integer part
    let integerPart = '';
    for (let i = 0; i < parts[0].length; i++) {
        const digit = parseInt(parts[0][i]);
        integerPart += banglaNumerals[digit];
    }
    result += integerPart;
    // Convert decimal part if it exists
    if (parts.length > 1) {
        result += '.';
        let decimalPart = '';
        for (let i = 0; i < parts[1].length; i++) {
            const digit = parseInt(parts[1][i]);
            decimalPart += banglaNumerals[digit];
        }
        result += decimalPart;
    }
    return result;
}

fetch("currency_rates.json")
.then((response) => response.json())
.then((data) => {
  const tableBody = document.querySelector("#ratesTable tbody");

  for (const [currency, [rate, name, nameBn]] of Object.entries(
    data.rates
  )) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${currency}</td>
      <td>${conBN(rate)}</td>
      <td>${name} (${nameBn})</td>
    `;
    tableBody.appendChild(row);
  }
})
.catch((error) => console.error(error));
