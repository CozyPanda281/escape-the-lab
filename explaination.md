# Our Escape Room Game — Explained Like You're Five

Hello, friend! Do you like games where you get stuck in a room and have to
find clues to escape? That is exactly what we built! But we did not buy it
from a toy store. **We made the whole game ourselves** using four special
tools that computers understand.

Let me tell you all about it, nice and slowly.

---

## 1. The Big Idea

You are alone in a spooky **Professor's Lab**. The door is locked!

To escape you must:

1. Look around the room and find **three secret numbers** (clues).
2. Look out the **window** to find the laptop's password.
3. Unlock the **laptop** with that password.
4. The laptop tells you the **door code**.
5. Type the door code into the **door's keypad**...
6. ...and the door opens! **You are free!**

Computers do not know how to make a room by magic. So we told the computer
exactly what to do, using four different languages. Each language does a
different job. That is like how in a kitchen, the cook, the oven, and the
recipe book all help make a cake — but each one does a different thing.

---

## 2. The Four Files We Made

### `index.html` — The Skeleton

Our game is a little house. The `index.html` file is the **skeleton** of the
house. It is a list of all the bones.

It says:

- "There is an exit door."
- "There is a laptop."
- "There is a painting, a bookshelf, a clock, a window, and a poster."
- "There is a little screen where we show messages."
- "There are three little boxes for the clues."

But a skeleton by itself is ugly. It has no colors, and nothing on it moves.
That is where the next file comes in!

### `style.css` — The Paint

The `style.css` file is our **paint box and crayons**. It decides what
everything **looks** like.

It says things like:

- "Paint the laptop's screen green when it is awake."
- "Make the door brown like wood."
- "Make the ceiling dark, like a real spooky night."
- "When I hover over a thing with my mouse, make it get brighter."
- "When I tap a keypad button, make it press down."

The skeleton (HTML) stays the same, but painting it (CSS) is what makes the
game look pretty and fun.

### `game.js` — The Brain

The `game.js` file is the **brain** of the game. A skeleton and some paint
cannot play games by themselves. The brain makes things *happen*.

The brain remembers everything:

- Did I find the painting clue? **Yes.**
- Did I find the clock clue? **Not yet.**
- What numbers did I press on the keypad? It remembers those too.

The brain is the one that says:

- "Oh! The player clicked the window! They got the password `307`!"
- "The player typed the right password, so open the laptop!"
- "The player typed `274` on the door. That is correct! **Show the party screen!**"

It is also the one with the rules, like: *"Only open the laptop if the
password was right"* and *"Only let you escape if the code is `274`."*

### `lock.c` — The Professor's Secret Machine

This one is a little special. It is written in a language called **C**,
which is a really grown-up language that lives inside your computer's
terminal (the little black window where you type commands).

The game page (the first three files) runs in a web browser. The C program
does not live in the browser — it runs by itself when you type:

```
gcc lock.c -o lock
./lock
```

Why did we include it? Because it makes our game a **real escape room**!
Picture this: the door code is not printed anywhere. Nobody just hands it to
you. A secret little machine (the C program) is the only thing that knows
how to turn your three clue numbers into the door code.

When you run it, it asks you:

```
What is the clue from the painting?   → you type 4
What is the clue from the bookshelf?  → you type 7
What is the clue from the clock?      → you type 2
```

Then it does a tiny bit of math to build the door code:

```
doorCode = clock * 100 + bookshelf * 10 + painting
doorCode = 2 × 100 + 7 × 10 + 4
doorCode = 200 + 70 + 4
doorCode = 274
```

And it shouts: **"DOOR CODE: 274"** — and *that* is the number you type into
the keypad to escape!

Why does the math look like that? Think of it like building a number with
toy blocks. The `100` block holds the clock's number, the `10` block holds
the bookshelf's number, and the `1` block holds the painting's number. It is
just a way to order the three clues into one big number.

---

