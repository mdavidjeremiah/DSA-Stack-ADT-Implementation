# Todos
# 1. Set swapping to True
# 2. Set end to the length of the input list
# 3. While swapping = True:
#       1. Set swapping to False
#       2. For i from the 2nd element to the end:
#           if the (i-1)th element of the input list is greater than the i in the element:
#               1. Swap the (i-1)th element and the ith element
#               2. Set swapping to True
#       3. Decrement end by 1
# 4. Return sorted list

def bubble_sort(arr):
    swapping = True
    end = len(arr)

    while swapping:
        swapping = False
        for i in range(1, end):
            if arr[i-1] > arr[i]:
                temp = arr[i-1]
                arr[i-1] = arr[i]
                arr[i] = temp
                # Swapping can be summarized as arr[i-1], arr[i] = arr[i], arr[i-1]

                swapping = False
        end -= 1
    return arr

arr = [2,5,7,8,5,12,4,9,56,13]
print(bubble_sort(arr))