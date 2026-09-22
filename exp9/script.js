/*
===========================================================
    PREBUILT SEMINAR SCHEDULE
===========================================================
*/

const schedule = [

  {
    id: "mon-introduction-xml",
    day: "Monday",
    begin: "8:00 a.m.",
    end: "5:00 p.m.",
    topic: "Introduction to XML"
  },

  {
    id: "mon-validity-dtd-relaxng",
    day: "Monday",
    begin: "8:00 a.m.",
    end: "11:00 a.m.",
    topic: "Validity: DTD and Relax NG"
  },

  {
    id: "tue-xpath",
    day: "Tuesday",
    begin: "11:00 a.m.",
    end: "2:00 p.m.",
    topic: "XPath"
  },

  {
    id: "tue-xsl-transformations",
    day: "Tuesday",
    begin: "2:00 p.m.",
    end: "5:00 p.m.",
    topic: "XSL Transformations"
  },

  {
    id: "wed-xsl-formatting-objects",
    day: "Wednesday",
    begin: "8:00 a.m.",
    end: "12:00 p.m.",
    topic: "XSL Formatting Objects"
  }

];


/*
===========================================================
    STORAGE KEYS
===========================================================

Individual topics:
    localStorage

Entire days:
    sessionStorage
===========================================================
*/

const STORAGE_KEYS = {

  SAVED_TOPICS: "seminarPlanner_savedTopics",

  SAVED_DAYS: "seminarPlanner_savedDays"

};


/*
===========================================================
    CURRENTLY SELECTED LECTURE
===========================================================
*/

let selectedLectureId = null;


/*
===========================================================
    LOCAL STORAGE
===========================================================
*/

function getSavedTopics() {

  try {

    const data = localStorage.getItem(
      STORAGE_KEYS.SAVED_TOPICS
    );

    return data ? JSON.parse(data) : [];

  } catch (error) {

    console.error(
      "Error reading saved topics:",
      error
    );

    return [];

  }

}


function saveTopicsToStorage(savedTopics) {

  localStorage.setItem(
    STORAGE_KEYS.SAVED_TOPICS,
    JSON.stringify(savedTopics)
  );

}


/*
===========================================================
    SESSION STORAGE
===========================================================
*/

function getSavedDays() {

  try {

    const data = sessionStorage.getItem(
      STORAGE_KEYS.SAVED_DAYS
    );

    return data ? JSON.parse(data) : [];

  } catch (error) {

    console.error(
      "Error reading saved days:",
      error
    );

    return [];

  }

}


function saveDaysToStorage(savedDays) {
  sessionStorage.setItem(
    STORAGE_KEYS.SAVED_DAYS,
    JSON.stringify(savedDays)
  );
}


/*
===========================================================
    CHECK WHETHER INDIVIDUAL TOPIC IS SAVED
===========================================================
*/

function isTopicSaved(lectureId) {

  const savedTopics = getSavedTopics();

  return savedTopics.some(
    topic => topic.id === lectureId
  );

}


/*
===========================================================
    CHECK WHETHER LECTURE BELONGS TO A SAVED DAY
===========================================================

This is the part that was missing previously.

If Tuesday is saved:

    savedDays = [
        {
            day: "Tuesday",
            lectures: [...]
        }
    ]

Then BOTH Tuesday lectures should be highlighted.
===========================================================
*/

function isLectureInSavedDay(lecture) {

  const savedDays = getSavedDays();

  return savedDays.some(
    savedDay => {

      return savedDay.day === lecture.day;

    }
  );

}


/*
===========================================================
    CHECK WHETHER LECTURE SHOULD BE HIGHLIGHTED
===========================================================

A lecture should be highlighted if:

    1. It was individually saved to localStorage

OR

    2. Its entire day was saved to sessionStorage
===========================================================
*/

function isLectureSaved(lecture) {

  return (
    isTopicSaved(lecture.id) ||
    isLectureInSavedDay(lecture)
  );

}


/*
===========================================================
    RENDER SCHEDULE
===========================================================
*/

