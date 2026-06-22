import type { CodingPath, CodingProblem } from "./types";

// ---------------------------------------------------------------------------
// Coding challenges — LeetCode-style problems with optimal solutions.
// The optimalSolution is only sent to the AI; it is never rendered in the UI.
// ---------------------------------------------------------------------------

const problems: CodingProblem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    summary: "Find two indices that add up to a target value.",
    difficulty: "Easy",
    language: "python",
    description:
      "Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to `target`.\n\n" +
      "You may assume that each input has exactly one solution, and you may not use the same element twice.\n\n" +
      "**Example:**\n```\nnums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]  # nums[0] + nums[1] == 9\n```\n\n" +
      "**Constraints:** 2 ≤ nums.length ≤ 10⁴, answer is guaranteed to exist.",
    tags: ["array", "hash map"],
    optimalComplexity: "O(n) time, O(n) space",
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    pass
`,
    optimalSolution: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`,
    optimalExplanation:
      "Use a hash map to store each value and its index as you iterate once. For every element, check if its complement (target - num) is already in the map. This avoids the O(n²) brute-force nested loop.",
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    summary: "Check if a string reads the same forwards and backwards (alphanumeric only).",
    difficulty: "Easy",
    language: "python",
    description:
      "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forwards and backwards.\n\n" +
      "Given a string `s`, return `True` if it is a palindrome, or `False` otherwise.\n\n" +
      "**Example:**\n```\ns = 'A man, a plan, a canal: Panama'\nOutput: True\n\ns = 'race a car'\nOutput: False\n```",
    tags: ["string", "two pointers"],
    optimalComplexity: "O(n) time, O(1) space",
    starterCode: `def is_palindrome(s: str) -> bool:
    # Your solution here
    pass
`,
    optimalSolution: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
`,
    optimalExplanation:
      "Use two pointers starting at both ends, skipping non-alphanumeric characters. Compare characters in-place without building a cleaned copy of the string. This achieves O(1) space instead of O(n) from creating a filtered string.",
  },
  {
    id: "best-time-to-buy-stock",
    title: "Best Time to Buy and Sell Stock",
    summary: "Find the maximum profit from a single buy-then-sell transaction.",
    difficulty: "Easy",
    language: "python",
    description:
      "You are given an array `prices` where `prices[i]` is the price of a stock on day `i`.\n\n" +
      "You want to maximize profit by choosing a single day to **buy** and a later day to **sell**.\n\n" +
      "Return the maximum profit. If no profit is possible, return `0`.\n\n" +
      "**Example:**\n```\nprices = [7, 1, 5, 3, 6, 4]\nOutput: 5  # buy on day 2 (price=1), sell on day 5 (price=6)\n\nprices = [7, 6, 4, 3, 1]\nOutput: 0  # no profitable trade\n```",
    tags: ["array", "sliding window"],
    optimalComplexity: "O(n) time, O(1) space",
    starterCode: `def max_profit(prices: list[int]) -> int:
    # Your solution here
    pass
`,
    optimalSolution: `def max_profit(prices: list[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit
`,
    optimalExplanation:
      "Single pass: track the minimum price seen so far and update the max profit whenever the current price minus that minimum exceeds it. No nested loops, no extra array — O(1) space.",
  },
  {
    id: "valid-brackets",
    title: "Valid Parentheses",
    summary: "Determine if a string of brackets is properly opened and closed.",
    difficulty: "Easy",
    language: "python",
    description:
      "Given a string `s` containing only the characters `(`, `)`, `{`, `}`, `[`, and `]`, determine if the input string is valid.\n\n" +
      "A string is valid if:\n- Open brackets are closed by the same type of bracket.\n- Open brackets are closed in the correct order.\n- Every close bracket has a corresponding open bracket.\n\n" +
      "**Example:**\n```\ns = '()[]{}' → True\ns = '([)]'   → False\ns = '{[]}'  → True\n```",
    tags: ["stack", "string"],
    optimalComplexity: "O(n) time, O(n) space",
    starterCode: `def is_valid(s: str) -> bool:
    # Your solution here
    pass
`,
    optimalSolution: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
`,
    optimalExplanation:
      "Use a stack: push open brackets, and when you see a closing bracket, pop and verify it matches. If the stack is empty at the end, all brackets are balanced. A hash map makes the matching check O(1).",
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    summary: "Check if any value appears at least twice in an array.",
    difficulty: "Easy",
    language: "python",
    description:
      "Given an integer array `nums`, return `True` if any value appears at least twice, and `False` if every element is distinct.\n\n" +
      "**Example:**\n```\nnums = [1, 2, 3, 1]  → True\nnums = [1, 2, 3, 4]  → False\nnums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]  → True\n```",
    tags: ["array", "hash set"],
    optimalComplexity: "O(n) time, O(n) space",
    starterCode: `def contains_duplicate(nums: list[int]) -> bool:
    # Your solution here
    pass
