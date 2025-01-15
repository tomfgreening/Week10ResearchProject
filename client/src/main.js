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
  const response = await fetch("http://localhost:8080/moodthing");
  const data = await response.json();
  console.log(data);
  data.slice(-35).forEach((entry) => {
    // Creates individual boxes for database entries
    const calendar = document.getElementById("calendar");
    const calendarIndivBox = document.createElement("div");
    calendarIndivBox.setAttribute("class", "calendarIndivBox");
    calendarIndivBox.setAttribute("id", `box${entry.id}`);
    calendar.appendChild(calendarIndivBox);

    // Sets box colour based on Mood

    function indivBoxColor() {
      if (entry.mood == "Happy") {
        calendarIndivBox.style.backgroundColor = "#CE3375";
      } else if (entry.mood == "Angry") {
        calendarIndivBox.style.backgroundColor = "#1b5091";
      } else if (entry.mood == "Sad") {
        calendarIndivBox.style.backgroundColor = "#6ea1d4";
      } else if (entry.mood == "Calm") {
        calendarIndivBox.style.backgroundColor = "#60c8b3";
      } else if (entry.mood == "Anxious") {
        calendarIndivBox.style.backgroundColor = "#e881a6";
      } else if (entry.mood == "Tired") {
        calendarIndivBox.style.backgroundColor = "#ffa74f";
      } else if (entry.mood == "Energetic") {
        calendarIndivBox.style.backgroundColor = "#279d9f";
      }
    }
    indivBoxColor();

    // Adds the date into the calendar boxes

    const calendarDate = document.createElement("p");
    calendarDate.setAttribute("class", "calendarDate");
    calendarDate.textContent = `${entry.date}`;
    calendarIndivBox.appendChild(calendarDate);

    // Creates the pop up box and sets the display type to 'none' so it's invisible

    const popupBox = document.createElement("div");
    const popupOver = document.querySelector("#popupOver");
    popupBox.setAttribute("id", `popupBox${entry.id}`);
    popupBox.setAttribute("class", "popBox");
    popupBox.style.display = "none";
    popupOver.appendChild(popupBox);

    // Creates the close button for the popup box

    const popupClose = document.createElement("button");
    popupClose.setAttribute("id", `popupClose${entry.id}`);
    popupClose.setAttribute("class", `popupClose`);
    popupClose.style.cursor = "pointer";
    popupBox.appendChild(popupClose);

    // Creates the text in the popup box

    const popupBoxText = document.createElement("p");
    popupBoxText.setAttribute("class", "popupBoxText");
    popupBoxText.textContent = `Date: ${entry.date}
    Emotion: ${entry.mood}
    Comment: ${entry.comment}`;
    popupBox.appendChild(popupBoxText);

    // Creates javascript to add into the individual boxes to enable targetting each box on click

    const calendarScript = document.createElement("script");

    calendarScript.innerHTML = `const indivBox${entry.id} = document.querySelector("#box${entry.id}");
    
    // Changes properties of the boxes so that when you hover over them it changes the cursor to a hand

    indivBox${entry.id}.style.cursor = "pointer";
   
    // Opens the associated pop up on clicking a calendar entry
  
    indivBox${entry.id}.addEventListener("click", function(){
    const popupBox2 = document.querySelector("#popupBox${entry.id}");
    const popupBoxAll = document.querySelector(".popbox");
    popupBox${entry.id}.style.display = "flex";
    popupOver.style.gridArea = "2 / 2 / 4 / 5";

    // Closes the associated pop up on clicking the close button

    const popupCloseButton = document.querySelector("#popupClose${entry.id}");
    popupCloseButton.addEventListener("click", function (){
    popupOver.style.gridArea = "2 / 2 / 2 / 2";
    popupBox${entry.id}.style.display = "none";})
    ;
});
    ;
    `;
    calendarScript.defer = true;

    calendarIndivBox.appendChild(calendarScript);
  });
}
fetchMoodEntry();

const messageForm = document.querySelector("#moods");

function handleSubmitMessageForm(event) {
  event.preventDefault();
  const formData = new FormData(messageForm);
  const formValues = Object.fromEntries(formData);
  const dateValue = $("#datepicker").val();
  formValues.date = dateValue;
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

const submitButton = document.getElementById("button");
button.addEventListener("click", function () {
  // if (datepicker.value.trim() === "" || moodSelect.value.trim() === "" || comment.value.trim() === "") {
  // alert("Please complete the form!");
  // } else {
  alert("Your mood entry was submitted!");
});

app.post("/moodTrackerEntry", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query(
    `INSERT INTO moods (col1, col2, col3, col4) VALUES ($1, $2, $3, $4)`,
    [data.date, data.mood, data.comment, data.emotion]
  );
  await res.json(query.rows);
  console.log(data);
});