function renderSchedule() {

  const scheduleBody =
    document.getElementById(
      "scheduleBody"
    );


  scheduleBody.innerHTML = "";


  schedule.forEach((lecture) => {

    const row =
      document.createElement("tr");


    row.classList.add(
      "lecture-row"
    );


    row.dataset.lectureId =
      lecture.id;


    /*
    ===================================================
    DETERMINE SAVED STATE
    ===================================================

    This checks BOTH:

        localStorage
        sessionStorage

    Therefore saved highlighting is restored when
    the page is refreshed.
    */

    const topicSaved =
      isTopicSaved(lecture.id);


    const daySaved =
      isLectureInSavedDay(lecture);


    const saved =
      topicSaved || daySaved;


    /*
    ===================================================
    APPLY SAVED HIGHLIGHT
    ===================================================
    */

    if (saved) {

      row.classList.add(
        "saved-topic"
      );

    }


    /*
    ===================================================
    DAY CELL
    ===================================================
    */

    const dayCell =
      document.createElement("td");

    dayCell.classList.add(
      "day-cell"
    );

    dayCell.textContent =
      lecture.day;


    /*
    ===================================================
    BEGIN CELL
    ===================================================
    */

    const beginCell =
      document.createElement("td");

    beginCell.textContent =
      lecture.begin;


    /*
    ===================================================
    END CELL
    ===================================================
    */

    const endCell =
      document.createElement("td");

    endCell.textContent =
      lecture.end;


    /*
    ===================================================
    TOPIC CELL
    ===================================================
    */

    const topicCell =
      document.createElement("td");

    topicCell.classList.add(
      "topic-cell"
    );


    const topicText =
      document.createElement("span");

    topicText.textContent =
      lecture.topic;


    topicCell.appendChild(
      topicText
    );


    /*
    ===================================================
    SAVED BADGE
    ===================================================

    Show what caused the lecture to be highlighted.

    Topic saved:
        localStorage

    Day saved:
        sessionStorage
    ===================================================
    */

    if (topicSaved) {

      const badge =
        document.createElement("span");

      badge.classList.add(
        "saved-badge"
      );

      badge.textContent =
        "Saved";

      topicCell.appendChild(
        badge
      );

    }
    else if (daySaved) {

      const badge =
        document.createElement("span");

      badge.classList.add(
        "saved-badge"
      );

      badge.textContent =
        "Day Saved";

      topicCell.appendChild(
        badge
      );

    }


    /*
    ===================================================
    ADD CELLS
    ===================================================
    */

    row.appendChild(
      dayCell
    );

    row.appendChild(
      beginCell
    );

    row.appendChild(
      endCell
    );

    row.appendChild(
      topicCell
    );


    /*
    ===================================================
    SELECT LECTURE
    ===================================================
    */

    row.addEventListener(
      "click",
      () => {

        selectLecture(
          lecture.id
        );

      }
    );


    scheduleBody.appendChild(
      row
    );

  });


  /*
  =======================================================
  RESTORE CURRENT SELECTION
  =======================================================
  */

  if (selectedLectureId) {

    const selectedRow =
      document.querySelector(
        `[data-lecture-id="${selectedLectureId}"]`
      );


    if (selectedRow) {

      selectedRow.classList.add(
        "selected"
      );

    }

  }


  updateButtons();

}


/*
===========================================================
    SELECT LECTURE
===========================================================
*/

function selectLecture(lectureId) {

  selectedLectureId =
    lectureId;


  /*
  Remove previous temporary selection.
  */

  document
    .querySelectorAll(".lecture-row")
    .forEach(row => {

      row.classList.remove(
        "selected"
      );

    });


  /*
  Highlight currently selected lecture.
  */

  const selectedRow =
    document.querySelector(
      `[data-lecture-id="${lectureId}"]`
    );


  if (selectedRow) {

    selectedRow.classList.add(
      "selected"
    );

  }


  /*
  Find lecture.
  */

  const lecture =
    schedule.find(
      item =>
        item.id === lectureId
    );


  if (lecture) {

    setStatus(
      `Selected: ${lecture.topic}`
    );

  }


  updateButtons();

}


/*
===========================================================
    BUTTON STATE
===========================================================
*/

function updateButtons() {

  const saveTopicBtn =
    document.getElementById(
      "saveTopicBtn"
    );


  const saveDayBtn =
    document.getElementById(
      "saveDayBtn"
    );


  const hasSelection =
    selectedLectureId !== null;


  saveTopicBtn.disabled =
    !hasSelection;


  saveDayBtn.disabled =
    !hasSelection;

}


/*
===========================================================
    SAVE TOPIC
===========================================================

Individual lecture
        ↓
localStorage
        ↓
permanent saved state
        ↓
highlight persists
===========================================================
*/

function saveSelectedTopic() {

  if (!selectedLectureId) {

    return;

  }


  /*
  Find selected lecture.
  */

  const lecture =
    schedule.find(
      item =>
        item.id === selectedLectureId
    );


  if (!lecture) {

    setStatus(
      "Selected lecture could not be found.",
      "error"
    );

    return;

  }


  /*
  Get existing topics.
  */

  const savedTopics =
    getSavedTopics();


  /*
  Prevent duplicates.
  */

  const alreadySaved =
    savedTopics.some(
      topic =>
        topic.id === lecture.id
    );


  if (!alreadySaved) {

    savedTopics.push(
      lecture
    );

    saveTopicsToStorage(
      savedTopics
    );

  }


  /*
  Re-render.

  renderSchedule() will read localStorage and
  apply the saved-topic class.
  */

  renderSchedule();


  /*
  Restore current selection.
  */

  const row =
    document.querySelector(
      `[data-lecture-id="${lecture.id}"]`
    );


  if (row) {

    row.classList.add(
      "selected"
    );

  }


  setStatus(
    `"${lecture.topic}" saved to localStorage.`,
    "success"
  );

}


