// async function fetchData() {
//   const response = await fetch("http://localhost:8080/data");
//   const data = await response.json();
//   console.log(data);
//   data.forEach((entry) => {
//   const calendarIndivBox = document.createElement("div");
//   calendarIndivBox.setAttribute("class", "calendarIndivBox");
//   const calendarDate = document.createElement("p");
//   calendarDate.setAttribute("class", "calendarDate");
//   calendarDate.textContent = `${entry.date}`;
//   calendar.appendChild(calendarIndivBox);
//   calendarIndivBox.appendChild(calendarDate);
//   function indivBoxColor() {
//     if (entry.emotion == "Happy") {
//       calendarIndivBox.style.backgroundColor = "#FFAE42";
//     } else if (entry.emotion == "Angry") {
//       calendarIndivBox.style.backgroundColor = "Crimson";
//     } else if (entry.emotion == "Sad") {
//       calendarIndivBox.style.backgroundColor = "MediumPurple";
//     } else if (entry.emotion == "Calm") {
//       calendarIndivBox.style.backgroundColor = "LightGreen";
//     } else if (entry.emotion == "Anxious") {
//       calendarIndivBox.style.backgroundColor = "HotPink";
//     } else if (entry.emotion == "Tired") {
//       calendarIndivBox.style.backgroundColor = "Peru";
//     } else if (entry.emotion == "Energetic") {
//       calendarIndivBox.style.backgroundColor = "LightCyan";
//     }
//   }
//   indivBoxColor();
// });
// }

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
  { date: "21", emotion: "Anxious", comment: "None" },
  { date: "22", emotion: "Tired", comment: "None" },
  { date: "23", emotion: "Energetic", comment: "None" },
  { date: "24", emotion: "Calm", comment: "None" },
  { date: "25", emotion: "Anxious", comment: "None" },
  { date: "26", emotion: "Tired", comment: "None" },
  { date: "27", emotion: "Energetic", comment: "None" },
  { date: "28", emotion: "Happy", comment: "None" },
];

function testShit() {
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
    // Completed

    const script = document.createElement("script");
    script.innerHTML = `const box = document.getElementByID('box${entry.date}');
    console.log(box);`;
    calendarIndivBox.appendChild(script);
  });
}

testShit();
