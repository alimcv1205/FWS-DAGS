# FWS-DAGS
I used plain html & javascript snippets to show DAG data structure.  I've re-used some other API such as cytoscape for visualization purposes. Most of the classes are in dag.js
I have 2 methods to find the longest distance/path - using a forked Adjacent Nodes (g.longestPath(s)) & using Critical Path (g.traverseLeafUtil(s))
Please use the Developer Tools of your browser to see the console logging

Questions:
1. Does the solution work for larger graphs?
   Yes and No, it depends on how large the dataset & client machine/device capacity. This is a headless code for portability.
3. Can you think of any optimization?
   Many actually... for one, I haven't coded for 12 years now.
   - Depending on the volume, size and avialability of the data, I probably would use a database to do what it is good at, ACID...
   - Basics - I probably should use a OO language instead of scripting language.
   - I also probably should used parallel, promise & async - to load balance the computation
   - use AI, CoPilot, and other SAS products with built-in optimized algorithms/models
5. What's the computational complexity of your solution?
   -It's best practice to use the programming language's (javascript, python, java, c#, c++, etc) built-in or native API as much as possible since they are supposed to be clean and optimized.
   -Too many loops in my code, reduce it by using real OO language and/or database engine.
7. Unusual cases that are not handled?
   - Nodes only accepts numbers
