// C# program to find single source longest distances 
// in a DAG 

using System; 
using System.Collections.Generic; 

// Graph is represented using adjacency list. Every 
// node of adjacency list contains vertex number of 
// the vertex to which edge connects. It also 
// contains weight of the edge 
class AdjListNode { 
	private int v; 
	private int weight; 

	public AdjListNode(int _v, int _w) 
	{ 
		v = _v; 
		weight = _w; 
	} 
	public int getV() { return v; } 
	public int getWeight() { return weight; } 
} 

// Class to represent a graph using adjacency list 
// representation 
class Graph { 
	private int V; // No. of vertices' 

	// Pointer to an array containing adjacency lists 
	private List<AdjListNode>[] adj; 

	public Graph(int V) // Constructor 
	{ 
		this.V = V; 
		adj = new List<AdjListNode>[ V ]; 

		for (int i = 0; i < V; i++) { 
			adj[i] = new List<AdjListNode>(); 
		} 
	} 

	public void AddEdge(int u, int v, int weight) 
	{ 
		AdjListNode node = new AdjListNode(v, weight); 
		adj[u].Add(node); // Add v to u's list 
	} 

	// A recursive function used by longestPath. See below 
	// link for details 
	private void TopologicalSortUtil(int v, bool[] visited, 
									Stack<int> stack) 
	{ 
		// Mark the current node as visited 
		visited[v] = true; 

		// Recur for all the vertices adjacent to this 
		// vertex 
		for (int i = 0; i < adj[v].Count; i++) { 
			AdjListNode node = adj[v][i]; 
			if (!visited[node.getV()]) 
				TopologicalSortUtil(node.getV(), visited, 
									stack); 
		} 

		// Push current vertex to stack which stores 
		// topological sort 
		stack.Push(v); 
	} 

	// The function to find longest distances from a given 
	// vertex. It uses recursive topologicalSortUtil() to 
	// get topological sorting. 
	public void LongestPath(int s) 
	{ 
		Stack<int> stack = new Stack<int>(); 
		int[] dist = new int[V]; 

		// Mark all the vertices as not visited 
		bool[] visited = new bool[V]; 
		for (int i = 0; i < V; i++) 
			visited[i] = false; 

		// Call the recursive helper function to store 
		// Topological Sort starting from all vertices one 
		// by one 
		for (int i = 0; i < V; i++) { 
			if (visited[i] == false) 
				TopologicalSortUtil(i, visited, stack); 
		} 

		// Initialize distances to all vertices as infinite 
		// and distance to source as 0 
		for (int i = 0; i < V; i++) 
			dist[i] = Int32.MinValue; 

		dist[s] = 0; 

		// Process vertices in topological order 
		while (stack.Count > 0) { 

			// Get the next vertex from topological order 
			int u = stack.Pop(); 

			// Update distances of all adjacent vertices ; 
			if (dist[u] != Int32.MinValue) { 
				for (int i = 0; i < adj[u].Count; i++) { 
					AdjListNode node = adj[u][i]; 
					if (dist[node.getV()] 
						< dist[u] + node.getWeight()) 
						dist[node.getV()] 
							= dist[u] + node.getWeight(); 
				} 
			} 
		} 

		// Print the calculated longest distances 
		for (int i = 0; i < V; i++) { 
			if (dist[i] == Int32.MinValue) 
				Console.Write("INF "); 
			else
				Console.Write(dist[i] + " "); 
		} 
		Console.WriteLine(); 
	} 
} 

public class GFG { 
	// Driver program to test above functions 
	static void Main(string[] args) 
	{ 
		// Create a graph given in the above diagram. 
		// Here vertex numbers are 0, 1, 2, 3, 4, 5 with 
		// following mappings: 
		// 0=r, 1=s, 2=t, 3=x, 4=y, 5=z 
		Graph g = new Graph(6); 
		g.AddEdge(0, 1, 5); 
		g.AddEdge(0, 2, 3); 
		g.AddEdge(1, 3, 6); 
		g.AddEdge(1, 2, 2); 
		g.AddEdge(2, 4, 4); 
		g.AddEdge(2, 5, 2); 
		g.AddEdge(2, 3, 7); 
		g.AddEdge(3, 5, 1); 
		g.AddEdge(3, 4, -1); 
		g.AddEdge(4, 5, -2); 

		int s = 1; 
		Console.WriteLine( 
			"Following are longest distances from source vertex {0}", 
			s); 
		g.LongestPath(s); 
	} 
} 

// This code is contributed by cavi4762
