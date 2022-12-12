package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

type ParsedInput struct {
	grid             [][]int
	start            []int
	end              []int
	candidateStarPos [][]int
}

func parseInput(input string) ParsedInput {
	lines := strings.Split(input, "\n")
	start := []int{0, 0}
	end := []int{0, 0}

	candidateStarPos := [][]int{}

	grid := [][]int{}

	for i, line := range lines {
		line := strings.Split(line, "")
		l := []int{}

		for j, char := range line {

			if char == "S" {
				start = []int{i, j}
				line[j] = "a"
			}

			if char == "E" {
				end = []int{i, j}
				line[j] = "z"
			}

			if line[j] == "a" {
				candidateStarPos = append(candidateStarPos, []int{i, j})
			}

			l = append(l, int(line[j][0])-int('z'))
		}
		grid = append(grid, l)
	}

	return ParsedInput{
		grid:             grid,
		start:            start,
		end:              end,
		candidateStarPos: candidateStarPos,
	}
}

func part1(input string) int {
	parsedInput := parseInput(input)

	// fmt.Println(parsedInput)
	return bfs(parsedInput.grid, parsedInput.start, parsedInput.end)
}

func part2(input string) int {
	parsedInput := parseInput(input)

	// var wg sync.WaitGroup

	totalCandidates := len(parsedInput.candidateStarPos)

	fmt.Println(totalCandidates)
	// wg.Add(totalCandidates)

	var inputChan = make(chan ParsedInput, totalCandidates)
	var outputChan = make(chan int, totalCandidates)

	for i := 0; i < 50; i++ {
		go func() {
			for input := range inputChan {
				steps := bfs(input.grid, input.start, input.end)
				outputChan <- steps
				// wg.Done()
			}
		}()
	}

	for _, starPos := range parsedInput.candidateStarPos {
		inputChan <- ParsedInput{
			grid:  parsedInput.grid,
			start: starPos,
			end:   parsedInput.end,
		}
	}

	close(inputChan)

	minSteps := 999999
	for i := 0; i < len(parsedInput.candidateStarPos); i++ {
		steps := <-outputChan
		if steps < minSteps {
			minSteps = steps
		}
		// fmt.Println(i, minSteps)
	}

	// for i := 0; i < len(parsedInput.candidateStarPos); i++ {
	// 	steps := bfs(parsedInput.grid, parsedInput.candidateStarPos[i], parsedInput.end)
	// 	if steps < minSteps {
	// 		minSteps = steps
	// 	}
	// }

	// defer close(inputChan)
	// defer close(outputChan)
	return minSteps
}

func main() {
	inputBytes, err := os.ReadFile("./input.txt")

	if err != nil {
		panic(err)
	}

	input := string(inputBytes)

	fmt.Println("Part 1:", part1(input))
	fmt.Println("Part 2:", part2(input))
}

func check(a int, b int) bool {
	return (b - a) <= 1
}

func getAdjacentNodesIndex(i int, j int, arr [][]int) [][]int {
	adjacent := [][]int{}

	if i > 0 && check(arr[i][j], arr[i-1][j]) {
		adjacent = append(adjacent, []int{i - 1, j})
	}
	if i < len(arr)-1 && check(arr[i][j], arr[i+1][j]) {
		adjacent = append(adjacent, []int{i + 1, j})
	}

	if j > 0 && check(arr[i][j], arr[i][j-1]) {
		adjacent = append(adjacent, []int{i, j - 1})
	}
	if j < len(arr[0])-1 && check(arr[i][j], arr[i][j+1]) {
		adjacent = append(adjacent, []int{i, j + 1})
	}
	return adjacent
}

func getKey(i int, j int) string {
	return fmt.Sprintf("%d,%d", i, j)
}

func bfs(graph [][]int, src, end []int) int {
	dist := make(map[string]int)

	pq := [][]int{src}

	for i, row := range graph {
		for j, _ := range row {
			key := getKey(i, j)

			dist[key] = math.MaxInt
		}
	}

	dist[getKey(src[0], src[1])] = 0

	for len(pq) > 0 {
		node := pq[0]

		pq = pq[1:]

		// index := strings.Split(node.value, ",")
		// i, _ := strconv.Atoi(index[0])
		// j, _ := strconv.Atoi(index[1])
		i := node[0]
		j := node[1]
		if i == end[0] && j == end[1] {
			return dist[getKey(i, j)]
		}

		nodeKey := getKey(i, j)

		adjacentNodes := getAdjacentNodesIndex(i, j, graph)
		// fmt.Println("TURN", node, "ADJACENT", adjacentNodes, i, j)
		for _, adjacentNode := range adjacentNodes {
			if dist[nodeKey] != math.MaxInt {
				adjacentNodeKey := getKey(adjacentNode[0], adjacentNode[1])
				weight := 1
				// fmt.Println("NODE", nodeKey, dist[nodeKey], adjacentNodeKey, dist[adjacentNodeKey], dist[nodeKey]+weight)
				if dist[adjacentNodeKey] > dist[nodeKey]+weight {
					// fmt.Println("SASAASDASD")
					dist[adjacentNodeKey] = dist[nodeKey] + weight

					pq = append(pq, adjacentNode)
				}
			}
		}
	}

	// fmt.Println(dist)
	return dist[getKey(end[0], end[1])]
}

// func dijkstra(graph [][]int, src, end []int) int {
// 	dist := make(map[string]int)

// 	pq := NewPriorityQueue()

// 	for i, row := range graph {
// 		for j, _ := range row {
// 			key := getKey(i, j)

// 			dist[key] = math.MaxInt

// 			if i == src[0] && j == src[1] {
// 				pq.Enqueue(key, 0)
// 			} else {
// 				pq.Enqueue(key, math.MaxInt)
// 			}
// 		}
// 	}

// 	dist[getKey(src[0], src[1])] = 0
// 	for pq.Size() > 0 {
// 		node, err := pq.Dequeue()
// 		// fmt.Println("DEQUEUE", node, err)

// 		if err != nil {
// 			panic(err)
// 		}

// 		index := strings.Split(node.value, ",")
// 		i, _ := strconv.Atoi(index[0])
// 		j, _ := strconv.Atoi(index[1])

// 		adjacentNodes := getAdjacentNodesIndex(i, j, graph)
// 		// fmt.Println("TURN", node, "ADJACENT", adjacentNodes, i, j)
// 		for _, adjacentNode := range adjacentNodes {
// 			if dist[node.value] != math.MaxInt {
// 				adjacentNodeKey := getKey(adjacentNode[0], adjacentNode[1])
// 				weight := 1
// 				// fmt.Println("NODE", node.value, dist[node.value], adjacentNodeKey, dist[adjacentNodeKey], dist[node.value]+weight)
// 				if dist[adjacentNodeKey] > dist[node.value]+weight {
// 					// fmt.Println("SASAASDASD")
// 					dist[adjacentNodeKey] = dist[node.value] + weight
// 					pq.Enqueue(adjacentNodeKey, dist[adjacentNodeKey])
// 				}
// 			}
// 		}
// 	}

// 	// fmt.Println(dist)
// 	return dist[getKey(end[0], end[1])]
// }