`,
    optimalSolution: `def contains_duplicate(nums: list[int]) -> bool:
    return len(nums) != len(set(nums))
`,
    optimalExplanation:
      "A set discards duplicates. If the set's length differs from the list's length, a duplicate exists. One line, one pass. The naive O(n²) approach of comparing every pair is unnecessary.",
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    summary: "Count distinct ways to climb n steps taking 1 or 2 steps at a time.",
    difficulty: "Easy",
    language: "python",
    description:
      "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb `1` or `2` steps.\n\n" +
      "In how many distinct ways can you climb to the top?\n\n" +
      "**Example:**\n```\nn = 2  → 2   # (1+1) or (2)\nn = 3  → 3   # (1+1+1) or (1+2) or (2+1)\n```",
    tags: ["dynamic programming", "fibonacci"],
    optimalComplexity: "O(n) time, O(1) space",
    starterCode: `def climb_stairs(n: int) -> int:
    # Your solution here
    pass
`,
    optimalSolution: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr
`,
    optimalExplanation:
      "This is the Fibonacci sequence: ways(n) = ways(n-1) + ways(n-2). Instead of recursion (exponential) or memoization (O(n) space), just maintain two rolling variables — O(1) space, O(n) time.",
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    summary: "Find the contiguous subarray with the largest sum.",
    difficulty: "Medium",
    language: "python",
    description:
      "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\n" +
      "**Example:**\n```\nnums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6  # subarray [4,-1,2,1]\n\nnums = [1]  → 1\nnums = [5, 4, -1, 7, 8]  → 23\n```",
    tags: ["array", "dynamic programming", "kadane's algorithm"],
    optimalComplexity: "O(n) time, O(1) space",
    starterCode: `def max_subarray(nums: list[int]) -> int:
    # Your solution here
    pass
`,
    optimalSolution: `def max_subarray(nums: list[int]) -> int:
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum
`,
    optimalExplanation:
      "Kadane's algorithm: at each position decide whether to extend the current subarray or start fresh from this element — whichever is larger. Track the global maximum along the way. Single pass, constant space.",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    summary: "Search a sorted array in O(log n) time.",
    difficulty: "Easy",
    language: "python",
    description:
      "Given a sorted array of integers `nums` and an integer `target`, write a function to search for `target`. If it exists return its index, otherwise return `-1`.\n\n" +
      "You must write an algorithm with **O(log n)** runtime complexity.\n\n" +
      "**Example:**\n```\nnums = [-1, 0, 3, 5, 9, 12], target = 9  → 4\nnums = [-1, 0, 3, 5, 9, 12], target = 2  → -1\n```",
    tags: ["array", "binary search"],
    optimalComplexity: "O(log n) time, O(1) space",
    starterCode: `def search(nums: list[int], target: int) -> int:
    # Your solution here
    pass
`,
    optimalSolution: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
`,
    optimalExplanation:
      "Classic binary search: maintain a window [left, right] and halve it each step by comparing the midpoint to the target. Use `left + (right - left) // 2` instead of `(left + right) // 2` to avoid integer overflow in languages with fixed-width ints.",
  },
];

export const codingPath: CodingPath = {
  slug: "coding-challenges",
  subject: "computer-science",
  title: "Coding Challenges — AI-Powered Practice",
  description:
    "LeetCode-style problems with a live AI coach. As you write your solution, the AI compares your " +
    "approach to the optimal one in real time — rating every move like a chess engine, from Optimal " +
    "to Blunder — so you build instincts, not just answers.",
  estimatedHours: 20,
  problems,
};

export function getProblem(problemId: string): CodingProblem | undefined {
  return problems.find((p) => p.id === problemId);
}
