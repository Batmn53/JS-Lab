/* =========================
   DOM ELEMENTS
========================= */

const form =
  document.getElementById(
    "preferencesForm"
  );


const username =
  document.getElementById(
    "username"
  );


const theme =
  document.getElementById(
    "theme"
  );


const accentColor =
  document.getElementById(
    "accentColor"
  );


const localStatus =
  document.getElementById(
    "localStorageStatus"
  );


const sessionStatus =
  document.getElementById(
    "sessionStorageStatus"
  );


const message =
  document.getElementById(
    "message"
  );



/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEY =
  "seminarPlanner.preferences";


const SESSION_KEY =
  "seminarPlanner.sessionTheme";



/* =========================
   LOAD PREFERENCES
========================= */

function loadPreferences() {

  /*
    localStorage persists data
    across browser restarts.
  */

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (saved) {

    try {

      const preferences =
        JSON.parse(saved);


      username.value =
        preferences.username || "";


      theme.value =
        preferences.theme || "light";


      accentColor.value =
        preferences.accentColor || "teal";


      applyAppearance(
        preferences.theme,
        preferences.accentColor
      );


    } catch (error) {

      /*
        If stored JSON is corrupted,
        remove it rather than allowing
        the page to break.
      */

      localStorage.removeItem(
        STORAGE_KEY
      );

    }

  }



  /*
    sessionStorage only lasts for
    the current browser session/tab.
  */

  const sessionTheme =
    sessionStorage.getItem(
      SESSION_KEY
    );


  if (sessionTheme) {

    sessionStatus.textContent =
      `Theme: ${sessionTheme}`;

  }


  updateStorageStatus();

}



/* =========================
   APPLY APPEARANCE
========================= */

function applyAppearance(
  selectedTheme,
  selectedAccent
) {

  /*
    Add/remove dark-mode class.
  */

  document.body.classList.toggle(
    "dark",
    selectedTheme === "dark"
  );


  /*
    Remove existing accent classes.
  */

  document.body.classList.remove(
    "accent-indigo",
    "accent-amber",
    "accent-rose"
  );


  /*
    Teal is the default.
    Therefore it doesn't require
    a special class.
  */

  if (
    selectedAccent &&
    selectedAccent !== "teal"
  ) {

    document.body.classList.add(
      `accent-${selectedAccent}`
    );

  }

}



/* =========================
   UPDATE STORAGE STATUS
========================= */

function updateStorageStatus() {

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );


  if (!saved) {

    localStatus.textContent =
      "No preferences saved";

    return;

  }


  try {

    const preferences =
      JSON.parse(saved);


    localStatus.textContent =
      preferences.username
        ? `Saved for ${preferences.username}`
        : "Preferences saved";


  } catch (error) {

    localStatus.textContent =
      "Stored data is invalid";

  }

}



/* =========================
   SAVE PREFERENCES
========================= */

form.addEventListener(
  "submit",
  (event) => {

    /*
      Prevent normal form submission
      and page reload.
    */

    event.preventDefault();


    const preferences = {

      username:
        username.value.trim(),

      theme:
        theme.value,

      accentColor:
        accentColor.value,

      savedAt:
        new Date().toISOString()

    };


    /*
      Save complete preferences
      into localStorage.

      JSON.stringify converts the
      JavaScript object into a string.
    */

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    );


    /*
      Save the current theme into
      sessionStorage as well.
    */

    sessionStorage.setItem(
      SESSION_KEY,
      theme.value
    );


    /*
      Immediately apply the changes.
    */

    applyAppearance(
      theme.value,
      accentColor.value
    );


    updateStorageStatus();


    sessionStatus.textContent =
      `Theme: ${theme.value}`;


    message.textContent =
      "Preferences saved successfully.";

  }
);



/* =========================
   THEME CHANGE
========================= */

theme.addEventListener(
  "change",
  () => {

    applyAppearance(
      theme.value,
      accentColor.value
    );


    /*
      Keep the currently selected
      theme in sessionStorage.
    */

    sessionStorage.setItem(
      SESSION_KEY,
      theme.value
    );


    sessionStatus.textContent =
      `Theme: ${theme.value}`;

  }
);



/* =========================
   ACCENT COLOR CHANGE
========================= */

accentColor.addEventListener(
  "change",
  () => {

    applyAppearance(
      theme.value,
      accentColor.value
    );

  }
);



/* =========================
   CLEAR PREFERENCES
========================= */

document
  .getElementById("clearBtn")
  .addEventListener(
    "click",
    () => {

      /*
        Remove persistent preferences.
      */

      localStorage.removeItem(
        STORAGE_KEY
      );


      /*
        Remove current-session data.
      */

      sessionStorage.removeItem(
        SESSION_KEY
      );


      /*
        Reset form.
      */

      form.reset();


      theme.value =
        "light";


      accentColor.value =
        "teal";


      /*
        Reset appearance.
      */

      applyAppearance(
        "light",
        "teal"
      );


      updateStorageStatus();


      sessionStatus.textContent =
        "No current-session preference";


      message.textContent =
        "Preferences cleared.";

    }
  );



/* =========================
   INITIALIZE PAGE
========================= */

loadPreferences();