## 3. How the Files Work Together

Here is the whole game, one step at a time, like a bedtime story:

1. **`index.html`** builds the room. Every object (window, laptop, door,
   painting…) is a box sitting in the room.
2. **`style.css`** paints every box so it looks like furniture — the window
   has a moon, the laptop has a screen, the door looks like wood.
3. **`game.js`** is the referee. When you click something, it says: *"You
   clicked the window!"* and tells you what you found. It quietly writes
   notes to remember what you have done.
4. When you have all three clue numbers and the laptop password, **`game.js`**
   unlocks the laptop and tells you the code is `274`.
5. Back in the real world, you run **`lock.c`** in the terminal. You give it
   your three clue numbers, and it *proves* the code is `274` by doing the
   math for you. (It is like checking your answer with a calculator!)
6. You type `274` into the door keypad. **`game.js`** checks: "Is `274` the
   right number?" Yes! The door opens, and confetti-worthy fun happens.

So the webpage is your eyes and hands in the room, and the C program is the
secret machine that turns your clues into the unlock code. They are two
pieces of one giant puzzle.

---

## 4. The Little Things Inside the Code (explained simply)

Even though the code looks like big grown-up words, each part is just a toy
or a rule. Here are the toys you will see:

| What you see       | What it really is                                        |
| ------------------ | -------------------------------------------------------- |
| `var` / `let`      | A **box** that holds one thing (like a number or a word) |
| `if` and `else`    | A **fork in the road**: "If yes, go this way. If no, go that way." |
| `function`         | A **recipe**: a list of steps you can reuse any time     |
| `object` / `array` | A **tackle box**: a box with many little mini-boxes inside |
| `document`         | Your **hand** that reaches into the page and grabs things |
| `onclick`          | A sign that says **"when I click, do this"**             |
| `scanf`            | The C program's **ears** — it listens for you to type    |
| `printf`           | The C program's **mouth** — it talks back to you         |

A little example: in `lock.c`, we first make three empty boxes:

```c
int painting = 0;   // a box for the painting clue
int bookshelf = 0;  // a box for the bookshelf clue
int clock = 0;      // a box for the clock clue
```

Then we use the ears to fill the boxes:

```c
scanf("%d", &painting);    // "Listen! What is the painting number?"
printf("DOOR CODE: %d", doorCode);  // "Shout the answer!"
```

The `int` just tells the computer: *"This box is allowed to hold numbers."*

---

## 5. Why Each File Is There (the assignment answer)

| File         | Job in one sentence                                            |
| ------------ | -------------------------------------------------------------- |
| `index.html` | Holds all the game's pieces and connects the other files       |
| `style.css`  | Makes the game pretty, so it looks like a real room            |
| `game.js`    | Makes the game playable — remembers clues, checks passwords    |
| `lock.c`     | A real C program that computes the door code from your clues   |

So if your teacher asks *"why did you use four different languages?"* you can
say: **each one is the best at its own job.** HTML builds the bones, CSS
paints the outside, JavaScript brings it to life, and C does the serious
math like a little computer inside your computer.

---

## 6. How to Play (the recipe)

1. Open `index.html` in a web browser.
2. Click the **painting**, the **bookshelf**, and the **clock** to find
   clues → you should find `4`, `7`, and `2`.
3. Click the **window** to find the laptop password → `307`.
4. Open the terminal and run the secret machine:
   ```
   gcc lock.c -o lock
   ./lock
   ```
   Feed it `4`, `7`, `2`. It replies: **DOOR CODE: 274**.
5. Click the **laptop**, type password `307`. 
6. Click the **door**, type `274`. The door opens — you escaped!

---

## 7. One Last Fun Fact

If you ever want a different code, just change the clue numbers AND the small
math formula in both `game.js` and `lock.c` — they must always agree with
each other. The webpage and the C machine are partners, so they always have
to tell the same story.

**And that, my friend, is how you build your very own escape room.**