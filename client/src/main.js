const tempArray = [
  { date: "01", emotion: "Sad", comment: "None" },
  { date: "02", emotion: "Angry", comment: "None" },
  { date: "03", emotion: "Calm", comment: "None" },
  { date: "04", emotion: "Anxious", comment: "None" },
  { date: "05", emotion: "Tired", comment: "None" },
  { date: "06", emotion: "Energetic", comment: "None" },
  { date: "07", emotion: "Sad", comment: "None" },
  { date: "08", emotion: "Angry", comment: "None" },
  { date: "09", emotion: "Calm", comment: "None" },
  { date: "10", emotion: "Anxious", comment: "None" },
  { date: "11", emotion: "Tired", comment: "None" },
  { date: "12", emotion: "Energetic", comment: "None" },
  { date: "13", emotion: "Sad", comment: "None" },
  { date: "14", emotion: "Angry", comment: "None" },
  { date: "15", emotion: "Calm", comment: "None" },
  { date: "16", emotion: "Anxious", comment: "None" },
  { date: "17", emotion: "Tired", comment: "None" },
  { date: "18", emotion: "Energetic", comment: "None" },
  { date: "19", emotion: "Sad", comment: "None" },
  { date: "20", emotion: "Angry", comment: "None" },
  { date: "21", emotion: "Calm", comment: "None" },
  { date: "22", emotion: "Tired", comment: "None" },
  { date: "23", emotion: "Energetic", comment: "None" },
  { date: "24", emotion: "Calm", comment: "None" },
  { date: "25", emotion: "Anxious", comment: "None" },
  { date: "26", emotion: "Tired", comment: "None" },
  { date: "27", emotion: "Energetic", comment: "None" },
  { date: "28", emotion: "Happy", comment: "None" },
];

async function fetchMoodEntry() {
  const result = await fetch("http://localhost:8080/moodthing");
  // need to json and stringify data.
}

function testStuff() {
  tempArray.slice(-35).forEach((entry) => {
    const calendar = document.getElementById("calendar");
    const calendarIndivBox = document.createElement("div");
    const calendarDate = document.createElement("p");
    calendarIndivBox.setAttribute("class", "calendarIndivBox");
    calendarIndivBox.setAttribute("id", `box${entry.date}`);
    calendarDate.setAttribute("class", "calendarDate");
    calendarDate.textContent = `${entry.date}`;
    calendar.appendChild(calendarIndivBox);
    calendarIndivBox.appendChild(calendarDate);
    function indivBoxColor() {
      if (entry.emotion == "Happy") {
        calendarIndivBox.style.backgroundColor = "#CE3375";
      } else if (entry.emotion == "Angry") {
        calendarIndivBox.style.backgroundColor = "#1b5091";
      } else if (entry.emotion == "Sad") {
        calendarIndivBox.style.backgroundColor = "#6ea1d4";
      } else if (entry.emotion == "Calm") {
        calendarIndivBox.style.backgroundColor = "#60c8b3";
      } else if (entry.emotion == "Anxious") {
        calendarIndivBox.style.backgroundColor = "#e881a6";
      } else if (entry.emotion == "Tired") {
        calendarIndivBox.style.backgroundColor = "#ffa74f";
      } else if (entry.emotion == "Energetic") {
        calendarIndivBox.style.backgroundColor = "#279d9f";
      }
    }
    indivBoxColor();
    const popupOver = document.querySelector("#popupOver");
    const popupBox = document.createElement("div");
    popupBox.setAttribute("class", "popBox");
    popupBox.setAttribute("id", `popupBox${entry.date}`);
    popupBox.style.display = "none";
    popupOver.appendChild(popupBox);
    const popupClose = document.createElement("button");
    popupClose.setAttribute("id", `popupClose${entry.date}`);
    popupClose.setAttribute("class", `popupClose`);
    popupBox.appendChild(popupClose);
    // Completed

    popupClose.style.cursor = "pointer";
    popupClose.innerHTML = `<script>

    </script>
    `;

    const calendarScript = document.createElement("script");

    calendarScript.innerHTML = `const indivBox${entry.date} = document.querySelector("#box${entry.date}");
    indivBox${entry.date}.style.cursor = "pointer";
    console.log(${entry.date});
    indivBox${entry.date}.addEventListener("click", function(){
    console.log("clicked ${entry.date}");
    const popupBox2 = document.querySelector("#popupBox${entry.date}");
    console.log(popupBox2);
    const popupBoxAll = document.querySelector(".popbox");
    popupBox${entry.date}.style.display = "flex";
    popupOver.style.gridArea = "2 / 2 / 4 / 5";
    const popupCloseButton = document.querySelector("#popupClose${entry.date}");
    popupCloseButton.addEventListener("click", function (){
    console.log('Worked');
    popupOver.style.gridArea = "2 / 2 / 2 / 2";
    popupBox${entry.date}.style.display = "none";})
    ;
    
    
});
    ;
    `;
    calendarScript.defer = true;
    calendarIndivBox.appendChild(calendarScript);
  });
}

testStuff();

const messageForm = document.querySelector("#moods");

function handleSubmitMessageForm(event) {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);
  fetch("http://localhost:8080/moodTrackerEntry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  console.log(formValues);
}
messageForm.addEventListener("submit", handleSubmitMessageForm);
