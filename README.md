for using project 
### `npm install`
and 
### `npm start`
and chill out ;)

<br />
<br />
<br />

data set =>>> data set of this example is bitcoins 2018 price. <br />
it has 365 records . record per day price . <br />
we want to find the best period (most differential of max and min) with optional size of period which we get from the user with ui interface.<br />

<br />
<br />
algorith : <br />

1- extract 0 to k (users period) of main array as base sub array (defined this subArray as a sliding window) <br />
2- make a minHeap and a maxHeap for array in 1 <br />
3- save root nodes of them in diffArray (an array which we save differentials and min max indexes) <br />
4- shift the window about one element on the mainArray <br />
5- if root node of min and max heap is note shifted element (0th element for first sliding) we add the new element (mainArray[k+1]) <br />
6- else we pop the root of min or max heap to remove that then add new element <br />
7- save maxHeap.top()-minHeap.top() to differantial array with their index <br />
8-continue from 4 unitl index of our loop is equal to n-k (n is size of main array) <br />
9- find max of diffArray and it will be the best period <br />
<br />
<br />
time complexity of min and max heap definition is O(logk) <br />
time complexity of add to heap is O(logk) <br />
we have n times of adding  <br />
finding the max in diffArray is O(n) <br />
then the time complexity of our algorith will be O(nlogK+n) which is better than O(nk) (hamuni ke tu mosahebe pishnahad kardam)

