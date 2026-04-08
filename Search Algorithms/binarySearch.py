def binarySearch(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right)//2
        if arr[mid] == target:
            print(f'{target} is found at index {mid}')
            break
        elif (arr[mid] < target):
            left = mid + 1
        else:
            right = mid - 1

    return arr
arr = [1,2,3,4,5,6,26,7,9,13]
print(binarySearch(arr, 6))