/*
===========================================================
    SAVE ENTIRE DAY
===========================================================

Example:

User selects:

    XPath

XPath.day:

    Tuesday

Then:

    ALL Tuesday lectures

are saved.

===========================================================

IMPORTANT:

The actual saved day is stored in sessionStorage.

The UI also reads sessionStorage when rendering,
so the highlighting survives page refresh.
===========================================================
*/

function saveSelectedDay() {

  if (!selectedLectureId) {

    return;

  }


  /*
  Find selected lecture.
  */

  const selectedLecture =
    schedule.find(
      item =>
        item.id === selectedLectureId
    );


  if (!selectedLecture) {

    setStatus(
      "Selected lecture could not be found.",
      "error"
    );

    return;

  }


  /*
  Determine which day was selected.
  */

  const selectedDay =
    selectedLecture.day;


  /*
  Get ALL lectures from that day.
  */

  const dayLectures =
    schedule.filter(
      lecture =>
        lecture.day === selectedDay
    );


  /*
  Get previously saved days.
  */

  const savedDays =
    getSavedDays();


  /*
  Check whether this day already exists.
  */

  const existingDayIndex =
    savedDays.findIndex(
      savedDay =>
        savedDay.day === selectedDay
    );


  /*
  Create complete day object.
  */

  const dayObject = {

    day: selectedDay,

    lectures: dayLectures

  };


  /*
  Add new day OR update existing day.
  */

  if (existingDayIndex === -1) {

    savedDays.push(
      dayObject
    );

  }
  else {

    savedDays[
      existingDayIndex
    ] = dayObject;

  }


  /*
  =======================================================
  SAVE TO SESSION STORAGE
  =======================================================

  This is deliberate.

  sessionStorage survives:

      ✓ page refresh
      ✓ navigation within the site
      ✓ reopening the page in the same browser tab/session

  It does NOT survive the end of the browser session.
  =======================================================
  */

  saveDaysToStorage(
    savedDays
  );


  /*
  =======================================================
  RE-RENDER
  =======================================================

  This is CRITICAL.

  renderSchedule() now reads sessionStorage.

  Since selectedDay is saved there, every lecture
  belonging to that day receives:

      .saved-topic

  and becomes highlighted.
  =======================================================
  */

  renderSchedule();


  /*
  Keep the originally selected lecture selected.
  */

  const row =
    document.querySelector(
      `[data-lecture-id="${selectedLectureId}"]`
    );


  if (row) {

    row.classList.add(
      "selected"
    );

  }


  setStatus(
    `${selectedDay}'s complete schedule saved to sessionStorage.`,
    "success"
  );

}


/*
===========================================================
    CLEAR ALL
===========================================================
*/

function clearAll() {

  /*
  Remove individual saved topics.
  */

  localStorage.removeItem(
    STORAGE_KEYS.SAVED_TOPICS
  );


  /*
  Remove saved days.
  */

  sessionStorage.removeItem(
    STORAGE_KEYS.SAVED_DAYS
  );


  /*
  Clear current selection.
  */

  selectedLectureId =
    null;


  /*
  Re-render.

  Both localStorage and sessionStorage are now empty,
  so all persistent highlighting disappears.
  */

  renderSchedule();


  setStatus(
    "All saved topics and days have been cleared.",
    "success"
  );

}


/*
===========================================================
    STATUS MESSAGE
===========================================================
*/

function setStatus(
  message,
  type = ""
) {

  const statusMessage =
    document.getElementById(
      "statusMessage"
    );


  statusMessage.textContent =
    message;


  statusMessage.className =
    "status-message";


  if (type) {

    statusMessage.classList.add(
      type
    );

  }

}


/*
===========================================================
    BUTTON EVENTS
===========================================================
*/

document
  .getElementById("saveTopicBtn")
  .addEventListener(
    "click",
    saveSelectedTopic
  );


document
  .getElementById("saveDayBtn")
  .addEventListener(
    "click",
    saveSelectedDay
  );


document
  .getElementById("clearAllBtn")
  .addEventListener(
    "click",
    clearAll
  );


/*
===========================================================
    INITIAL LOAD
===========================================================

This reads BOTH:

    localStorage
    sessionStorage

and reconstructs the correct highlighting.
===========================================================
*/

renderSchedule();