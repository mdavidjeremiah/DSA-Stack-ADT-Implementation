'''
1. MUWANGUZI DAVID JEREMIAH    2500728758      25/U/28758/PS
2. NAMUGENYI DOREEN MUGALU     2500703521      25/U/03521/PS
3. KIWUUWA GODFREY             2500705798      25/U/05798/PS
4. MUYINDA BRIAN               2500703483      25/U/03483/PSA
5. NIMURUNGI TALENT            2500728770      25/U/28770/PSA
6. WAMALA ARTHUR               2500703611      25/U/03611/PS
7. RUKUNDO ABRAHAM JORDAN      2500728553      25/U/28553/PS
'''
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
        print(f"Pushed: {item}")
    
    def pop(self):
        if not self.is_empty():
            item = self.items.pop()
            print(f"Popped: {item}")
            return item
        print("Stack Underflow!")
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
    
    def display(self):
        print(f"Stack: {self.items}")

# Demonstration
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)
stack.display()
print(f"Top element: {stack.peek()}")
stack.pop()
stack.display()
print(f"Stack size: {stack.size()}")
print(f"Is stack empty? {stack.is_empty()}")