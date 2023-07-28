# Azure-Function-Assessment

The purpose of this HTTP Azure Function is to receive a JSON array of random integer values and return the most frequently seen value and the number of occurrences.

Given that the array of integers is generated randomly, there is a high probability that the highest occurrence will include multiple integers.
So, the function will return an array of integers if more than one integer has the highest number of occurrences in the given input.

In a real-world scenario, with at least a slightly longer turnaround time, I may have reached out for clarification on how to address this issue. However, given the tight turnaround time,
and the fact that this is not necessarily and "edge case" given the high probability of its occurrence, I elected to format the function in a way to handle both a single integer with the highest occurrence
and multiple integers with the same number of occurrences.
