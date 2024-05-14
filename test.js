// A Javascript program to find single source longest distances in a DAG 
//https://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/

// program to implement stack data structure 
class stack { 
	constructor() { 
	this.items = []; 
	} 

	// add element to the stack 
	push(element) { 
	return this.items.push(element); 
	} 

	// remove element from the stack 
	pop() { 
	if (this.items.length > 0) { 
		return this.items.pop(); 
	} 
	} 

	// view the last element 
	top() { 
	return this.items[this.items.length - 1]; 
	} 

	// check if the stack is empty 
	empty() { 
	return this.items.length == 0; 
	} 

	// the size of the stack 
	size() { 
	return this.items.length; 
	} 

	// empty the stack 
	clear() { 
	this.items = []; 
	} 
} 

let NINF = Number.MIN_VALUE; 

// Graph is represented using adjacency list. Every 
// node of adjacency list contains vertex number of 
// the vertex to which edge connects. It also 
// contains weight of the edge 
class AdjListNode { 
	constructor(_v, _w) { 
	this.v = _v; 
	this.weight = _w; 
	} 
	getV() { 
	return this.v; 
	} 
	getWeight() { 
	return this.weight; 
	} 
} 

// Class to represent a graph using adjacency list 
// representation 
class Graph { 
	// Constructor 
	constructor(V) { 
	this.V = V; // No. of vertices' 
	// Pointer to an array containing adjacency lists 
	this.adj = Array.from(Array(V), () => new Array()); 
	} 

	// A function used by longestPath 
	topologicalSortUtil(v, visited, Stack) { 
	// Mark the current node as visited 
	visited[v] = true; 

	// Recur for all the vertices adjacent to this vertex 

	for (let j in this.adj[v]) { 
		let i = this.adj[v][j]; 
		let node = i; 
		if (!visited[node.getV()]) 
		this.topologicalSortUtil(node.getV(), visited, Stack); 
	} 

	// Push current vertex to stack which stores topological 
	// sort 
	Stack.push(v); 
	} 

	// function to add an edge to graph 
	addEdge(u, v, weight) { 
	let node = new AdjListNode(v, weight); 
	this.adj[u].push(node); // Add v to u's list 
	} 

	
	// The function to find longest distances from a given vertex. 
	// It uses recursive topologicalSortUtil() to get topological 
	// sorting. 
	longestPath(s) { 
	let Stack = new stack(); 
	let dist = new Array(this.V); 

	// Mark all the vertices as not visited 
	let visited = new Array(this.V); 
	for (let i = 0; i < this.V; i++) { 
		visited[i] = false; 
	} 

	// Call the recursive helper function to store Topological 
	// Sort starting from all vertices one by one 
	for (let i = 0; i < this.V; i++) 
		if (visited[i] == false) 
		this.topologicalSortUtil(i, visited, Stack); 

	// Initialize distances to all vertices as infinite and 
	// distance to source as 0 
	for (let i = 0; i < this.V; i++) dist[i] = NINF; 
	dist[s] = 0; 
	// Process vertices in topological order 
	while (Stack.empty() == false) { 
		// Get the next vertex from topological order 
		let u = Stack.top(); 
		Stack.pop(); 

		// Update distances of all adjacent vertices 

		if (dist[u] != NINF) { 
		for (let j in this.adj[u]) { 
			let i = this.adj[u][j]; 
			if (dist[i.getV()] < dist[u] + i.getWeight()) 
			dist[i.getV()] = dist[u] + i.getWeight(); 
		} 
		} 
	} 

	// Print the calculated longest distances 
	for (let i = 0; i < this.V; i++) 
		dist[i] == NINF ? console.log("INF ") : console.log(dist[i] + " "); 
	} 
} 

// Driver program to test above functions 

// Create a graph given in the above diagram. 
// Here vertex numbers are 0, 1, 2, 3, 4, 5 with 
// following mappings: 
// 0=r, 1=s, 2=t, 3=x, 4=y, 5=z 
let g = new Graph(6); 
g.addEdge(0, 1, 5); 
g.addEdge(0, 2, 3); 
g.addEdge(1, 3, 6); 
g.addEdge(1, 2, 2); 
g.addEdge(2, 4, 4); 
g.addEdge(2, 5, 2); 
g.addEdge(2, 3, 7); 
g.addEdge(3, 5, 1); 
g.addEdge(3, 4, -1); 
g.addEdge(4, 5, -2); 

let s = 1; 
console.log("Following are longest distances from source vertex " + s); 
g.longestPath(s); 
	
// This code is contributed by satwiksuman.
