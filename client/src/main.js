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

function testStuff() {
  tempArray.slice(-35).forEach((entry) => {
    // Consts
    const popupOver = document.querySelector("#popupOver");
    const calendar = document.getElementById("calendar");
    const calendarIndivBox = document.createElement("div");
    const calendarDate = document.createElement("p");
    const popupBox = document.createElement("div");
    const popupBoxText = document.createElement("p");
    const popupClose = document.createElement("button");
    const calendarScript = document.createElement("script");

    calendarIndivBox.setAttribute("class", "calendarIndivBox");
    calendarIndivBox.setAttribute("id", `box${entry.date}`);
    calendarDate.setAttribute("class", "calendarDate");
    calendarDate.textContent = `${entry.date}`;

    function indivBoxColor() {
      if (entry.emotion == "Happy") {
        calendarIndivBox.style.backgroundColor = "#FFAE42";
      } else if (entry.emotion == "Angry") {
        calendarIndivBox.style.backgroundColor = "Crimson";
      } else if (entry.emotion == "Sad") {
        calendarIndivBox.style.backgroundColor = "MediumPurple";
      } else if (entry.emotion == "Calm") {
        calendarIndivBox.style.backgroundColor = "LightGreen";
      } else if (entry.emotion == "Anxious") {
        calendarIndivBox.style.backgroundColor = "HotPink";
      } else if (entry.emotion == "Tired") {
        calendarIndivBox.style.backgroundColor = "Peru";
      } else if (entry.emotion == "Energetic") {
        calendarIndivBox.style.backgroundColor = "LightCyan";
      }
    }
    indivBoxColor();

    popupBox.setAttribute("class", "popBox");

    popupBoxText.setAttribute("class", "popupBoxText");
    popupBoxText.textContent = `Date: ${entry.date}
    Emotion: ${entry.emotion}
    Comment: ${entry.comment}`;

    popupBox.setAttribute("id", `popupBox${entry.date}`);
    popupBox.style.display = "none";

    popupClose.setAttribute("id", `popupClose${entry.date}`);
    popupClose.setAttribute("class", `popupClose`);

    // Completed

    popupClose.style.cursor = "pointer";

    // Embedded

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

    // Appends

    calendar.appendChild(calendarIndivBox);
    calendarIndivBox.appendChild(calendarDate);
    popupBox.appendChild(popupBoxText);
    popupOver.appendChild(popupBox);
    popupBox.appendChild(popupClose);
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

app.post("/moodTrackerEntry", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query(
    `INSERT INTO moods (col1, col2, col3, col4) VALUES ($1, $2, $3, $4)`,
    [data.date, data.mood, data.comment, data.emotion]
  );
  await res.json(query.rows);
});
