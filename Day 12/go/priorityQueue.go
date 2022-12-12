package main

import (
	"errors"
	"fmt"
)

type Node struct {
	value    string
	priority int

	next *Node
}

func NewNode(value string, priority int) *Node {
	return &Node{
		value:    value,
		priority: priority,
		next:     nil,
	}
}

type PriorityQueue struct {
	head *Node
	size int
}

func (p *PriorityQueue) Enqueue(val string, priority int) error {
	node := NewNode(val, priority)

	if p.head == nil {
		p.head = node
		p.size++
		return nil
	}

	if p.head.priority > node.priority {
		node.next = p.head
		p.head = node
		p.size++
		return nil
	}

	current := p.head
	for current.next != nil && current.next.priority <= node.priority {
		current = current.next
	}

	node.next = current.next
	current.next = node
	p.size++
	return nil
}

func (p *PriorityQueue) Dequeue() (*Node, error) {
	if p.head == nil {
		return nil, errors.New("queue empty")
	}

	node := p.head
	p.head = node.next
	p.size--

	return node, nil
}

func (p PriorityQueue) Print() {
	current := p.head

	for current != nil {
		fmt.Print(current.value, " ", current.priority, " -> ")
		current = current.next
	}
	fmt.Println()
}

func (p PriorityQueue) Size() int {
	return p.size
}

func NewPriorityQueue() *PriorityQueue {
	return &PriorityQueue{
		head: nil,
	}
}
