const pinInput = document.getElementById("pincode");
const resultDiv = document.getElementById("result");
const mapDiv = document.getElementById("map");
const themeBtn = document.getElementById("themeToggle");

// AUTO SEARCH WHILE TYPING
pinInput.addEventListener("input", () => {
  if (pinInput.value.length === 6) {
    searchPin(pinInput.value);
  }
});

// PINCODE SEARCH FUNCTION
function searchPin(pin) {
  fetch(`https://api.postalpincode.in/pincode/${pin}`)
    .then(res => res.json())
    .then(data => {

      if (data[0].Status !== "Success") {
        resultDiv.innerHTML = "❌ Invalid PIN Code";
        mapDiv.innerHTML = "";
        return;
      }

      let offices = data[0].PostOffice;
      let output = `<h3>${offices.length} Post Offices Found</h3>`;

      offices.forEach(po => {
        output += `
          <p>
            <b>${po.Name}</b><br>
            ${po.Block}, ${po.District}<br>
            ${po.State}
          </p><hr>
        `;
      });

      resultDiv.innerHTML = output;

      // GOOGLE MAP
      let location = offices[0].District + " " + offices[0].State;
      mapDiv.innerHTML = `
        <iframe 
          src="https://www.google.com/maps?q=${location}&output=embed">
        </iframe>
      `;
    });
}

// DARK / LIGHT MODE
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
};
