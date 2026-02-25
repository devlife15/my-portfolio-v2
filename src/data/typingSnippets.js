export const typingSnippets = [
  {
    language: "Java",
    title: "Binary Search Implementation",
    code: "public int search(int[] nums, int target) { int left = 0; int right = nums.length - 1; while (left <= right) { int mid = left + (right - left) / 2; if (nums[mid] == target) return mid; } return -1; }",
  },
  {
    language: "Next.js",
    title: "Server Action",
    code: "export async function updateProfile(data: FormData) { const session = await getSession(); if (!session) throw new Error('Unauthorized'); await db.update(users).set(data); revalidatePath('/profile'); }",
  },
  {
    language: "PostgreSQL",
    title: "Indexed Query",
    code: "CREATE INDEX idx_user_email ON users(email); SELECT id, name, email FROM users WHERE email = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 10;",
  },
];
