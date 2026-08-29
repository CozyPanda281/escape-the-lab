// ---------- Game data ----------

// The three quotes a player must find, with the digit each hides.
const CLUES = {
  painting:  { digit: 4, text: "the number 4 is painted behind the canvas" },
  bookshelf: { digit: 7, text: "a book spine reads: '7 keys to freedom'" },
  clock:     { digit: 2, text: "the clock is frozen at exactly 2 o'clock" }
};

// The code the C program (lock.c) computes from the clues:
//   code = clock * 100 + bookshelf * 10 + painting  ->  274
const DOOR_CODE = "274";

// The laptop's own password, discovered by reading the window's glass.
const LAPTOP_PASSWORD = "307";

// Keeps track of which clues have been found.
let found = { painting: false, bookshelf: false, clock: false };

// Whether the laptop password has been entered correctly.
let laptopUnlocked = false;

// Which lock the keypad is currently asking for: "laptop" or "door".
let keypadMode = "door";

// The digits the player has pressed on the keypad (max 3).
let entry = "";

// ---------- Clicking objects in the room ----------

function inspect(item) {
  if (item === "window") {
    log("You study the window... a password is etched on the glass: " + LAPTOP_PASSWORD);
    return;
  }

  if (item === "laptop") {
    if (laptopUnlocked) {
      if (Object.values(found).every(Boolean)) {
        log("Laptop unlocked — DOOR CODE: " + DOOR_CODE + " — type it into the keypad.");
      } else {
        log("Laptop is ready. Gather all 3 clues to decrypt the door code.");
      }
    } else {
      log("The laptop is locked. The password was etched on the window's glass...");
      openKeypad("laptop");
    }
    return;
  }

  if (!(item in CLUES)) return;

  if (found[item]) {
    log("You already searched the " + item + ".");
    return;
  }

  found[item] = true;
  log("You inspect the " + item + " ... " + CLUES[item].text + ". (+1 clue)");
  addClueSlot(CLUES[item].digit);
}

// ---------- Clue tracking ----------

function addClueSlot(digit) {
  const slots = document.querySelectorAll("#clues .slot");
  for (const slot of slots) {
    if (slot.textContent === "?") {
      slot.textContent = digit;
      slot.classList.add("found");
      break;
    }
  }
  checkAllFound();
}

function checkAllFound() {
  const complete = Object.values(found).every(Boolean);
  const door = document.getElementById("door");
  if (complete) {
    door.classList.remove("locked");
    door.classList.add("ready");
    log("All 3 clues found. Unlock the laptop to see the door code.");
  }
}

// ---------- Keypad ----------

// Opens the keypad for a specific lock ("laptop" or "door").
function openKeypad(mode) {
  keypadMode = mode;
  document.getElementById("keypad-title").textContent =
    mode === "laptop" ? "LAPTOP PASSWORD" : "ENTER DOOR CODE";
  entry = "";
  document.getElementById("keypad").classList.remove("hidden");
  updateDisplay();
}

function closeKeypad() {
  document.getElementById("keypad").classList.add("hidden");
}

function press(digit) {
  if (entry.length < 3) entry += digit;
  updateDisplay();
}

function clearEntry() {
  entry = "";
  updateDisplay();
}

function submitCode() {
  const display = document.getElementById("display");
  const expected = keypadMode === "laptop" ? LAPTOP_PASSWORD : DOOR_CODE;

  if (entry === expected) {
    document.getElementById("keypad").classList.add("hidden");

    if (keypadMode === "laptop") {
      laptopUnlocked = true;
      document.querySelector("#laptop .label").textContent = "LAPTOP: UNLOCKED";
      document.getElementById("laptop").classList.add("unlocked");
      log(Object.values(found).every(Boolean)
        ? "Laptop unlocked — DOOR CODE: " + DOOR_CODE + " — type it into the keypad."
        : "Laptop unlocked. Gather all 3 clues to decrypt the door code.");
    } else {
      document.getElementById("victory").classList.remove("hidden");
    }
  } else {
    // Wrong input: flash the display red.
    display.textContent = "WRONG";
    display.classList.add("bad");
    clearEntry();
    setTimeout(() => display.classList.remove("bad"), 400);
    log(keypadMode === "laptop" ? "Incorrect laptop password." : "The door beeps angrily. Wrong code.");
  }
}

function updateDisplay() {
  const display = document.getElementById("display");
  display.textContent = entry.padEnd(3, "-");
}

// ---------- Helpers ----------

function log(message) {
  document.getElementById("log").textContent = message;
}

function resetGame() {
  found = { painting: false, bookshelf: false, clock: false };
  laptopUnlocked = false;
  entry = "";
  document.querySelectorAll("#clues .slot").forEach(s => {
    s.textContent = "?";
    s.classList.remove("found");
  });
  document.getElementById("door").classList.add("locked");
  document.getElementById("door").classList.remove("ready");
  document.getElementById("laptop").classList.remove("unlocked");
  document.querySelector("#laptop .label").textContent = "LAPTOP";
  document.getElementById("victory").classList.add("hidden");
  document.getElementById("keypad").classList.add("hidden");
  document.getElementById("log").textContent = "You wake up locked inside the Professor's Lab. Explore the room...";
}