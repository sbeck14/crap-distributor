# Crap Distributor

Distribute crap to people.

Put your contestants in an array of strings in the `contestants.json` file in the `/src` directory.

`docker build -t crap-distributor .`
`docker run -p 8080:80 crap-distributor`

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How is the name chosen?

### Default

By default, the Crap Distributor picks a contestant from the list at random.

https://stackoverflow.com/a/38448710

### Sorta Fair

The "Fair" mode uses a different algorithim that I think makes it a bit more fair while still allowing for a certain level of randomness. The code is below:

```javascript
    const groups = checkedHistory
    // 1. Get the win history for the selected contestants
      .filter((x) => checked.find((y) => y === x.name))
    /*
        2. Group the selected contestants by how many times they've won
        e.g.:
        [
          { count: 2, members: [ Clagius, Arenar ] },
          { count: 4, members: [ Oritonde, Lydia ] }
        ]
    */
      .reduce((acc, curr) => {
        const found = acc.findIndex((x) => x.count === curr.count);
        if (found === -1) {
          acc.push({ count: curr.count, members: [curr.name] });
        } else {
          acc[found].members.push(curr.name);
        }
        return acc;
      }, []);

    // 3. Sort the groups by how many times they've won (descending)
    groups.sort((a, b) => b.count - a.count);
    const choiceArray = [];
    /*
        4. Loop through the groups. Add each group member to the final array
        i number of times, where i is the index of the group +1
        e.g.:
        [ Clagius, Arenar, Oritonde, Oritonde, Lydia, Lydia ]
    */
    for (let i = 0; i < groups.length; i++) {
      groups[i].members.forEach((member) => {
        for (let j = 0; j <= i; j++) {
          choiceArray.push(member);
        }
      });
    }
    // 5. Pick a random contestant from the array
    const choice = choiceArray[choiceArray.length * Math.random() | 0];
```

The contestants are sorted into groups based on how many times they have won. The groups are then sorted in descending order (most times won to least times won). Then, each member is added to a final array of contestants `i` number of times, where `i` is the index of the array + 1.

#### Example

Contestants

```json
[
  { "name": "John", "count": 6 },
  { "name": "George", "count": 5 },
  { "name": "Pete", "count": 2 },
  { "name": "Paul", "count": 5 },
  { "name": "Ringo", "count": 5 },
]
```

First, the contestants are sorted into groups based on how many times they have won in the past:

```json
[
  {
    "count": 6,
    "members": [ "John" ]
  },
  {
    "count": 5,
    "members": [ "Ringo", "Paul", "George" ]
  },
  {
    "count": 2,
    "members": [ "Pete" ]
  }
]
```

Then, each contestant is added to a final array based on the array index of the group that they are in +1:

```json
[ "John", "Ringo", "Ringo", "Paul", "Paul", "George", "George", "Pete", "Pete", "Pete" ]
```

The final choice is randomly selected from this group. This allows for randomness (John could still win even though he has won the most in the past) while also allowing for fairness (Pete has the highest chance of winning because he has won the least amount of times in the past).

### Data

I ran each method a thousand times, ten thousand times, and a hundred thousand times, and recorded the result after each time. 

My data showed that the "fair" algorithm had a much closer distribution of times won (difference of 6 between highest and lowest after 100,000 iterations) while the completely random algorithm was farther apart (difference of 190 between highest and lowest after 100,000 iterations). 

Additionally, the "fair" algorithm keeps a close distribution at all times, while the completely random algorithm is a lot more random (as expected).

To see the data, see [method-comparison.pdf](method-comparison.pdf)