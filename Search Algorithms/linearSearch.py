def linearSearch(arr, target):
    for i in arr:
        if arr[i] == target:
            print(f"{target} is found at {arr[i]}")
        
    print(f"{target}is not found in {arr}")
    return i

arr = [2,3,5,6,7,8,9,12]
linearSearch(arr, 13)