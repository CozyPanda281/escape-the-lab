/*
 * lock.c -- The Lab Terminal (decryption module)
 *
 * The player finds three clue digits inside the room (painting, bookshelf,
 * clock). This program reads those digits and computes the real door code.
 *
 *   The code is just the three clues in reverse order:
 *     doorCode = clock * 100 + bookshelf * 10 + painting
 *
 * Compile:  gcc lock.c -o lock
 * Run:      ./lock
 */

#include <stdio.h>

int main(void) {
    int painting = 0;   // clue digit hidden in the painting
    int bookshelf = 0;  // clue digit on the bookshelf
    int clock = 0;      // clue digit on the clock

    printf("\n=============================\n");
    printf("  Lab Terminal v1.0 -- Decrypt\n");
    printf("=============================\n");

    printf("\nEnter the clue from the PAINTING  : ");
    scanf("%d", &painting);

    printf("Enter the clue from the BOOKSHELF : ");
    scanf("%d", &bookshelf);

    printf("Enter the clue from the CLOCK     : ");
    scanf("%d", &clock);

    /* Build the door code: clues in reverse order. */
    int doorCode = clock * 100 + bookshelf * 10 + painting;

    printf("\nDecrypting...\n");
    printf("DOOR CODE: %03d\n", doorCode);
    printf("Type this code into the lab door keypad to escape.\n\n");

    return 0;
}