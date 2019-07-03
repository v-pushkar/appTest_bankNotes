Hello everyone!

This is an explanation of my test work.

I tried to make it simple, not to use the reverse libraries
except the bootstrap, which I used for styles.

When app is started, click on the card to begin. It is a very simple animation s view. I tried to make it simple, not used the reverse libraries
except the bootstrap, which I used for styles. Just HTML JS and SASS as CSS-preprocessor.

In the script, was used algorithm was used:

- At first, check the amount of money that the user wants to get:

- if the amount is incorrect ask the user to change it, and check again.
- if the sum is OK, count what bills we can give. The value of the available banknotes is stored in the array. We use the "forEach" cycle, and check how many banknotes can fit in an amount.
  First, check the banknotes of the highest denomination, then banknotes of lower denomination.
- when checking, the denomination and the number of banknotes stored to the object.
- In the end, we show the result by getting data from the object.
