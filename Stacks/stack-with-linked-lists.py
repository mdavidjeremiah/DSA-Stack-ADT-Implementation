'''
1. MUWANGUZI DAVID JEREMIAH    2500728758      25/U/28758/PS
2. NAMUGENYI DOREEN MUGALU     2500703521      25/U/03521/PS
3. KIWUUWA GODFREY             2500705798      25/U/05798/PS
4. MUYINDA BRIAN               2500703483      25/U/03483/PSA
5. NIMURUNGI TALENT            2500728770      25/U/28770/PSA
6. WAMALA ARTHUR               2500703611      25/U/03611/PS
7. RUKUNDO ABRAHAM JORDAN      2500728553      25/U/28553/PS
'''

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListStack: 
    def __init__(self):
        self.top = None  # Top of the stack (head of linked list)
        self._size = 0   # Track size for O(1) size operation
    
    def push(self, item):
        new_node = Node(item)
        new_node.next = self.top
        self.top = new_node
        self._size += 1
        print(f"Pushed: {item}")
    
    def pop(self):
        if self.is_empty():
            print("Stack UnderFlow!")
            return None
        
        popped_node = self.top
        self.top = self.top.next
        self._size -= 1
        print(f"Popped: {popped_node.data}")
        return popped_node.data
    
    def peek(self):
        if self.is_empty():
            return None
        return self.top.data
    
    def is_empty(self):
        return self.top is None
    
    def size(self):
        return self._size
    
    def display(self):
        if self.is_empty():
            print("Stack is empty")
            return
        
        current = self.top
        elements = []
        while current:
            elements.append(current.data)
            current = current.next
        
        print(f"Stack (top -> bottom): {elements}")
    
    def clear(self):
        self.top = None
        self._size = 0
        print("Stack cleared")

# Demonstration
ll_stack = LinkedListStack()
ll_stack.push(10)
ll_stack.push(20)
ll_stack.push(30)
ll_stack.display()
print(f"Top element: {ll_stack.peek()}")
print(f"Stack size: {ll_stack.size()}")
ll_stack.pop()
ll_stack.display()
ll_stack.pop()
ll_stack.pop()
print(f"Is stack empty? {ll_stack.is_empty()}")