// A Javascript program to find single source longest distances in a DAG 
//Forked: https://www.geeksforgeeks.org/find-longest-path-directed-acyclic-graph/

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
//Global
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

class Edge {
	constructor(_s,_t,_w){
		this.s = _s;
		this.t = _t;
		this.w = _w;
	}
	getSource() {
		return this.s;
	}
	getTarget() {
		return this.t;
	}
	getWeight() {
		return this.w;
	}
}

class vNode {
    constructor(_n,_t,_w,_es,_ef,_ls,_lf,_float){
        this.n = _n;
        this.t = _t;
        this.w = _w;
        this.es = _es;
        this.ef = _ef;
        this.ls = _ls;
        this.lf = _lf;
        this.float = _float;
    }
    getNode(){
        return this.n
    }
    getTarget(){
        return this.t
    }    
    getWeight(){
        return this.w
    }
    getES(){
            return this.es
    }
    getEF(){
            return this.ef
    }
    getLS(){
            return this.ls
    }
    getLF(){
            return this.lf
    }
    getFloat(){
            return this.float = _float;
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
	this.edges = Array.from(Array(), () => new Array()); 
    this.cpMatrix = Array.from(Array(), () => new Array());
	} 

	// A function used by longestPath 
	topologicalSortUtil(v, visited, Stack) { 
		// Mark the current node as visited 
		visited[v] = true; 
		// Recur for all the vertices adjacent to this vertex 		
		for (let j in this.adj[v]) { 
			let node = this.adj[v][j]; 
			let curVec = node.getV();			
			if (!visited[curVec]) 
				this.topologicalSortUtil(curVec, visited, Stack);
		} 
		// Push current vertex to stack which stores topological 
		// sort 
		Stack.push(v); 			
	} 
	getEFPredecessors(t)
	{	
		let efArr = new Array();	
		const efArrMx = this.cpMatrix.filter((item) => item.t == t);
		efArrMx.forEach((item) => {
			efArr.push((isNaN(item.ef))? 0 : item.ef);
		});
		return efArr;
	}
	getLSSuccessors(n)
	{	
		console.log("Node: " + n);
		let lsArr = new Array();	
		const lsArrMx = this.cpMatrix.filter((item) => item.n == n);
		lsArrMx.forEach((item) => {
			let target = item.t;
			const lsSucArrMx = this.cpMatrix.filter((el) => el.n == target );
			lsSucArrMx.forEach((item) => {
				lsArr.push((isNaN(item.es))? 0 : item.es);
		});

		});
		lsArrMx.forEach((item) => {
			lsArr.push((isNaN(item.es))? 0 : item.es);
		});
		return lsArr;
	}
	getLongestPath(sNode){
		let newArr = new Array();
		const matrix = this.cpMatrix.forEach((row) => {
			row.forEach((el) => {
				//console.log(el.ef);
				newArr.push(el.ef);
			})});
		let maxEF = Math.max(Math, newArr);
		return maxEF;
		//console.log(maxEF);
		//let sNodeEF = 
		//let traverseBack = 
	}
	// A function used to traverse leaf
	traverseLeafUtil(startingNode){
		const sources = this.edges.sort((a,b)=>{
			return a.s - b.s;
		})
		console.table(sources);

		// Find Critical Path

		let es = 0;
		let ef = 0;
		let ls = 0;
		let lf = 0;
		let float = 0;
		let tfloat = 0;
		let efArr = new Array();
		let lsArr = new Array();
		let i=0;
        let lastSrc = 0;
        console.log("srcLength: " + sources.length);
        try{
		while (i<sources.length){
            let currEdge = sources[i];
			let src = currEdge.getSource();
			let trg = currEdge.getTarget();
			let wtg = currEdge.getWeight();
            if(src==0){
                es = 0;
                ef = wtg;
                lf = wtg;
                ls = 0;
            }
            else{   
                // Early Start = Max EF from predecesors
				efArr = this.getEFPredecessors(src);
				//lsArr = this.getLSSuccessors(trg);				
                es = Math.max.apply(Math, efArr);				                            
                 // Early Finish = ES + Weight
				ef = es + wtg;				
                // Latest Finish = Min ES from successors - EF
               // lf = Math.min.apply(Math, lsArr) - ef;  
                // Latest Start = LF - Weight
               // ls = lf - wtg;  
            }     
            // Float = LS - ES or LF - EF
            //float = ls - es;
            // Total Float = Max Sum of all floats
            //tfloat += float; 
            if (lastSrc==src)
            {  				      
                efArr.push(ef); 
                //lsArr.push(ls);
            }
            else
            {  
                efArr = new Array();
                //lsArr = new Array();
            }    
            let node = new vNode(src, trg, wtg, es, ef, ls, lf, float);
            this.cpMatrix.push(node);	                   
            i++;
            lastSrc=src;
        }
    }
    catch (err)
    {
        console.error(err);
    } 
		//const lPath = this.cpMatrix.filter((item) => item.t == t);	
		
		//const maxEF = getLongestPath(startingNode);
		let newArr = new Array();
		let stArr = new Array();
		const matrix = this.cpMatrix.forEach((row) => {
				if(row.n == startingNode-1){
					stArr.push(row.ef);
				}
				newArr.push(row.ef);
			});
		let startEF = Math.max.apply(Math, stArr);
		let maxEF = Math.max.apply(Math, newArr);
		let lPath = maxEF - startEF;
		console.log(" Longest Distance using Critical Path: "+ lPath);
        //console.table(this.cpMatrix);			
	}




	// function to add an edge to graph 
	addEdge(u, v, weight) { 
		let node = new AdjListNode(v, weight); 
		let edge = new Edge(u,v,weight);
		this.adj[u].push(node); // Add v to u's list
		this.edges.push(edge);
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
					// Keep track of the largest source & target
					if (dist[u] != NINF) { 
					for (let j in this.adj[u]) { 
						let i = this.adj[u][j]; 
						let cur_v = i.getV();
						let cur_w = i.getWeight();
						let vec = dist[cur_v];
						let wt = dist[u] + cur_w;
						
						if ( vec < wt) 
						{
							dist[cur_v] = wt;
						}			
			} 
			

			} 
		} 

		// Print the calculated longest distances 
		// Todo: print the nodes/vertices
		for (let i = 0; i < this.V; i++) 
			dist[i] == NINF ? console.log("INF ") : console.log( " distance:" + dist[i] + " "); 
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
/*
g.addEdge(0, 11, 5); 
g.addEdge(0, 12, 3); 
g.addEdge(11, 13, 6); 
g.addEdge(11, 12, 2); 
g.addEdge(12, 14, 4); 
g.addEdge(12, 15, 2); 
g.addEdge(12, 13, 7); 
g.addEdge(13, 15, 1); 
g.addEdge(14, 15, -2);
*/

let s = 1; 
console.log("Following are longest distances from source vertex " + s); 
g.longestPath(s); 
try{
	g.traverseLeafUtil(s);
} catch (error)
{
console.error("Error: " + error);
}

	
// This code is contributed by satwiksuman.
