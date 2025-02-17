window.addEventListener(
  "load",
  function () {
    new Accessibility();
  },
  false
);
async function fetchMoodEntry() {
  const response = await fetch(
    "https://week10researchproject.onrender.com/moodthing"
  );
  const data = await response.json();
  console.log(data);
  data.forEach((entry) => {
    // Creates individual boxes for database entries
    const calendar = document.getElementById("calendar");
    const calendarIndivBox = document.createElement("div");
    calendarIndivBox.setAttribute("class", "calendarIndivBox");
    calendarIndivBox.setAttribute("id", `box${entry.id}`);
    calendarIndivBox.style.aspectRatio = "1/1";
    calendar.appendChild(calendarIndivBox);
    // Sets box colour based on Mood
    console.log("javascript okay until here");
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
    let emojisFace = "😁";
    function emojis() {
      if (entry.emoji == 128513) {
        emojisFace = `😁`;
      } else if (entry.emoji == 128546) {
        emojisFace = `😢`;
      } else if (entry.emoji == 128548) {
        emojisFace = `😤`;
      } else if (entry.emoji == 128545) {
        emojisFace = `😡`;
      } else if (entry.emoji == 128564) {
        emojisFace = `😴`;
      } else if (entry.emoji == 129298) {
        emojisFace = `🤒`;
      } else if (entry.emoji == 129314) {
        emojisFace = `🤢`;
      } else if (entry.emoji == 129392) {
        emojisFace = `🥰`;
      } else if (entry.emoji == 129402) {
        emojisFace = `🥺`;
      } else if (entry.emoji == 129398) {
        emojisFace = `🥶`;
      } else if (entry.emoji == 129397) {
        emojisFace = `🥵`;
      } else if (entry.emoji == 129395) {
        emojisFace = `🥳`;
      } else if (entry.emoji == 129396) {
        emojisFace = `🥴`;
      } else if (entry.emoji == 129324) {
        emojisFace = `🤬`;
      }
    }
    emojis();
    calendarDate.textContent = `${entry.date} ${emojisFace}`;
    calendarIndivBox.appendChild(calendarDate);

    // Creates the pop up box and sets the display type to 'none' so it's invisible

    const popupBox = document.createElement("div");
    const popupOver = document.querySelector("#popupOver");
    popupBox.setAttribute("id", `popupBox${entry.id}`);
    popupBox.setAttribute("class", "popBox");
    popupBox.style.display = "none";
    popupOver.style.gridTemplateColumns = "1fr 7fr 1fr";
    popupOver.style.gridTemplateRows = "1fr 7fr";
    popupBox.style.gridArea = "1 / 1 / 3 / 4";
    popupOver.appendChild(popupBox);

    // Creates the close button for the popup box

    const popupClose = document.createElement("button");
    popupClose.setAttribute("id", `popupClose${entry.id}`);
    popupClose.setAttribute("class", `popupClose`);
    popupClose.style.cursor = "pointer";
    popupClose.textContent = "X";
    popupBox.appendChild(popupClose);

    // Creates the text in the popup box

    const popupBoxText = document.createElement("p");
    popupBoxText.setAttribute("class", "popupBoxText");
    popupBoxText.style.gridArea = "2 / 2 / 3 / 3";
    popupBoxText.textContent = `Date: ${entry.date}`;

    const popupBoxText2 = document.createElement("p");
    popupBoxText2.setAttribute("class", "popupBoxText");
    popupBoxText2.style.gridArea = "2 / 2 / 3 / 3";
    popupBoxText2.textContent = `Emotion: ${entry.mood}`;

    const popupBoxText3 = document.createElement("p");
    popupBoxText3.setAttribute("class", "popupBoxText");
    popupBoxText3.style.gridArea = "2 / 2 / 3 / 3";
    popupBoxText3.textContent = `Comment:`;

    const popupBoxText4 = document.createElement("p");
    popupBoxText4.setAttribute("class", "popupBoxText");
    popupBoxText4.style.gridArea = "2 / 2 / 3 / 3";
    popupBoxText4.style.height = "50%";
    popupBoxText4.textContent = `${entry.comment}`;

    popupBox.appendChild(popupBoxText);
    popupBox.appendChild(popupBoxText2);
    popupBox.appendChild(popupBoxText3);
    popupBox.appendChild(popupBoxText4);

    // Creates javascript to add into the individual boxes to enable targetting each box on click

    const calendarScript = document.createElement("script");

    calendarScript.innerHTML = `const indivBox${entry.id} = document.querySelector("#box${entry.id}");
    
    // Changes properties of the boxes so that when you hover over them it changes the cursor to a hand

    indivBox${entry.id}.style.cursor = "pointer";
   
    // Opens the associated pop up on clicking a calendar entry
  
    indivBox${entry.id}.addEventListener("click", function(){
    const popupBox2 = document.querySelector("#popupBox${entry.id}");
    const popupBoxAll = document.querySelector(".popbox");
    popupBox${entry.id}.style.display = "initial";
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
  fetch("https://week10researchproject.onrender.com/moodTrackerEntry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formValues }),
  });
  console.log(formValues);
  alert("Your mood entry was submitted!");
  messageForm.submit();
  messageForm.reset();
  return false;
}
messageForm.addEventListener("submit", handleSubmitMessageForm);
