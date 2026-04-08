# TODOS:
# 1. For each index in the input list
#       1. Set a j variable to the current index
#       2. While j is greater than 0 and the element at index j-1 is greater than the element at index j:
#           1. Swap the elements at indices j and j-1
#           2. Decrement j by 1
# 2. Return the list


def insertion_sort(arr):
    for i in range(len(arr)):
        j = i
        while j > 0 and arr[j-1] > arr[j]:
            arr[j], arr[j-1] = arr[j-1], arr[j]
            j -= 1

    return arr

arr = [2,1,5,3,53,67,56,7,8,0]
print(insertion_sort(arr))