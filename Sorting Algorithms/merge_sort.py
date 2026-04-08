# TODOS:

# merge_sort() divides the input array into 2 halves, calls itself on each half (Thus Recursive)
# and then merges the two sorted halves back together in order

# merge() combines the 2 already sorted halves back into a single sorted list

# merge_sort() PSEUDOCODE


def merge_sort(arr):
    if len(arr) < 2:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(first, second):
    results = []
    i=0
    j=0

    while i < len(first) and j< len(second):
        if first[i] <= second[j]:
            results.append(first[i])
            i += 1
            continue
        results.append(second[j])
        j += 1

    while i < len(first):
        results.append(first[i])
        i += 1

    while j < len(second):
        results.append(second[j])
        j += 1

    return results 

arr = [2,1,5,3,6,7,31,78,24,83,54]
print(merge_sort(arr))